import React, { useState, useEffect } from 'react';
import { Product, BlogPost, ContactMessage, Testimonial } from '../types';
import RichTextEditor from './RichTextEditor';
import { 
  Lock, 
  User as UserIcon, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  FileText, 
  ShoppingBag, 
  CheckCircle, 
  AlertCircle, 
  Search,
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  MessageSquare,
  Check
} from 'lucide-react';
import { 
  getContactMessages, 
  updateContactMessageStatus, 
  deleteContactMessage,
  auth,
  loginWithGoogle,
  logoutUser,
  saveProduct,
  removeProduct,
  saveBlog,
  removeBlog,
  saveTestimonial,
  removeTestimonial
} from '../services/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  onGoBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  setProducts, 
  blogs, 
  setBlogs,
  testimonials,
  setTestimonials,
  onGoBack 
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'blogs' | 'contacts' | 'testimonials'>('products');
  const [searchQuery, setSearchQuery] = useState('');

  // Firebase contact state
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState<boolean>(false);
  const [contactsError, setContactsError] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const isAuthenticated = user !== null && user.email === 'ofaasd@gmail.com';

  // Load Contacts from Firestore
  const loadContacts = async () => {
    setIsLoadingContacts(true);
    setContactsError('');
    try {
      const data = await getContactMessages();
      setContacts(data);
    } catch (err) {
      console.error(err);
      setContactsError('Gagal memuat riwayat kontak dari Firebase.');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  // Run on tab switch to 'contacts'
  useEffect(() => {
    if (activeTab === 'contacts') {
      loadContacts();
    }
  }, [activeTab]);

  const handleUpdateContactStatus = async (id: string, newStatus: 'pending' | 'contacted' | 'completed') => {
    try {
      await updateContactMessageStatus(id, newStatus);
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      triggerNotification(`Status pesan berhasil diperbarui menjadi ${newStatus === 'contacted' ? '"Sedang Dihubungi"' : '"Selesai"'}.`);
    } catch (err) {
      console.error(err);
      alert('Gagal memperbarui status di Firebase.');
    }
  };

  const handleDeleteContactMessage = async (id: string, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus data kontak "${name}" dari riwayat?`)) {
      try {
        await deleteContactMessage(id);
        setContacts(prev => prev.filter(c => c.id !== id));
        triggerNotification(`Data kontak "${name}" berhasil dihapus.`);
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus data dari Firebase.');
      }
    }
  };

  const formatDateTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFollowupWALink = (phone: string, name: string) => {
    let cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.slice(1);
    }
    const msg = `Halo Sdr/i ${name}, kami dari Sinar Barokah ingin menindaklanjuti permintaan konsultasi / service barang elektronik Anda.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  // Status banners
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form States
  const [isEditingProduct, setIsEditingProduct] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: 0,
    category: 'Kitchen',
    condition: 'Good' as 'Like New' | 'Good' | 'Fair',
    image: '',
    description: '',
    status: 'tersedia' as 'tersedia' | 'sold out' | 'draft'
  });

  const [isEditingBlog, setIsEditingBlog] = useState<boolean>(false);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    date: '',
    author: 'Bang Ipul',
    image: '',
    content: ''
  });

  const [isEditingTestimonial, setIsEditingTestimonial] = useState<boolean>(false);
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    comment: '',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  });

  const triggerNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const handleLoginWithGoogle = async () => {
    setLoginError('');
    try {
      await loginWithGoogle();
      triggerNotification('Login berhasil! Selamat datang Admin.');
    } catch (err: any) {
      setLoginError(err?.message || 'Gagal masuk dengan Google.');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      triggerNotification('Log out berhasil.');
    } catch (err) {
      console.error(err);
      alert('Gagal mengeluarkan sesi Anda dari Firebase.');
    }
  };

  // Product CRUD
  const handleOpenAddProduct = () => {
    setProductForm({
      name: '',
      price: 0,
      category: 'Kitchen',
      condition: 'Good',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
      description: '',
      status: 'tersedia'
    });
    setEditingProductId(null);
    setIsEditingProduct(true);
  };

  const handleOpenEditProduct = (p: Product) => {
    setProductForm({
      name: p.name,
      price: p.price,
      category: p.category,
      condition: p.condition,
      image: p.image,
      description: p.description,
      status: p.status || 'tersedia'
    });
    setEditingProductId(p.id);
    setIsEditingProduct(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || productForm.price <= 0) {
      alert('Mohon lengkapi semua kolom yang wajib diisi!');
      return;
    }

    try {
      if (editingProductId !== null) {
        const updatedProduct: Product = {
          id: editingProductId,
          ...productForm
        };
        await saveProduct(updatedProduct);
        setProducts(prev => prev.map(p => p.id === editingProductId ? updatedProduct : p));
        triggerNotification(`Produk "${productForm.name}" berhasil diperbarui.`);
      } else {
        const newProduct: Product = {
          id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
          ...productForm
        };
        await saveProduct(newProduct);
        setProducts(prev => [newProduct, ...prev]);
        triggerNotification(`Produk "${productForm.name}" berhasil ditambahkan.`);
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan produk ke database online.');
    }

    setIsEditingProduct(false);
    setEditingProductId(null);
  };

  const handleDeleteProduct = async (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${name}"?`)) {
      try {
        await removeProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        triggerNotification(`Produk "${name}" berhasil dihapus.`);
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus produk dari database online.');
      }
    }
  };

  // Blog CRUD
  const handleOpenAddBlog = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    setBlogForm({
      title: '',
      excerpt: '',
      date: formattedDate,
      author: 'Bang Ipul',
      image: 'https://images.unsplash.com/photo-1558389186-438424b00a32?auto=format&fit=crop&q=80&w=400',
      content: ''
    });
    setEditingBlogId(null);
    setIsEditingBlog(true);
  };

  const handleOpenEditBlog = (b: BlogPost) => {
    setBlogForm({
      title: b.title,
      excerpt: b.excerpt,
      date: b.date,
      author: b.author,
      image: b.image,
      content: b.content
    });
    setEditingBlogId(b.id);
    setIsEditingBlog(true);
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.excerpt) {
      alert('Mohon isi judul dan ringkasan artikel!');
      return;
    }

    try {
      if (editingBlogId !== null) {
        const updatedBlog: BlogPost = {
          id: editingBlogId,
          ...blogForm
        };
        await saveBlog(updatedBlog);
        setBlogs(prev => prev.map(b => b.id === editingBlogId ? updatedBlog : b));
        triggerNotification(`Artikel "${blogForm.title}" berhasil diperbarui.`);
      } else {
        const newBlog: BlogPost = {
          id: blogs.length > 0 ? Math.max(...blogs.map(b => b.id)) + 1 : 1,
          ...blogForm
        };
        await saveBlog(newBlog);
        setBlogs(prev => [newBlog, ...prev]);
        triggerNotification(`Artikel "${blogForm.title}" berhasil diterbitkan.`);
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menerbitkan artikel ke database online.');
    }

    setIsEditingBlog(false);
    setEditingBlogId(null);
  };

  const handleDeleteBlog = async (id: number, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus artikel "${title}"?`)) {
      try {
        await removeBlog(id);
        setBlogs(prev => prev.filter(b => b.id !== id));
        triggerNotification(`Artikel "${title}" berhasil dihapus.`);
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus artikel dari database online.');
      }
    }
  };

  // Testimonial CRUD
  const handleOpenAddTestimonial = () => {
    setTestimonialForm({
      name: '',
      comment: '',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    });
    setEditingTestimonialId(null);
    setIsEditingTestimonial(true);
  };

  const handleOpenEditTestimonial = (t: Testimonial) => {
    setTestimonialForm({
      name: t.name,
      comment: t.comment,
      rating: t.rating,
      image: t.image
    });
    setEditingTestimonialId(t.id);
    setIsEditingTestimonial(true);
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name || !testimonialForm.comment) {
      alert('Nama dan ulasan wajib diisi!');
      return;
    }

    try {
      if (editingTestimonialId !== null) {
        const updatedTestimonial: Testimonial = {
          id: editingTestimonialId,
          ...testimonialForm
        };
        await saveTestimonial(updatedTestimonial);
        setTestimonials(prev => prev.map(t => t.id === editingTestimonialId ? updatedTestimonial : t));
        triggerNotification(`Ulasan dari "${testimonialForm.name}" berhasil diperbarui.`);
      } else {
        const newTestimonial: Testimonial = {
          id: testimonials.length > 0 ? Math.max(...testimonials.map(t => t.id)) + 1 : 1,
          ...testimonialForm
        };
        await saveTestimonial(newTestimonial);
        setTestimonials(prev => [newTestimonial, ...prev]);
        triggerNotification(`Ulasan dari "${testimonialForm.name}" berhasil ditambahkan.`);
      }
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan ulasan ke database online.');
    }

    setIsEditingTestimonial(false);
    setEditingTestimonialId(null);
  };

  const handleDeleteTestimonial = async (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus ulasan dari "${name}"?`)) {
      try {
        await removeTestimonial(id);
        setTestimonials(prev => prev.filter(t => t.id !== id));
        triggerNotification(`Ulasan dari "${name}" berhasil dihapus.`);
      } catch (err) {
        console.error(err);
        alert('Gagal menghapus ulasan dari database online.');
      }
    }
  };

  // Preset image utilities for easy filling
  const presetProductImages = [
    { label: 'Kulkas', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400' },
    { label: 'Mesin Cuci', url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=400' },
    { label: 'AC / Air Conditioner', url: 'https://images.unsplash.com/photo-1632766346174-87893110255a?auto=format&fit=crop&q=80&w=400' },
    { label: 'Microwave', url: 'https://images.unsplash.com/photo-1574265353392-19bc3154146a?auto=format&fit=crop&q=80&w=400' },
    { label: 'Magic Com / Rice Cooker', url: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=400' },
    { label: 'Kipas Angin', url: 'https://images.unsplash.com/photo-1618943716613-27cf2828b499?auto=format&fit=crop&q=80&w=400' }
  ];

  const presetBlogImages = [
    { label: 'Perawatan Kulkas', url: 'https://images.unsplash.com/photo-1571175432244-934394334335?auto=format&fit=crop&q=80&w=400' },
    { label: 'Peralatan Rusak', url: 'https://images.unsplash.com/photo-1585333127302-0422e3826dd9?auto=format&fit=crop&q=80&w=400' },
    { label: 'Hemat Energi', url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400' },
    { label: 'Teknisi Kerja', url: 'https://images.unsplash.com/photo-1621905252507-b354bcadc691?auto=format&fit=crop&q=80&w=400' }
  ];

  const presetAvatarImages = [
    { label: 'Wanita Hijab', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { label: 'Pria Budi', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { label: 'Wanita Siska', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
    { label: 'Pria Andi', url: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&q=80&w=150' },
    { label: 'Wanita Fitri', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' }
  ];

  // Search filter
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.deviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTestimonials = testimonials.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // IDR Currency Formatter
  const formatIDR = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // AUTH LOADING SCREEN
  if (isAuthLoading) {
    return (
      <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="text-slate-400 mt-4 text-sm font-medium">Memverifikasi keamanan sistem...</p>
        </div>
      </div>
    );
  }

  // ACCESS DENIED SCREEN (Logged in but not admin)
  if (user && user.email !== 'ofaasd@gmail.com') {
    return (
      <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-900 flex justify-center items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-900/10 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3"></div>
        <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-red-500/30 shadow-2xl relative z-10 text-center animate-slideUp">
          <div className="inline-flex p-4 bg-rose-500/10 text-rose-500 rounded-2xl mb-4 border border-rose-500/20">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="heading-font text-3xl text-white font-bold mb-2">Akses Ditolak</h2>
          <p className="text-slate-300 text-sm mb-6">Akun Google Anda <strong>({user.email})</strong> tidak terdaftar sebagai administrator website Sinar Barokah.</p>
          
          <div className="space-y-4">
            <button 
              onClick={async () => {
                await logoutUser();
                await handleLoginWithGoogle();
              }}
              className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Ganti Akun Google
            </button>
            <button 
              onClick={() => logoutUser()}
              className="w-full py-4 bg-slate-700/60 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              Keluar / Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  // LOGIN SCREEN (Not logged in)
  if (!isAuthenticated) {
    return (
      <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-900 flex justify-center items-center relative overflow-hidden">
        {/* Decorative ambient elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/20 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/3"></div>

        <div className="w-full max-w-md bg-slate-800/80 backdrop-blur-md rounded-3xl p-8 border border-slate-700 shadow-2xl relative z-10 animate-slideUp">
          <button 
            onClick={onGoBack} 
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </button>

          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-amber-500/10 text-amber-500 rounded-2xl mb-4 border border-amber-500/20">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="heading-font text-3xl text-white font-bold mb-2">Central Security</h2>
            <p className="text-slate-400 text-sm">Sistem keamanan terpusat Sinar Barokah. Masuk menggunakan akun Google Administrator yang terverifikasi.</p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-900/40 border border-red-500/30 text-red-200 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <div className="space-y-4">
            <button 
              onClick={handleLoginWithGoogle}
              className="w-full py-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 border border-slate-200 cursor-pointer text-sm"
            >
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.107C18.29 1.91 15.54 1 12.24 1 6.046 1 12.24s5.046 11.24 11.24 11.24c6.47 0 10.78-4.545 10.78-10.965 0-.74-.08-1.305-.175-1.855H12.24z"/>
              </svg>
              <span>Masuk dengan Google</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/60 text-center text-xs text-slate-500">
            <p>Hanya diijinkan untuk Administrator Terverifikasi</p>
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="pt-32 pb-20 px-4 md:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Success notification banner */}
        {successMessage && (
          <div className="fixed top-24 right-4 md:right-8 z-50 bg-slate-950 text-white p-4 rounded-xl shadow-xl flex items-center gap-3 border border-amber-500/30 animate-slideUp">
            <CheckCircle className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        )}

        {/* Header Block */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-2 text-sm">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-700 border border-amber-200 rounded text-xs font-bold">MODE ADMIN</span>
              <span>•</span>
              <span>Atur Toko & Artikel Dinamis</span>
            </div>
            <h2 className="heading-font text-4xl text-blue-950 font-bold">Dasbor Admin Sinar Barokah</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onGoBack}
              className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Lihat Situs
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all text-sm flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        </div>

        {/* Dashboard Tabs & Action bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex p-1.5 bg-slate-200/60 rounded-xl self-start flex-wrap gap-1">
            <button
              onClick={() => { setActiveTab('products'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'products'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Kelola Produk ({products.length})
            </button>
            <button
              onClick={() => { setActiveTab('blogs'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'blogs'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" /> Kelola Artikel ({blogs.length})
            </button>
            <button
              onClick={() => { setActiveTab('contacts'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'contacts'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Riwayat Kontak ({contacts.length})
            </button>
            <button
              onClick={() => { setActiveTab('testimonials'); setSearchQuery(''); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'testimonials'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Ulasan Pelanggan ({testimonials.length})
            </button>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder={
                  activeTab === 'products' 
                    ? "Cari barang..." 
                    : activeTab === 'blogs' 
                    ? "Cari artikel..." 
                    : activeTab === 'contacts'
                    ? "Cari nama/alat/nomor..."
                    : "Cari nama/isi ulasan..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-12 pr-4 py-3 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm shadow-sm"
              />
            </div>

            {activeTab === 'products' ? (
              <button
                onClick={handleOpenAddProduct}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap text-sm"
              >
                <Plus className="w-4 h-4" /> Tambah Produk
              </button>
            ) : activeTab === 'blogs' ? (
              <button
                onClick={handleOpenAddBlog}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap text-sm"
              >
                <Plus className="w-4 h-4" /> Tulis Artikel
              </button>
            ) : activeTab === 'testimonials' ? (
              <button
                onClick={handleOpenAddTestimonial}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-600 font-bold text-slate-950 rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap text-sm"
              >
                <Plus className="w-4 h-4" /> Tambah Ulasan
              </button>
            ) : (
              <button
                onClick={loadContacts}
                disabled={isLoadingContacts}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 font-bold text-white rounded-xl transition-all shadow-md flex items-center gap-2 whitespace-nowrap text-sm disabled:opacity-55"
              >
                <i className={`fas fa-sync ${isLoadingContacts ? 'fa-spin' : ''}`}></i> Refresh Data
              </button>
            )}
          </div>
        </div>

        {/* PRODUCT FORM CARDS (INLINE ADD/EDIT) */}
        {isEditingProduct && (
          <div className="mb-10 bg-white p-6 md:p-8 rounded-3xl shadow-md border-2 border-amber-500/30 animate-slideUp">
            <h3 className="heading-font text-2.5xl font-bold text-blue-950 mb-6 flex items-center gap-2">
              <ShoppingBag className="text-amber-500 w-6 h-6" />
              {editingProductId !== null ? 'Perbarui Rincian Produk' : 'Tambah Produk Baru ke Toko'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Nama Barang *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kulkas Sharp 1 Pintu"
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Harga (Rupiah) *</label>
                  <input
                    type="number"
                    required
                    placeholder="Contoh: 1200000"
                    value={productForm.price || ''}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Kategori Alat</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm bg-white"
                  >
                    <option value="Kitchen">Dapur (Kitchen)</option>
                    <option value="Laundry">Mesin Cuci & Setrika (Laundry)</option>
                    <option value="Cooling">Pendingin AC & Kulkas (Cooling)</option>
                    <option value="Other">Lain-lain (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Kondisi Fisik & Fungsi</label>
                  <select
                    value={productForm.condition}
                    onChange={(e) => setProductForm(prev => ({ ...prev, condition: e.target.value as any }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm bg-white"
                  >
                    <option value="Like New">Mulus Sekali (Like New)</option>
                    <option value="Good">Bagus / Sangat Layak (Good)</option>
                    <option value="Fair">Normal Pemakaian (Fair)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Status Produk</label>
                  <select
                    value={productForm.status || 'tersedia'}
                    onChange={(e) => setProductForm(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm bg-white font-semibold"
                  >
                    <option value="tersedia">Tersedia (Ready / Available)</option>
                    <option value="sold out">Sold Out (Habis Terjual)</option>
                    <option value="draft">Draft (Arsip Internal)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Tautan URL Gambar</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan alamat URL gambar"
                    value={productForm.image}
                    onChange={(e) => setProductForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm mb-3 font-mono text-xs"
                  />

                  {/* Preset Quick Images Selector */}
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Gunakan Cepat Gambar Preset Kami:</p>
                  <div className="flex flex-wrap gap-2">
                    {presetProductImages.map(preset => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setProductForm(prev => ({ ...prev, image: preset.url }))}
                        className={`px-3 py-1.5 border rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                          productForm.image === preset.url
                            ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Deskripsi Spesifikasi Produk</label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan kondisi detail barang, kelengkapan, serta masa waktu garansi..."
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingProduct(false)}
                  className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-sm"
                >
                  {editingProductId !== null ? 'Simpan Perubahan' : 'Terbitkan Produk'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* BLOG FORM CARDS (INLINE ADD/EDIT) */}
        {isEditingBlog && (
          <div className="mb-10 bg-white p-6 md:p-8 rounded-3xl shadow-md border-2 border-amber-500/30 animate-slideUp">
            <h3 className="heading-font text-2.5xl font-bold text-blue-950 mb-6 flex items-center gap-2">
              <FileText className="text-amber-500 w-6 h-6" />
              {editingBlogId !== null ? 'Perbarui Artikel Blog' : 'Tulis Artikel Edukatif Baru'}
            </h3>

            <form onSubmit={handleSaveBlog} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Judul Artikel *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 5 Cara Mencegah Korsleting Listrik di Rumah"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Penulis *</label>
                  <input
                    type="text"
                    required
                    value={blogForm.author}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Tanggal Terbit</label>
                  <input
                    type="text"
                    required
                    value={blogForm.date}
                    placeholder="Contoh: 15 Mar 2024"
                    onChange={(e) => setBlogForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Ringkasan Singkat (Excerpt) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Tampilkan satu kalimat pemicu minat pembaca..."
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Tautan URL Gambar Banner</label>
                  <input
                    type="text"
                    required
                    value={blogForm.image}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm mb-3 font-mono text-xs"
                  />

                  {/* Preset Quick Images Selector for Blogs */}
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Gunakan Cepat Gambar Preset Kami:</p>
                  <div className="flex flex-wrap gap-2">
                    {presetBlogImages.map(preset => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setBlogForm(prev => ({ ...prev, image: preset.url }))}
                        className={`px-3 py-1.5 border rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                          blogForm.image === preset.url
                            ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Isi Artikel Lengkap</label>
                  <RichTextEditor
                    value={blogForm.content}
                    onChange={(html) => setBlogForm(prev => ({ ...prev, content: html }))}
                    placeholder="Ketik atau sisipkan konten penuh artikel edukasi di sini..."
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingBlog(false)}
                  className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-sm"
                >
                  {editingBlogId !== null ? 'Simpan Artikel' : 'Terbitkan Artikel'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TESTIMONIAL FORM CARDS (INLINE ADD/EDIT) */}
        {isEditingTestimonial && (
          <div className="mb-10 bg-white p-6 md:p-8 rounded-3xl shadow-md border-2 border-amber-500/30 animate-slideUp">
            <h3 className="heading-font text-2.5xl font-bold text-blue-950 mb-6 flex items-center gap-2">
              <MessageSquare className="text-amber-500 w-6 h-6" />
              {editingTestimonialId !== null ? 'Perbarui Ulasan Pelanggan' : 'Tambah Ulasan Pelanggan Baru'}
            </h3>

            <form onSubmit={handleSaveTestimonial} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Nama Pelanggan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Sdr. Rian Semarang"
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Rating Bintang (1 - 5) *</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm(prev => ({ ...prev, rating: Number(e.target.value) }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm bg-white font-medium"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Bintang)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Bintang)</option>
                    <option value={3}>⭐⭐⭐ (3 Bintang)</option>
                    <option value={2}>⭐⭐ (2 Bintang)</option>
                    <option value={1}>⭐ (1 Bintang)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Tautan URL Foto Avatar</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.image}
                    onChange={(e) => setTestimonialForm(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm mb-3 font-mono text-xs"
                  />

                  {/* Preset Quick Avatar Selectors */}
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Gunakan Cepat Foto Avatar Preset Kami:</p>
                  <div className="flex flex-wrap gap-2">
                    {presetAvatarImages.map(preset => (
                      <button
                        type="button"
                        key={preset.label}
                        onClick={() => setTestimonialForm(prev => ({ ...prev, image: preset.url }))}
                        className={`px-3 py-1.5 border rounded-lg text-xs transition-all flex items-center gap-1.5 ${
                          testimonialForm.image === preset.url
                            ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                        }`}
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-slate-700 text-xs font-bold uppercase mb-2">Isi Komentar / Ulasan *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Contoh: Pelayanannya sangat memuaskan, teknisi ramah dan menjelaskan detail penyebab kerusakan TV saya."
                    value={testimonialForm.comment}
                    onChange={(e) => setTestimonialForm(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingTestimonial(false)}
                  className="px-5 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-all text-sm"
                >
                  {editingTestimonialId !== null ? 'Simpan Perubahan' : 'Terbitkan Ulasan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PRODUCTS MANAGEMENT GRID */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-lg text-blue-950">Daftar Barang yang Tersedia di Toko ({filteredProducts.length})</h3>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="p-16 text-center">
                <div className="inline-flex p-4 bg-slate-100 rounded-2xl text-slate-400 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-slate-500 text-sm font-medium">Belum ada rincian produk yang cocok dengan pencarian Anda.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4 pl-6">Produk</th>
                      <th className="p-4">Kategori / Kondisi</th>
                      <th className="p-4 text-right">Harga</th>
                      <th className="p-4 text-center pr-6">Tindakan Editor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-4">
                            <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
                            <div>
                              <h4 className="font-bold text-slate-950 text-base">{p.name}</h4>
                              <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">{p.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1.5 items-start">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-full text-[9px] font-bold uppercase tracking-widest">{p.category}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                                p.condition === 'Like New' ? 'bg-green-100 text-green-700' :
                                p.condition === 'Good' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                              }`}>{p.condition}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              !p.status || p.status === 'tersedia' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                              p.status === 'sold out' ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-slate-100 text-slate-800 border border-slate-200'
                            }`}>
                              {!p.status || p.status === 'tersedia' ? 'Tersedia' :
                               p.status === 'sold out' ? 'Sold Out' : 'Draft'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right font-bold text-blue-900 text-base">{formatIDR(p.price)}</td>
                        <td className="p-4 pr-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              title="Sunting rincian produk"
                              className="w-9 h-9 bg-slate-100 text-slate-700 hover:bg-blue-900 hover:text-white rounded-lg flex items-center justify-center transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id, p.name)}
                              title="Hapus produk permanent"
                              className="w-9 h-9 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ARTICLES MANAGEMENT GRID */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-bold text-lg text-blue-950">Daftar Artikel Edukasi ({filteredBlogs.length})</h3>
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="p-16 text-center">
                <div className="inline-flex p-4 bg-slate-100 rounded-2xl text-slate-400 mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <p className="text-slate-500 text-sm font-medium">Rincian artikel tidak ditemukan.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4 pl-6">Artikel</th>
                      <th className="p-4">Tanggal / Penulis</th>
                      <th className="p-4 text-center pr-6">Tindakan Editor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredBlogs.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-4">
                            <img src={b.image} alt={b.title} className="w-16 h-12 rounded-xl object-cover border border-slate-100" />
                            <div className="max-w-md">
                              <h4 className="font-bold text-slate-950 text-base line-clamp-1">{b.title}</h4>
                              <p className="text-xs text-slate-500 line-clamp-1">{b.excerpt}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" /> {b.date}
                            </span>
                            <span className="text-[11px] text-slate-400">Diposting oleh {b.author}</span>
                          </div>
                        </td>
                        <td className="p-4 pr-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditBlog(b)}
                              title="Sunting isi artikel"
                              className="w-9 h-9 bg-slate-100 text-slate-700 hover:bg-blue-900 hover:text-white rounded-lg flex items-center justify-center transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id, b.title)}
                              title="Hapus artikel permanent"
                              className="w-9 h-9 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* CONTACT MESSAGES HISTORY */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-slideUp">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-lg text-blue-950">Riwayat Kontak Pelanggan ({filteredContacts.length})</h3>
                <p className="text-xs text-slate-500">Pesan dari formulir hubungi kami disimpan secara aman di cloud Firestore database.</p>
              </div>
              {contactsError && (
                <span className="text-rose-600 text-xs font-semibold">{contactsError}</span>
              )}
            </div>

            {isLoadingContacts ? (
              <div className="p-20 text-center flex flex-col items-center justify-center">
                <div className="animate-spin text-blue-900 mb-4 text-center">
                  <i className="fas fa-spinner fa-3x fa-spin"></i>
                </div>
                <p className="text-slate-500 text-sm">Menghubungkan & mengambil data dari Firebase Firestore...</p>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="p-16 text-center">
                <div className="inline-flex p-4 bg-slate-100 rounded-2xl text-slate-400 mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <p className="text-slate-500 text-sm font-medium">Belum ada riwayat kontak yang masuk.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4 pl-6">Pelanggan</th>
                      <th className="p-4">Jenis Alat & Deskripsi Kerusakan</th>
                      <th className="p-4">Waktu Masuk</th>
                      <th className="p-4 text-center">Status Hubungi</th>
                      <th className="p-4 text-center pr-6">Tindakan Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredContacts.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-4 pl-6">
                          <div>
                            <h4 className="font-bold text-slate-950 text-base">{c.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-mono text-slate-600 font-medium">{c.phone}</span>
                              <a 
                                href={getFollowupWALink(c.phone, c.name)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold hover:underline"
                                title="Hubungi penanya langsung di WhatsApp"
                              >
                                <i className="fab fa-whatsapp"></i> Hubungi WA
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="max-w-xs md:max-w-md">
                            <span className="px-2.5 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-widest block w-fit mb-1">{c.deviceType}</span>
                            <p className="text-xs text-slate-700 italic border-l-2 border-slate-200 pl-2 line-clamp-3" title={c.description}>
                              "{c.description}"
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-slate-500 whitespace-nowrap">
                          {formatDateTime(c.createdAt)}
                        </td>
                        <td className="p-4 text-center whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider inline-block ${
                            c.status === 'pending' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                            c.status === 'contacted' ? 'bg-sky-100 text-sky-700 border border-sky-200' :
                            'bg-green-100 text-green-700 border border-green-200'
                          }`}>
                            {c.status === 'pending' ? 'Belum Direspon' :
                             c.status === 'contacted' ? 'Sedang Dihubungi' : 'Selesai / Teratasi'}
                          </span>
                        </td>
                        <td className="p-4 pr-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {c.status === 'pending' && (
                              <button
                                onClick={() => handleUpdateContactStatus(c.id!, 'contacted')}
                                className="px-2.5 py-1.5 bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white rounded-lg font-bold text-xs transition-colors"
                              >
                                Hubungi
                              </button>
                            )}
                            {c.status !== 'completed' && (
                              <button
                                onClick={() => handleUpdateContactStatus(c.id!, 'completed')}
                                className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                              >
                                <Check className="w-3.5 h-3.5" /> Selesai
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteContactMessage(c.id!, c.name)}
                              title="Hapus permanen"
                              className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg transition-colors flex items-center justify-center"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TESTIMONIALS MANAGEMENT */}
        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-slideUp">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-bold text-lg text-blue-950">Daftar Ulasan Pelanggan ({filteredTestimonials.length})</h3>
                <p className="text-xs text-slate-500">Ulasan-ulasan ini muncul secara dinamis di halaman beranda utama website.</p>
              </div>
            </div>

            {filteredTestimonials.length === 0 ? (
              <div className="p-16 text-center">
                <div className="inline-flex p-4 bg-slate-100 rounded-2xl text-slate-400 mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <p className="text-slate-500 text-sm font-medium">Ulasan tidak ditemukan.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-100">
                      <th className="p-4 pl-6">Pelanggan</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Komentar / Ulasan</th>
                      <th className="p-4 text-center pr-6">Tindakan Editor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {filteredTestimonials.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/70 transition-colors bg-white">
                        <td className="p-4 pl-6 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-150" />
                            <span className="font-bold text-slate-950">{t.name}</span>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex text-amber-500 text-sm">
                            {[...Array(t.rating)].map((_, i) => (
                              <i key={i} className="fas fa-star text-amber-400"></i>
                            ))}
                          </div>
                        </td>
                        <td className="p-4 text-slate-700 italic max-w-sm md:max-w-md" style={{ wordBreak: 'break-word' }}>
                          "{t.comment}"
                        </td>
                        <td className="p-4 pr-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditTestimonial(t)}
                              title="Sunting ulasan pelanggan"
                              className="w-9 h-9 bg-slate-100 text-slate-700 hover:bg-blue-900 hover:text-white rounded-lg flex items-center justify-center transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(t.id, t.name)}
                              title="Hapus ulasan permanent"
                              className="w-9 h-9 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
