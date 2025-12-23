
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Pesan Anda telah terkirim! Bang Ipul akan segera menghubungi Anda.");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl text-blue-950 mb-4">Hubungi Bang Ipul</h2>
          <p className="text-slate-600">Ada kendala elektronik? Konsultasikan gratis sekarang juga.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[2rem] shadow-xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-8 text-blue-950">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nama Lengkap</label>
                  <input required type="text" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nomor WhatsApp</label>
                  <input required type="tel" className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="0812..." />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Jenis Alat</label>
                <select className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900">
                  <option>Pilih Peralatan...</option>
                  <option>Kulkas / Freezer</option>
                  <option>Mesin Cuci</option>
                  <option>Kipas Angin</option>
                  <option>Magic Com / Rice Cooker</option>
                  <option>Blender / Mixer</option>
                  <option>Setrika</option>
                  <option>Kompor Gas / Listrik</option>
                  <option>Pompa Air</option>
                  <option>Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Deskripsi Kerusakan</label>
                <textarea required rows={4} className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900" placeholder="Contoh: Kipas angin tidak muter, Magic com nasi basi, dll..."></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-blue-900 text-white rounded-xl font-bold shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Kirim Sekarang
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-blue-900 p-8 md:p-12 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-8">Informasi Kontak</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-amber-500"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Workshop</h4>
                    <p className="opacity-70 text-sm">Jl. Elektronik No. 45, Kecamatan Makmur, Jakarta Selatan.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-amber-500"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Telepon & WA</h4>
                    <p className="opacity-70 text-sm">+62 812 3456 7890</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-amber-500"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Jam Operasional</h4>
                    <p className="opacity-70 text-sm">Senin - Sabtu: 08:00 - 18:00<br/>Minggu: Tutup</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-2xl overflow-hidden h-48 bg-slate-200">
               <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-800">
                  <div className="text-center">
                    <i className="fas fa-map-marked-alt text-3xl mb-2"></i>
                    <p className="text-xs">Google Maps Placeholder</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
