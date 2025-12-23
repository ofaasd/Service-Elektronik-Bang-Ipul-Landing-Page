
import React from 'react';
import { View } from '../types';

interface FooterProps {
  navigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-white text-blue-900 p-2 rounded-lg">
                <i className="fas fa-microchip text-xl"></i>
              </div>
              <div>
                <h1 className="font-bold text-xl leading-tight">Bang Ipul</h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">Service Elektronik</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Pusat servis peralatan rumah tangga terpercaya dengan jaminan garansi dan teknisi berpengalaman. Solusi tepat untuk kenyamanan rumah Anda.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-blue-900 transition-colors">
                <i className="fab fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Layanan Populer</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><a href="#contact" className="hover:text-amber-500 transition-colors">Service Kulkas & Mesin Cuci</a></li>
              <li><a href="#contact" className="hover:text-amber-500 transition-colors">Servis Magic Com & Blender</a></li>
              <li><a href="#contact" className="hover:text-amber-500 transition-colors">Servis Kipas & Setrika</a></li>
              <li><a href="#contact" className="hover:text-amber-500 transition-colors">Kompor & Alat Dapur</a></li>
              <li><a href="#contact" className="hover:text-amber-500 transition-colors">Instalasi Listrik & Pompa</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Navigasi</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              <li><button onClick={() => navigate(View.LANDING)} className="hover:text-amber-500 transition-colors text-left">Beranda</button></li>
              <li><button onClick={() => navigate(View.SHOP)} className="hover:text-amber-500 transition-colors text-left">Belanja Elektronik</button></li>
              <li><button onClick={() => navigate(View.BLOG)} className="hover:text-amber-500 transition-colors text-left">Blog Tips</button></li>
              <li><button onClick={() => navigate(View.ABOUT)} className="hover:text-amber-500 transition-colors text-left">Tentang Kami</button></li>
              <li><button onClick={() => navigate(View.CONTACT)} className="hover:text-amber-500 transition-colors text-left">Hubungi Kami</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Metode Pembayaran</h4>
            <div className="grid grid-cols-3 gap-2 grayscale opacity-40">
               <div className="bg-white rounded h-8"></div>
               <div className="bg-white rounded h-8"></div>
               <div className="bg-white rounded h-8"></div>
               <div className="bg-white rounded h-8"></div>
               <div className="bg-white rounded h-8"></div>
               <div className="bg-white rounded h-8"></div>
            </div>
            <p className="text-xs text-slate-600 mt-6 italic">
              *Menerima Transfer Bank, E-Wallet, dan Cash On Delivery untuk barang second.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs">
          <p>© 2024 Service Elektronik Bang Ipul. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
