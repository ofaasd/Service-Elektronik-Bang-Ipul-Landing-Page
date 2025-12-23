
import React from 'react';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="pt-32 pb-20 px-4 md:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-16">
          <h2 className="heading-font text-4xl text-blue-950 mb-4">Tips & Inspirasi</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Wawasan seputar perawatan elektronik langsung dari pengalaman teknisi kami.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="flex flex-col">
              <div className="rounded-2xl overflow-hidden h-56 mb-6">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 mb-3 uppercase tracking-widest">
                <span>{post.date}</span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>Oleh {post.author}</span>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3 hover:text-amber-600 transition-colors cursor-pointer">
                {post.title}
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <button className="mt-auto text-sm font-bold text-slate-900 flex items-center gap-2 group">
                Baca Selengkapnya 
                <i className="fas fa-long-arrow-alt-right group-hover:translate-x-2 transition-transform"></i>
              </button>
            </article>
          ))}
        </div>

        <div className="mt-20 bg-slate-50 p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-blue-950 mb-2">Langganan Newsletter</h3>
            <p className="text-slate-600">Dapatkan tips perawatan elektronik bulanan gratis ke email Anda.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input 
              type="email" 
              placeholder="Email Anda" 
              className="px-6 py-4 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-900 w-full md:w-80 shadow-sm"
            />
            <button className="px-8 py-4 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-100">
              Daftar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
