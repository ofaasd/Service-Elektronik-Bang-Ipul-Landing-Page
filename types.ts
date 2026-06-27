
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  condition: 'Like New' | 'Good' | 'Fair';
  image: string;
  description: string;
  status?: 'tersedia' | 'sold out' | 'draft';
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  content: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export enum View {
  LANDING = 'landing',
  SHOP = 'shop',
  BLOG = 'blog',
  ABOUT = 'about',
  CONTACT = 'contact',
  ADMIN = 'admin'
}

export interface ContactInfo {
  address: string;
  shortAddress: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsapp: string;
  whatsappUrl: string;
  hours: string;
  hoursClosed: string;
  googleMapsUrl: string;
  mapEmbedUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  phone: string;
  deviceType: string;
  description: string;
  createdAt: number;
  status: 'pending' | 'contacted' | 'completed';
}

export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
  image: string;
}
