
import React, { useState } from 'react';
import { CONTACT_INFO } from '../constants';
import { submitContactMessage } from '../services/firebase';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deviceType, setDeviceType] = useState('Pilih Peralatan...');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsappLink, setWhatsappLink] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Submit to Firebase
      await submitContactMessage({
        name,
        phone,
        deviceType: deviceType === 'Pilih Peralatan...' ? 'Lainnya' : deviceType,
        description,
        createdAt: Date.now(),
        status: 'pending',
      });

      // 2. Build WhatsApp API link
      const waMessage = `Halo Bang Ipul (Sinar Barokah), saya ingin melakukan konsultasi / service:

*Nama:* ${name}
*WhatsApp:* ${phone}
*Jenis Alat:* ${deviceType === 'Pilih Peralatan...' ? 'Lainnya' : deviceType}
*Deskripsi Kerusakan:* ${description}`;

      const waUrl = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(waMessage)}`;
      setWhatsappLink(waUrl);
      setIsSuccess(true);
      setIsSubmitting(false);

      // Attempt to open the WhatsApp chat in a new tab safely
      window.open(waUrl, '_blank', 'urlencoded');

      // Reset input fields
      setName('');
      setPhone('');
      setDeviceType('Pilih Peralatan...');
      setDescription('');
    } catch (err) {
      console.error(err);
      setErrorMessage('Terjadi kesalahan sistem. Silakan coba kirim ulang atau hubungi langsung via WhatsApp.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl text-blue-950 mb-4">Hubungi Bang Ipul</h2>
          <p className="text-slate-600">Ada kendala elektronik? Konsultasikan gratis sekarang juga.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[2rem] shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 relative">
            {isSuccess ? (
              <div id="contact-success-modal" className="absolute inset-0 bg-white z-10 p-8 md:p-12 flex flex-col justify-center items-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-md shadow-emerald-100 animate-bounce">
                  <i className="fas fa-check"></i>
                </div>
                <h3 className="text-2xl font-bold text-blue-950 mb-3">Pesan History Berhasil Disimpan!</h3>
                <p className="text-slate-600 mb-8 max-w-sm">
                  Service message Anda terdaftar di system kami. Silakan lanjut ke WhatsApp agar dapat langsung direspon oleh Bang Ipul.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                  <a 
                    href={whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    <i className="fab fa-whatsapp text-xl"></i>
                    Buka WhatsApp Sekarang
                  </a>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-4 bg-slate-100 text-slate-600 rounded-xl font-semibold hover:bg-slate-250 transition-all"
                  >
                    Kirim Form Baru
                  </button>
                </div>
              </div>
            ) : null}

            <h3 className="text-2xl font-bold mb-8 text-blue-950">Kirim Pesan</h3>
            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-50 text-rose-700 rounded-xl text-sm flex items-center gap-3">
                <i className="fas fa-exclamation-circle text-base"></i>
                <span>{errorMessage}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nama Lengkap</label>
                  <input 
                    required 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Nomor WhatsApp</label>
                  <input 
                    required 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900" 
                    placeholder="0812..." 
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Jenis Alat</label>
                <select 
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900"
                >
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
                <textarea 
                  required 
                  rows={4} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-6 py-4 bg-slate-50 rounded-xl border border-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-900" 
                  placeholder="Contoh: Kipas angin tidak muter, Magic com nasi basi, dll..."
                ></textarea>
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
                    <p className="opacity-70 text-sm">{CONTACT_INFO.shortAddress}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-amber-500"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Telepon & WA</h4>
                    <p className="opacity-70 text-sm">{CONTACT_INFO.phoneDisplay}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-clock text-amber-500"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Jam Operasional</h4>
                    <p className="opacity-70 text-sm">{CONTACT_INFO.hours}<br/>{CONTACT_INFO.hoursClosed}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-2xl overflow-hidden h-48 shadow-inner border border-white/10">
              <iframe 
                title="Lokasi Workshop Bang Ipul"
                src={CONTACT_INFO.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
