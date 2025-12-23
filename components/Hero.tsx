
import React from 'react';
import { View } from '../types';

interface HeroProps {
  navigate: (view: View) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-gradient-to-br from-slate-100 to-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-amber-50 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-3/5 text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Terpercaya Sejak 2008
            </span>
            <h1 className="heading-font text-5xl md:text-7xl text-blue-950 leading-[1.1] mb-8">
              Solusi Cerdas Untuk <span className="text-amber-600 underline decoration-amber-200 decoration-8 underline-offset-8">Elektronik</span> Anda.
            </h1>
            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto md:mx-0">
              Jangan biarkan peralatan rumah tangga yang rusak menghambat hari Anda. Kami hadir dengan perbaikan profesional dan jual beli elektronik berkualitas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button 
                onClick={() => navigate(View.CONTACT)}
                className="px-8 py-4 bg-blue-900 text-white rounded-xl font-bold shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
              >
                <i className="fab fa-whatsapp"></i>
                Pesan Service Sekarang
              </button>
              <button 
                onClick={() => navigate(View.SHOP)}
                className="px-8 py-4 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-shopping-bag"></i>
                Cari Barang Bekas
              </button>
            </div>
          </div>
          <div className="md:w-2/5">
             <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-amber-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <img 
                  src="https://images.unsplash.com/photo-1558389186-438424b00a32?auto=format&fit=crop&q=80&w=600" 
                  alt="Technician Expert" 
                  className="relative rounded-3xl shadow-xl w-full object-cover aspect-[4/5]"
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
