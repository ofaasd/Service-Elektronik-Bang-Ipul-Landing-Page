
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  condition: 'Like New' | 'Good' | 'Fair';
  image: string;
  description: string;
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
  CONTACT = 'contact'
}
