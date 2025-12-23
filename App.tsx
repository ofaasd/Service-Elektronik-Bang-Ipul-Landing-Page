
import React, { useState, useEffect } from 'react';
import { View, Product, BlogPost } from './types';
import { BLOG_POSTS, TESTIMONIALS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Shop from './components/Shop';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIHelper from './components/AIHelper';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.LANDING);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as View;
      if (Object.values(View).includes(hash)) {
        setCurrentView(hash);
      } else {
        setCurrentView(View.LANDING);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: View) => {
    window.location.hash = view;
  };

  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar currentView={currentView} navigate={navigate} cartCount={cartCount} />
      
      <main className="flex-grow">
        {currentView === View.LANDING && (
          <>
            <Hero navigate={navigate} />
            <Services />
            
            {/* Why Choose Us Section */}
            <section className="bg-white py-20 px-4 md:px-8">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <h2 className="heading-font text-4xl mb-6 text-blue-900">Mengapa Pilih Bang Ipul?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                        <i className="fas fa-check"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">Teknisi Berpengalaman</h4>
                        <p className="text-slate-600">Lebih dari 15 tahun bergelut di dunia elektronik rumah tangga.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                        <i className="fas fa-history"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">Garansi Service</h4>
                        <p className="text-slate-600">Setiap perbaikan kami berikan garansi resmi dari toko kami.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full text-amber-600 mt-1">
                        <i className="fas fa-hand-holding-dollar"></i>
                      </div>
                      <div>
                        <h4 className="font-bold">Harga Transparan</h4>
                        <p className="text-slate-600">Tidak ada biaya tersembunyi. Estimasi harga di depan.</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1621905252507-b354bcadc691?auto=format&fit=crop&q=80&w=800" 
                    alt="Bang Ipul at Work" 
                    className="rounded-2xl shadow-2xl object-cover h-[400px] w-full"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-blue-900 text-white p-6 rounded-xl hidden md:block">
                    <p className="text-3xl font-bold">1,000+</p>
                    <p className="text-sm opacity-80">Unit Diperbaiki Setiap Tahun</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-slate-50 px-4 md:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="heading-font text-4xl text-blue-950 mb-4">Ulasan Pelanggan</h2>
                  <p className="text-slate-600">Apa kata mereka yang sudah merasakan layanan kami.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                      <div className="flex items-center gap-4 mb-6">
                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-blue-900">{t.name}</h4>
                          <div className="flex text-amber-400 text-xs">
                            {[...Array(t.rating)].map((_, i) => (
                              <i key={i} className="fas fa-star"></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 italic">"{t.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Blog Snippet Section */}
            <section className="py-20 bg-white px-4 md:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                  <div>
                    <h2 className="heading-font text-4xl text-blue-950 mb-2">Artikel & Tips</h2>
                    <p className="text-slate-600">Pelajari cara merawat elektronik agar lebih awet.</p>
                  </div>
                  <button 
                    onClick={() => navigate(View.BLOG)}
                    className="text-blue-900 font-bold border-b-2 border-blue-900 pb-1 hover:text-amber-600 hover:border-amber-600 transition-all"
                  >
                    Lihat Semua Blog
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {BLOG_POSTS.slice(0, 3).map((post) => (
                    <div key={post.id} className="group cursor-pointer" onClick={() => navigate(View.BLOG)}>
                      <div className="overflow-hidden rounded-2xl mb-4">
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <h3 className="font-bold text-lg text-blue-950 mb-2 group-hover:text-amber-600 transition-colors">{post.title}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2">{post.excerpt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Maps & Contact Section */}
            <section className="py-20 bg-slate-900 text-white px-4 md:px-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-amber-500 font-bold uppercase tracking-widest text-xs mb-4 block">Lokasi Workshop</span>
                    <h2 className="heading-font text-4xl mb-8">Kunjungi Kami di Jakarta Selatan</h2>
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-map-marked-alt text-amber-500"></i>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1">Alamat Lengkap</h4>
                          <p className="opacity-70 text-sm">Jl. Elektronik Raya No. 45, Kebayoran Baru, Jakarta Selatan, 12110.</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className="fas fa-envelope text-amber-500"></i>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1">Email Kami</h4>
                          <p className="opacity-70 text-sm">info@servicebangipul.com</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                          <i className="fab fa-whatsapp text-amber-500"></i>
                        </div>
                        <div>
                          <h4 className="font-bold mb-1">WhatsApp Center</h4>
                          <p className="opacity-70 text-sm">0812-3456-7890</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex gap-4">
                      <a href="https://google.com/maps?q=service+elektronik+jakarta+selatan" target="_blank" className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-amber-500 hover:text-white transition-all">
                        Buka di Google Maps
                      </a>
                    </div>
                  </div>
                  <div className="rounded-3xl overflow-hidden h-[400px] shadow-2xl border-4 border-white/10">
                    <iframe 
                      title="Lokasi Bang Ipul"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.18224536965!2d106.71967735398687!3d-6.287661747805178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1873173d123%3A0x6a1a7c7336183492!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1711200000000!5m2!1sen!2sid"
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {currentView === View.SHOP && <Shop onAddToCart={addToCart} />}
        {currentView === View.BLOG && <Blog />}
        {currentView === View.ABOUT && <About />}
        {currentView === View.CONTACT && <Contact />}
      </main>

      <AIHelper />
      <Footer navigate={navigate} />
    </div>
  );
};

export default App;
