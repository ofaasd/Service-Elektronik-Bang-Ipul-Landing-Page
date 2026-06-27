import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  getDocFromServer,
  query,
  orderBy
} from 'firebase/firestore';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { ContactMessage, Product, BlogPost, Testimonial } from '../types';
import { PRODUCTS, BLOG_POSTS, TESTIMONIALS } from '../constants';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Google Auth provider
const googleProvider = new GoogleAuthProvider();

// Google Auth utilities
export async function loginWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Gagal login dengan Google:", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Gagal logout:", error);
    throw error;
  }
}

// Validate Connection to Firestore on startup as requested by CRITICAL CONSTRAINT
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

// Operation types for Firestore Error specifications
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// 1. Create a Contact Inquiry
export async function submitContactMessage(message: Omit<ContactMessage, 'id'>): Promise<string> {
  const collectionPath = 'contacts';
  try {
    const docRef = await addDoc(collection(db, collectionPath), message);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, collectionPath);
    return '';
  }
}

// 2. Fetch all Contact Inquiries
export async function getContactMessages(): Promise<ContactMessage[]> {
  const collectionPath = 'contacts';
  try {
    const q = query(collection(db, collectionPath), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const messages: ContactMessage[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        name: data.name || '',
        phone: data.phone || '',
        deviceType: data.deviceType || '',
        description: data.description || '',
        createdAt: data.createdAt || Date.now(),
        status: data.status || 'pending',
      } as ContactMessage);
    });
    return messages;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
    return [];
  }
}

// 3. Update Contact Inquiry Status
export async function updateContactMessageStatus(id: string, status: 'pending' | 'contacted' | 'completed'): Promise<void> {
  const collectionPath = `contacts/${id}`;
  try {
    const docRef = doc(db, 'contacts', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, collectionPath);
  }
}

// 4. Delete Contact Inquiry
export async function deleteContactMessage(id: string): Promise<void> {
  const collectionPath = `contacts/${id}`;
  try {
    const docRef = doc(db, 'contacts', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, collectionPath);
  }
}

// ==========================================
// DYNAMIC PRODUCTS PERSISTENCE
// ==========================================

export async function getProducts(): Promise<Product[]> {
  const collectionPath = 'products';
  try {
    const snap = await getDocs(collection(db, collectionPath));
    if (snap.empty) {
      // Seed initial products
      for (const product of PRODUCTS) {
        try {
          await setDoc(doc(db, collectionPath, String(product.id)), product);
        } catch (e) {
          console.warn("Seeding product skipped (not authenticated as admin):", e);
        }
      }
      return PRODUCTS;
    }
    const list: Product[] = [];
    snap.forEach((d) => {
      list.push(d.data() as Product);
    });
    return list.sort((a, b) => a.id - b.id);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
    return PRODUCTS;
  }
}

export async function saveProduct(product: Product): Promise<void> {
  const collectionPath = `products/${product.id}`;
  try {
    await setDoc(doc(db, 'products', String(product.id)), product);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, collectionPath);
  }
}

export async function removeProduct(id: number): Promise<void> {
  const collectionPath = `products/${id}`;
  try {
    await deleteDoc(doc(db, 'products', String(id)));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, collectionPath);
  }
}

// ==========================================
// DYNAMIC BLOG POSTS PERSISTENCE
// ==========================================

export async function getBlogs(): Promise<BlogPost[]> {
  const collectionPath = 'blogs';
  try {
    const snap = await getDocs(collection(db, collectionPath));
    if (snap.empty) {
      // Seed initial blogs
      for (const blog of BLOG_POSTS) {
        try {
          await setDoc(doc(db, collectionPath, String(blog.id)), blog);
        } catch (e) {
          console.warn("Seeding blog skipped (not authenticated as admin):", e);
        }
      }
      return BLOG_POSTS;
    }
    const list: BlogPost[] = [];
    snap.forEach((d) => {
      list.push(d.data() as BlogPost);
    });
    return list.sort((a, b) => b.id - a.id); // Newer first
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
    return BLOG_POSTS;
  }
}

export async function saveBlog(blog: BlogPost): Promise<void> {
  const collectionPath = `blogs/${blog.id}`;
  try {
    await setDoc(doc(db, 'blogs', String(blog.id)), blog);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, collectionPath);
  }
}

export async function removeBlog(id: number): Promise<void> {
  const collectionPath = `blogs/${id}`;
  try {
    await deleteDoc(doc(db, 'blogs', String(id)));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, collectionPath);
  }
}

// ==========================================
// DYNAMIC TESTIMONIALS PERSISTENCE
// ==========================================

export async function getTestimonials(): Promise<Testimonial[]> {
  const collectionPath = 'testimonials';
  try {
    const snap = await getDocs(collection(db, collectionPath));
    if (snap.empty) {
      // Seed initial testimonials
      for (const t of TESTIMONIALS) {
        try {
          await setDoc(doc(db, collectionPath, String(t.id)), t);
        } catch (e) {
          console.warn("Seeding testimonial skipped (not authenticated as admin):", e);
        }
      }
      return TESTIMONIALS;
    }
    const list: Product[] = [];
    const list_testimonials: Testimonial[] = [];
    snap.forEach((d) => {
      list_testimonials.push(d.data() as Testimonial);
    });
    return list_testimonials.sort((a, b) => a.id - b.id);
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, collectionPath);
    return TESTIMONIALS;
  }
}

export async function saveTestimonial(testimonial: Testimonial): Promise<void> {
  const collectionPath = `testimonials/${testimonial.id}`;
  try {
    await setDoc(doc(db, 'testimonials', String(testimonial.id)), testimonial);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, collectionPath);
  }
}

export async function removeTestimonial(id: number): Promise<void> {
  const collectionPath = `testimonials/${id}`;
  try {
    await deleteDoc(doc(db, 'testimonials', String(id)));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, collectionPath);
  }
}
