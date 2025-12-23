
import { Product, BlogPost, ServiceItem } from './types';

export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
  image: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Ibu Rahma",
    comment: "Kulkas saya mati total, diperbaiki Bang Ipul langsung beres di tempat. Harganya jujur dan teknisinya sopan sekali.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Pak Budi",
    comment: "Beli mesin cuci bekas di sini, kualitasnya masih seperti baru. Sudah 6 bulan pakai tidak ada kendala sama sekali.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Siska",
    comment: "Servis kipas angin dan magic com cepat banget. Pagi diantar, sore sudah bisa diambil. Sangat recommended!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

export const SERVICES: ServiceItem[] = [
  { id: 1, title: 'Service Kulkas', description: 'Perbaikan kompresor, ganti karet pintu, dan kebocoran freon.', icon: 'fa-refrigerator' },
  { id: 2, title: 'Mesin Cuci', description: 'Perbaikan mesin pengering, ganti dinamo, dan perbaikan PCB.', icon: 'fa-soap' },
  { id: 3, title: 'Kipas Angin', description: 'Servis as macet, ganti kapasitor, gulung dinamo, dan perbaikan tombol.', icon: 'fa-fan' },
  { id: 4, title: 'Magic Com', description: 'Perbaikan nasi cepat basi, mati total, atau elemen pemanas rusak.', icon: 'fa-bowl-rice' },
  { id: 5, title: 'Setrika', description: 'Perbaikan kabel putus, tidak panas, atau penggantian thermostat.', icon: 'fa-iron' },
  { id: 6, title: 'Blender & Mixer', description: 'Ganti gear box, servis motor macet, dan perbaikan kecepatan.', icon: 'fa-blender' },
  { id: 7, title: 'Kompor Gas/Listrik', description: 'Servis pemantik, pembersihan spuyer, dan pengecekan kebocoran.', icon: 'fa-fire-burner' },
  { id: 8, title: 'Pompa Air', description: 'Gulung dinamo, servis otomatis, dan instalasi pipa air.', icon: 'fa-faucet' },
  { id: 9, title: 'Instalasi Listrik', description: 'Pemasangan titik lampu baru, servis korsleting, dan panel.', icon: 'fa-bolt' },
  { id: 10, title: 'Elektronik Lainnya', description: 'Melayani servis dispenser, microwave, air fryer, dan alat dapur lainnya.', icon: 'fa-plug' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Samsung Kulkas 2 Pintu',
    price: 1850000,
    category: 'Kitchen',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400',
    description: 'Kulkas Samsung kondisi mulus, dingin merata, garansi servis 1 bulan.'
  },
  {
    id: 2,
    name: 'LG Washing Machine 8kg',
    price: 1400000,
    category: 'Laundry',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=400',
    description: 'Mesin cuci front load LG, irit listrik, baru ganti seal karet.'
  },
  {
    id: 3,
    name: 'Daikin AC 1 PK',
    price: 2100000,
    category: 'Cooling',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1632766346174-87893110255a?auto=format&fit=crop&q=80&w=400',
    description: 'AC Daikin Inverter, sangat hemat energi, sudah termasuk pasang.'
  },
  {
    id: 4,
    name: 'Sharp Microwave 20L',
    price: 650000,
    category: 'Kitchen',
    condition: 'Fair',
    image: 'https://images.unsplash.com/photo-1574265353392-19bc3154146a?auto=format&fit=crop&q=80&w=400',
    description: 'Microwave Sharp, fungsi normal 100%, fisik 80%.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Tips Merawat Kulkas Agar Awet Puluhan Tahun',
    excerpt: 'Kulkas adalah jantung dapur. Pelajari cara menjaganya agar tetap dingin dan hemat energi.',
    date: '15 Mar 2024',
    author: 'Bang Ipul',
    image: 'https://images.unsplash.com/photo-1571175432244-934394334335?auto=format&fit=crop&q=80&w=400',
    content: 'Full content here...'
  },
  {
    id: 2,
    title: 'Tanda-tanda Kerusakan Elektronik Sejak Dini',
    excerpt: 'Jangan tunggu sampai mati total. Kenali suara berisik dan bau tidak sedap pada alat rumah tangga Anda.',
    date: '10 Mar 2024',
    author: 'Tim Ahli',
    image: 'https://images.unsplash.com/photo-1585333127302-0422e3826dd9?auto=format&fit=crop&q=80&w=400',
    content: 'Full content here...'
  },
  {
    id: 3,
    title: 'Hemat Listrik dengan Memilih Elektronik yang Tepat',
    excerpt: 'Bagaimana cara membaca label watt dan memilih inverter yang benar-benar bekerja.',
    date: '05 Mar 2024',
    author: 'Bang Ipul',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400',
    content: 'Full content here...'
  }
];
