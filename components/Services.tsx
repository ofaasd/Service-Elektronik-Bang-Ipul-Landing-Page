
import React from 'react';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-font text-4xl text-blue-950 mb-4">Layanan Unggulan Kami</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Kami melayani perbaikan berbagai macam peralatan rumah tangga dengan teknisi bersertifikat dan suku cadang asli.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all group"
            >
              <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <i className={`fas ${service.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold mb-3 text-blue-900">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
              <button className="mt-6 text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Selengkapnya <i className="fas fa-arrow-right text-xs"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
