
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2">
            <div className="relative inline-block">
              <img 
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800" 
                alt="Founder" 
                className="rounded-3xl shadow-2xl relative z-10 w-full"
              />
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-amber-600 rounded-3xl"></div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="text-amber-600 font-bold uppercase tracking-widest text-sm mb-4 block">Kisah Kami</span>
            <h2 className="heading-font text-5xl text-blue-950 mb-8">Berawal Dari Meja Makan, Kini Melayani Seluruh Kota.</h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Service Elektronik Bang Ipul didirikan oleh Ipul, seorang lulusan teknik elektro yang memiliki hasrat besar untuk membantu tetangganya memperbaiki peralatan rumah tangga.
              </p>
              <p>
                Dengan filosofi "Jujur itu Berkah", Bang Ipul membangun reputasinya lewat pelayanan yang transparan dan hasil kerja yang rapi. Apa yang dimulai sebagai bengkel kecil di garasi rumah, kini telah berkembang menjadi pusat servis elektronik terpercaya.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                  <h4 className="text-3xl font-bold text-blue-900 mb-1">15+</h4>
                  <p className="text-sm font-medium uppercase tracking-wide">Tahun Pengalaman</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-blue-900 mb-1">5k+</h4>
                  <p className="text-sm font-medium uppercase tracking-wide">Pelanggan Puas</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white">
          <div className="text-center mb-16">
            <h2 className="heading-font text-4xl mb-4">Nilai-Nilai Kami</h2>
            <p className="opacity-70 max-w-2xl mx-auto">Kepercayaan Anda adalah aset terbesar kami.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-shield-alt text-amber-500 text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4">Integritas</h4>
              <p className="opacity-70">Kami selalu memberikan diagnosa yang jujur, tanpa melebih-lebihkan kerusakan.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-tools text-amber-500 text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4">Keahlian</h4>
              <p className="opacity-70">Tim kami terus dilatih dengan teknologi elektronik terbaru.</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-handshake text-amber-500 text-2xl"></i>
              </div>
              <h4 className="text-xl font-bold mb-4">Ketepatan</h4>
              <p className="opacity-70">Waktu Anda berharga. Kami berkomitmen menyelesaikan pekerjaan sesuai jadwal.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
