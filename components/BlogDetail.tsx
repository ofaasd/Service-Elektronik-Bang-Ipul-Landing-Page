import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import { 
  ArrowLeft, 
  Share2, 
  Copy, 
  Check, 
  Calendar, 
  User, 
  Clock,
  ArrowRight,
  MessageCircle,
  TrendingUp,
  Bookmark
} from 'lucide-react';

interface BlogDetailProps {
  post: BlogPost;
  allBlogs: BlogPost[];
  onBack: () => void;
  onSelectBlog: (id: number) => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ 
  post, 
  allBlogs, 
  onBack, 
  onSelectBlog 
}) => {
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  // Scroll to top on mount or post change, and update document.title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Save original title
    const originalTitle = document.title;
    // Set dynamic blog title
    document.title = `${post.title} | Service Elektronik Sinar Barokah`;
    
    return () => {
      // Restore on exit
      document.title = originalTitle;
    };
  }, [post.id, post.title]);

  // Estimate reading time
  const wordCount = post.content ? post.content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Get current absolute URL or fallback
  const getCurrentUrl = () => {
    return window.location.href;
  };

  const articleTitle = post.title;
  const rawUrl = getCurrentUrl();

  // Social Share URLs
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${articleTitle} - Baca selengkapnya di: ${rawUrl}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(rawUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(rawUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(rawUrl)}&text=${encodeURIComponent(articleTitle)}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(rawUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch((err) => {
        console.error('Gagal menyalin tautan:', err);
      });
  };

  // Get related blogs (excluding current)
  const relatedBlogs = allBlogs
    .filter(b => b.id !== post.id)
    .slice(0, 3);

  // Parse paragraphs from content
  const paragraphs = post.content 
    ? post.content.split('\n').filter(p => p.trim() !== '') 
    : ['Konten artikel tidak tersedia atau kosong.'];

  // Tech consultation custom WA link
  const getConsultationLink = () => {
    const textMsg = `Halo Bang Ipul, saya baru saja membaca artikel "${post.title}" di website Anda dan ingin berkonsultasi seputar perbaikan elektronik rumah tangga saya.`;
    return `https://wa.me/628123456789?text=${encodeURIComponent(textMsg)}`;
  };

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Breadcrumb & Back button */}
        <div id="blog-breadcrumb" className="flex items-center justify-between mb-8">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 hover:bg-white text-slate-700 hover:text-blue-900 rounded-xl transition-all font-semibold text-sm border border-transparent hover:border-slate-150 shadow-sm hover:shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Artikel
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>Beranda</span>
            <span>/</span>
            <span>Blog</span>
            <span>/</span>
            <span className="text-slate-600 truncate max-w-[180px]">{post.title}</span>
          </div>
        </div>

        {/* Article Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Article Content Panel */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-sm">
            
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full text-slate-600 font-bold">
                <Bookmark className="w-3.5 h-3.5 text-amber-500" /> Tips & Trik
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                Oleh {post.author}
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span className="flex items-center gap-1 text-slate-500 font-bold">
                <Clock className="w-3.5 h-3.5" />
                {readingTime} Menit Baca
              </span>
            </div>

            {/* Giant Title */}
            <h1 className="heading-font text-3xl md:text-4.5xl font-black text-blue-950 leading-tight mb-8">
              {post.title}
            </h1>

            {/* Featured Image */}
            <div className="rounded-3xl overflow-hidden aspect-[16/10] mb-8 relative group border border-slate-100 shadow-inner">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 select-none"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content Body */}
            <div className="prose max-w-none text-slate-700 min-h-[150px] leading-relaxed font-normal">
              {post.content && (post.content.includes('<p>') || post.content.includes('<h') || post.content.includes('<ul') || post.content.includes('<ol') || post.content.includes('<div') || post.content.includes('<table')) ? (
                <div 
                  dangerouslySetInnerHTML={{ __html: post.content }} 
                  className="rich-text-content text-slate-600 md:text-lg"
                />
              ) : (
                <div className="space-y-6 text-base md:text-lg">
                  {paragraphs.map((p, idx) => (
                    <p key={idx} className="whitespace-pre-line text-slate-600 hover:text-slate-900 transition-colors duration-200">
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Social Share Inline panel on Mobile */}
            <div className="mt-12 pt-8 border-t border-slate-100 lg:hidden">
              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-amber-500" />
                Bagikan artikel ini ke kerabat Anda:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <a 
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white rounded-xl transition-all text-xs font-bold"
                >
                  <i className="fab fa-whatsapp text-sm" /> WhatsApp
                </a>
                <a 
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl transition-all text-xs font-bold"
                >
                  <i className="fab fa-facebook-f text-sm" /> Facebook
                </a>
                <a 
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-slate-50 hover:bg-slate-950 text-slate-700 hover:text-white rounded-xl transition-all text-xs font-bold"
                >
                  <i className="fab fa-x-twitter text-sm" /> Twitter
                </a>
                <a 
                  href={shareLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white rounded-xl transition-all text-xs font-bold"
                >
                  <i className="fab fa-telegram-plane text-sm" /> Telegram
                </a>
                <button 
                  onClick={handleCopyLink}
                  className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl transition-all text-xs font-bold cursor-pointer ${
                    copied 
                      ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold' 
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Tersalin' : 'Salin Link'}
                </button>
              </div>
            </div>

          </article>

          {/* Sticky Side Sidebar (Deskop Only) */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* Share Card Sticky Widget */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-28">
              <h3 className="font-bold text-center text-blue-950 text-lg mb-6 flex items-center justify-center gap-2">
                <Share2 className="text-blue-900 w-5 h-5 animate-pulse" />
                Bagikan Artikel
              </h3>
              
              <div className="space-y-3.5 mb-6">
                <a 
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white rounded-2xl transition-all text-sm font-bold shadow-sm"
                >
                  <span className="flex items-center gap-3">
                    <i className="fab fa-whatsapp text-lg" />
                    Bagikan ke WhatsApp
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a 
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-indigo-50 hover:bg-indigo-600 text-indigo-800 hover:text-white rounded-2xl transition-all text-sm font-bold shadow-sm"
                >
                  <span className="flex items-center gap-3">
                    <i className="fab fa-facebook-f text-lg" />
                    Bagikan ke Facebook
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a 
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 hover:bg-slate-900 text-slate-800 hover:text-white rounded-2xl transition-all text-sm font-bold shadow-sm"
                >
                  <span className="flex items-center gap-3">
                    <i className="fab fa-x-twitter text-lg" />
                    Bagikan ke X / Twitter
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a 
                  href={shareLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-sky-50 hover:bg-sky-600 text-sky-800 hover:text-white rounded-2xl transition-all text-sm font-bold shadow-sm"
                >
                  <span className="flex items-center gap-3">
                    <i className="fab fa-telegram-plane text-lg" />
                    Bagikan ke Telegram
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="h-[1px] bg-slate-100 my-6"></div>

              {/* Copy URL Button */}
              <button 
                onClick={handleCopyLink}
                className={`w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl transition-all text-sm font-bold shadow-md cursor-pointer ${
                  copied 
                    ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black scale-102 border border-amber-600' 
                    : 'bg-blue-900 hover:bg-blue-800 text-white hover:scale-101'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Link Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin Tautan Artikel
                  </>
                )}
              </button>

              {/* CTA Consultation block right inside sidebar */}
              <div className="mt-8 bg-amber-50/70 border border-amber-200/50 rounded-2xl p-4 text-center">
                <h4 className="font-bold text-slate-900 text-sm mb-1">Butuh Service Elektronik?</h4>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  Punya peralatan elektronik rumah tangga yang rusak? Konsultasikan gratis sekarang dengan Bang Ipul.
                </p>
                <a 
                  href={getConsultationLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Diskusi Kerusakan via WA
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Multi-post Navigation / Related Articles Bottom Row */}
        {relatedBlogs.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <h3 className="heading-font text-2xl font-bold text-blue-950 mb-8 flex items-center gap-2">
              <TrendingUp className="text-amber-500 w-5 h-5" />
              Artikel Terkait Lainnya
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedBlogs.map((rPost) => (
                <div 
                  key={rPost.id}
                  onClick={() => onSelectBlog(rPost.id)}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-slate-200 p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col h-full"
                >
                  <div className="rounded-xl overflow-hidden h-40 mb-4 bg-slate-100">
                    <img 
                      src={rPost.image} 
                      alt={rPost.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                    {rPost.date}
                  </div>
                  <h4 className="font-extrabold text-blue-950 text-base mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {rPost.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                    {rPost.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-slate-900 text-xs font-bold group-hover:text-amber-600 transition-colors">
                    Baca Selengkapnya
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogDetail;
