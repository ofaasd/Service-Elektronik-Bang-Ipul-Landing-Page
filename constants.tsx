
import { Product, BlogPost, ServiceItem, ContactInfo } from './types';

export const CONTACT_INFO: ContactInfo = {
  address: 'Samping Pos Ojek Pasar Damar, Jl. Kanfer Raya, Padangsari, Kec. Banyumanik, Kota Semarang, Jawa Tengah',
  shortAddress: 'Jl. Kanfer Raya, Padangsari, Kec. Banyumanik, Kota Semarang, Jawa Tengah',
  email: 'admin@sinarbarokah.com',
  phone: '0812-2682-7922',
  phoneDisplay: '+62 812 2682 7922',
  whatsapp: '081226827922',
  whatsappUrl: 'https://wa.me/6281226827922',
  hours: 'Senin - Sabtu: 08:00 - 18:00',
  hoursClosed: 'Minggu: 10:00 - 18:00',
  googleMapsUrl: 'https://www.google.com/maps/place/Service+Elektronik+Bang+Ipul/@-7.0717366,110.4270817,17z/data=!3m1!4b1!4m6!3m5!1s0x2e708f9a9b5c2b6f:0x799248a0c2d4176e!8m2!3d-7.0717366!4d110.429662!16s%2Fg%2F11fkvq_9ht?entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.4669283773483!2d110.42708171165063!3d-7.071736592901434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708f9a9b5c2b6f%3A0x799248a0c2d4176e!2sService%20Elektronik%20Bang%20Ipul!5e0!3m2!1sid!2sid!4v1780694194719!5m2!1sid!2sid',
  facebookUrl: '#',
  instagramUrl: '#',
  youtubeUrl: '#'
};

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
  { id: 2, title: 'Mesin Cuci', description: 'Perbaikan mesin pengering, ganti dinamo, dan perbaikan PCB.', icon: 'fa-soap' },
  { id: 3, title: 'Kipas Angin', description: 'Servis as macet, ganti kapasitor, gulung dinamo, dan perbaikan tombol.', icon: 'fa-fan' },
  { id: 4, title: 'Magic Com', description: 'Perbaikan nasi cepat basi, mati total, atau elemen pemanas rusak.', icon: 'fa-bowl-rice' },
  { id: 5, title: 'Setrika', description: 'Perbaikan kabel putus, tidak panas, atau penggantian thermostat.', icon: 'fa-iron' },
  { id: 6, title: 'Blender & Mixer', description: 'Ganti gear box, servis motor macet, dan perbaikan kecepatan.', icon: 'fa-blender' },
  { id: 7, title: 'Kompor Gas/Listrik', description: 'Servis pemantik, pembersihan spuyer, dan pengecekan kebocoran.', icon: 'fa-fire-burner' },
  { id: 8, title: 'Pompa Air', description: 'Gulung dinamo, servis otomatis, dan instalasi pipa air.', icon: 'fa-faucet' },
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
    description: 'Kulkas Samsung kondisi mulus, dingin merata, garansi servis 1 bulan.',
    status: 'tersedia'
  },
  {
    id: 2,
    name: 'LG Washing Machine 8kg',
    price: 1400000,
    category: 'Laundry',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=400',
    description: 'Mesin cuci front load LG, irit listrik, baru ganti seal karet.',
    status: 'tersedia'
  },
  {
    id: 3,
    name: 'Daikin AC 1 PK',
    price: 2100000,
    category: 'Cooling',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1632766346174-87893110255a?auto=format&fit=crop&q=80&w=400',
    description: 'AC Daikin Inverter, sangat hemat energi, sudah termasuk pasang.',
    status: 'tersedia'
  },
  {
    id: 4,
    name: 'Sharp Microwave 20L',
    price: 650000,
    category: 'Kitchen',
    condition: 'Fair',
    image: 'https://images.unsplash.com/photo-1574265353392-19bc3154146a?auto=format&fit=crop&q=80&w=400',
    description: 'Microwave Sharp, fungsi normal 100%, fisik 80%.',
    status: 'tersedia'
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
    content: `Kulkas adalah salah satu alat elektronik rumah tangga terpenting yang bekerja terus-menerus tanpa henti selama 24 jam penuh. Oleh karena itu, perawatan rutin sangat penting untuk menjaga kinerjanya tetap stabil dan memperpanjang masa pakainya hingga puluhan tahun.

Berikut beberapa tips sederhana dari Bang Ipul untuk menjaga kulkas Anda tetap awet dan hemat listrik:

1. Atur Jarak Kulkas dengan Tembok
Pastikan ada jarak minimal 10-15 cm antara bagian belakang serta samping kulkas dengan dinding. Jarak ini sangat krusial agar kondensor kulkas dapat membuang panas kompresor dengan optimal. Jika sirkulasi udara terganggu, kompresor akan bekerja jauh lebih berat dan cepat rusak.

2. Jangan Memasukkan Makanan Panas
Menaruh makanan atau minuman yang masih mengepul panas langsung ke dalam kulkas akan memaksa kulkas menaikkan daya pendinginan secara drastis untuk menstabilkan suhu internal. Ini membuat tagihan listrik Anda membengkak dan mempercepat keausan komponen pendingin. Dinginkan terlebih dahulu makanan di suhu ruang sebelum disimpan.

3. Bersihkan Karet Pintu (Gasket) secara Berkala
Karet pintu kulkas yang kotor karena debu atau sisa makanan bisa mengeras dan tidak dapat menutup rapat. Akibatnya, udara dingin akan bocor keluar dan udara hangat masuk ke dalam. Anda bisa membersihkannya secara mudah menggunakan kain lembut yang dibasahi air hangat dan sedikit sabun cuci piring.

4. Jaga Kapasitas Isi Kulkas tetap Seimbang
Jangan membiarkan kulkas terlalu kosong karena kulkas membutuhkan benda di dalamnya untuk mempertahankan dingin. Namun, jangan pula mengisinya terlalu penuh hingga menyumbat lubang sirkulasi udara dingin. Isi sekitar 70% kapasitas kulkas untuk efisiensi pendinginan terbaik.`
  },
  {
    id: 2,
    title: 'Tanda-tanda Kerusakan Elektronik Sejak Dini',
    excerpt: 'Jangan tunggu sampai mati total. Kenali suara berisik dan bau tidak sedap pada alat rumah tangga Anda.',
    date: '10 Mar 2024',
    author: 'Tim Ahli',
    image: 'https://images.unsplash.com/photo-1585333127302-0422e3826dd9?auto=format&fit=crop&q=80&w=400',
    content: `Sebagian besar kerusakan parah pada peralatan elektronik rumah tangga bermula dari gejala-gejala kecil yang sering kali diabaikan oleh pemiliknya. Mengenali tanda-tanda kerusakan sejak dini bisa menyelamatkan Anda dari biaya perbaikan yang mahal akibat kerusakan yang merembet ke komponen lain.

Mari kenali 4 tanda bahaya yang menandakan peralatan elektronik Anda butuh pemeriksaan teknisi:

1. Suara Berisik atau Getaran yang Tidak Biasa
Jika mesin cuci, kulkas, atau kipas angin Anda tiba-tiba mengeluarkan suara berdengung kencang, decitan logam, atau getaran yang tidak wajar, itu adalah sinyal adanya masalah mekanis. Biasanya hal ini disebabkan oleh bearing yang aus, poros as yang macet, atau dinamo yang sudah mulai melemah.

2. Bau Sangit atau Bau Gosong
Bau gosong atau sangit yang keluar saat alat elektronik dinyalakan adalah tanda darurat. Ini menandakan adanya kabel yang meleleh akibat korsleting, atau gulungan spul motor (dinamo) yang mengalami overheat. Jika Anda mencium bau ini, segera matikan alat dan cabut colokannya dari stopkontak demi keamanan keluarga Anda.

3. Panas Berlebihan (Overheat) pada Bodi Alat
Wajar jika beberapa alat elektronik menghasilkan kehangatan ringan saat bekerja. Namun, jika bodi luar blender, setrika, atau pompa air terasa sangat panas hingga tidak nyaman disentuh, berarti ada komponen internal yang macet atau kelebihan beban (overload).

4. Kinerja Alat Menurun secara Drastis
Misalnya, Magic Com membutuhkan waktu sangat lama untuk matang, kulkas terasa kurang dingin meskipun thermostat disetel maksimal, atau putaran kipas angin sangat lambat di awal dinyalakan. Jangan tunggu sampai alat tersebut benar-benar mati total untuk membawanya ke tempat servis!`
  },
  {
    id: 3,
    title: 'Hemat Listrik dengan Memilih Elektronik yang Tepat',
    excerpt: 'Bagaimana cara membaca label watt dan memilih inverter yang benar-benar bekerja.',
    date: '05 Mar 2024',
    author: 'Bang Ipul',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=400',
    content: `Lonjakan tagihan listrik bulanan sering kali dipicu oleh penggunaan peralatan elektronik yang tidak efisien atau salah dalam memilih spesifikasi daya. Memilih peralatan elektronik rumah tangga yang tepat tidak hanya menghemat pengeluaran bulanan Anda, tetapi juga membantu menjaga keawetan instalasi listrik rumah Anda.

Berikut adalah panduan praktis dari Bang Ipul untuk cerdas memilih peralatan elektronik yang hemat energi:

1. Pahami Perbedaan Teknologi Inverter dan Non-Inverter
Teknologi Inverter sangat efektif untuk peralatan elektronik yang bekerja secara kontinu, seperti AC (Air Conditioner) atau kulkas. Kompresor inverter bekerja secara dinamis menyesuaikan kebutuhan suhu, alih-alih mati-nyala secara berulang-ulang seperti kompresor konvensional. Memang harga belinya sedikit lebih mahal di awal, namun penghematan listriknya bisa mencapai 30-50% dalam jangka panjang!

2. Jangan Terkecoh dengan Angka "Watt" Rendah Saja
Banyak produsen menawarkan produk dengan klaim "Low Watt". Namun, beberapa alat hemat daya tersebut justru membutuhkan waktu bekerja yang lebih lama untuk menyelesaikan tugasnya (misalnya mesin cuci watt rendah yang durasi mencucinya lebih lambat). Selalu bandingkan efisiensi daya total dan waktu pengoperasian alat tersebut.

3. Cek Label Tanda Bintang Efisiensi Energi
Di Indonesia, carilah peralatan elektronik yang memiliki stiker tanda bintang efisiensi energi resmi dari pemerintah. Semakin banyak jumlah bintangnya (maksimal 5 bintang), berarti alat tersebut semakin hemat listrik dan ramah lingkungan.

4. Sesuaikan Kapasitas dengan Kebutuhan Rumah Tangga
Membeli kulkas berkapasitas raksasa atau AC berkapasitas besar padahal hanya untuk ruangan berukuran kecil adalah pemborosan besar. Gunakan rumus sederhana untuk menghitung kebutuhan ruangan Anda agar tidak terjadi kelebihan kapasitas yang membuang-buang daya listrik secara sia-sia.`
  },
  {
    id: 4,
    title: 'Panduan Memperbaiki Magic Com Mati Total & Nasi Cepat Basi secara Mandiri',
    excerpt: 'Sering kesal karena nasi cepat kering dan bau atau Magic Com tiba-tiba mati total? Ikuti langkah praktis penanganan pertamanya.',
    date: '13 Jun 2026',
    author: 'Bang Ipul',
    image: 'https://images.unsplash.com/photo-1544237515-375177fda8ae?auto=format&fit=crop&q=80&w=600',
    content: `Magic Com atau rice cooker adalah salah satu peralatan elektronik dapur paling vital di setiap rumah tangga. Masalah yang paling sering dikeluhkan oleh para pelanggan kami adalah alat mati total secara tiba-tiba atau kualitas nasinya yang cepat sekali basi, berbau aromanya, bahkan menguning padahal baru dimasak beberapa jam saja.

Jangan buru-buru membuang rice cooker kesayangan Anda atau terburu-buru memesan jasa servis berbiaya mahal. Mari kita periksa dan lakukan beberapa langkah troubleshooting sederhana berikut ini bersama Bang Ipul!

Langkah 1: Mengatasi Magic Com Mati Total (Lampu Indikator Tidak Menyala Sama Sekali)
Sering kali kendala mati total disebabkan oleh masalah sederhana. Pertama-tama, pastikan aliran listrik di rumah Anda normal dengan mencoba mencolokkan perangkat lain (seperti charger ponsel) pada stopkontak yang sama. Jika stopkontak berfungsi, masalah kemungkinan besar berada di dalam unit Magic Com.
Komponen utama yang paling sering mengalami kerusakan adalah Thermal Fuse (sekring pengaman suhu). Komponen kecil ini berfungsi memutus arus listrik secara otomatis ketika suhu Magic Com melampaui batas aman agar terhindar dari overheat yang berisiko kebakaran.
Untuk memeriksanya, Anda perlu mencabut kabel power lalu membuka sekrup penutup bawah bodi Magic Com memakai obeng. Cari kabel yang terproteksi selongsong tahan panas; di dalamnya terdapat sensor berbentuk silinder perak kecil. Bila sekring ini putus, pasang yang baru dengan rating suhu serupa (umumnya 150-165°C). Biaya penggantian sekring baru ini sangat ekonomis di toko komponen elektronik, berkisar antara Rp 2.000 hingga Rp 5.000 saja!

Langkah 2: Mengatasi Nasi Cepat Basi, Berbau atau Menguning
Bila lampu indikator Magic Com menyala normal dan proses memasak berjalan lancar, tetapi nasi cepat sekali menjadi berair dan bau busuk dalam waktu kurang dari 12 jam, sumber masalahnya ada pada elemen pemanas.
Kasus paling umum adalah kabel elemen tutup atas (lid heater) terputus. Karena penutup Magic Com selalu dibuka dan ditutup berulang-ulang setiap hari, kabel tembaga tipis yang melewati engsel penutup sangat rawan bergeser, terjepit, hingga akhirnya putus. Ketika elemen atas tidak panas, uap matang di tutup akan mendingin, mengembun menjadi tetesan air, lalu jatuh membasahi nasi. Nasi yang basah ini adalah tempat berkembang biak terbaik bagi bakteri penyebab bau asam dan basi.
Pemicu kedua adalah melemahnya Thermostat (sensor suhu tengah). Thermostat ini bertugas menstabilkan temperatur penghangat di kisaran ideal 70-80°C. Jika sensor ini rusak atau kotor karena sela-sela berkerak, suhu panci akan terlalu dingin (kuman tumbuh pesat) atau terlalu panas (nasi kering dan menguning di bagian tepi).

Tips Perawatan Rutin Agar Magic Com Bebas Masalah:
1. Pastikan permukaan luar panci bagian bawah (inner pot) selalu kering bersih sebelum dimasukkan ke dalam penanak. Kerak gosong atau sisa air di pantat panci bisa merusak sensor elemen bawah.
2. Bersihkan karet silikon dan lubang uap penutup atas secara berkala. Karet yang aus akan membuat uap panas bocor keluar, mengganggu stabilitas suhu internal.
3. Kosongkan penampung air embun di bagian samping engsel paling lambat dua hari sekali guna mencegah penumpukan bakteri penyebab aroma tak sedap.

Jika sesudah membaca tips di atas Anda masih mendapat kendala atau merasa kurang percaya diri untuk membongkar sirkuit elektronik Magic Com sendiri, tim teknisi Sinar Barokah siap membantu menyelesaikannya secara cepat dengan garansi pascaservis. Anda dapat berkonsultasi gratis terlebih dulu melalui admin WhatsApp terdekat!`
  }
];
