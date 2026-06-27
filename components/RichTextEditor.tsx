import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Table as TableIcon, 
  Info, 
  Code, 
  Eye, 
  Eraser, 
  Sparkles, 
  Heading
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Ketik konten penuh artikel edukasi di sini..." 
}) => {
  const [editorMode, setEditorMode] = useState<'visual' | 'code'>('visual');
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize content on load (only once to prevent cursor resetting during typing)
  useEffect(() => {
    if (editorRef.current && editorMode === 'visual') {
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || `<p><br></p>`;
      }
    }
  }, [editorMode]); // Re-sync when switching modes

  // Sync state back to parent when content changes
  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html);
    }
  };

  const executeCommand = (command: string, arg: string = '') => {
    document.execCommand(command, false, arg);
    handleInput();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  // Safe Selection-based HTML Insertion
  const insertHTML = (html: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const fragment = document.createDocumentFragment();
        
        let node;
        let lastNode;
        while ((node = tempDiv.firstChild)) {
          lastNode = fragment.appendChild(node);
        }
        
        range.insertNode(fragment);
        
        // Move cursor after the inserted elements
        if (lastNode) {
          const newRange = document.createRange();
          newRange.setStartAfter(lastNode);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      } else {
        editorRef.current.innerHTML += html;
      }
      handleInput();
    }
  };

  // Custom rich formats helper functions
  const handleAddLink = () => {
    const url = prompt("Masukkan alamat URL tautan (contoh: https://wa.me/...):", "https://");
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleAddImage = () => {
    const imageUrl = prompt("Masukkan URL Gambar (contoh: https://images.unsplash.com/...):", "https://");
    if (imageUrl) {
      const altText = prompt("Masukkan deskripsi gambar (Alt text):", "Gambar artikel");
      const imgHtml = `<div class="my-6 text-center"><img src="${imageUrl}" alt="${altText || 'Gambar'}" class="mx-auto rounded-2xl border border-slate-100 shadow-sm max-h-[400px] object-cover" /><p class="text-xs text-slate-400 mt-2 font-mono italic">${altText || 'Gambar Ilustrasi'}</p></div>`;
      insertHTML(imgHtml);
    }
  };

  const handleAddHeading = (tag: string) => {
    executeCommand('formatBlock', tag);
  };

  const handleAddTipBox = () => {
    const title = prompt("Masukkan Judul Tips Bang Ipul:", "💡 Tips Perawatan:");
    const tipsContent = prompt("Masukkan isi tips/saran:", "Cabut steker colokan dari stopkontak bila alat tidak digunakan dalam jangka panjang.");
    if (tipsContent) {
      const tipBoxHtml = `
        <div class="p-5 my-6 bg-amber-50/75 border-l-4 border-amber-500 rounded-r-2xl border border-slate-100 shadow-sm">
          <p class="text-slate-900 font-extrabold text-sm mb-1">${title || '💡 Tips Bang Ipul:'}</p>
          <p class="text-slate-700 text-sm leading-relaxed">${tipsContent}</p>
        </div>
      `;
      insertHTML(tipBoxHtml);
    }
  };

  const handleAddTable = () => {
    const tableHtml = `
      <div class="overflow-x-auto my-6 border border-slate-100 rounded-xl shadow-sm">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-slate-100/80 border-b border-slate-200">
              <th class="px-4 py-3 text-left font-extrabold text-slate-900">Gejala Masalah</th>
              <th class="px-4 py-3 text-left font-extrabold text-slate-900">Kemungkinan Kerusakan</th>
              <th class="px-4 py-3 text-left font-extrabold text-slate-900">Solusi Bang Ipul</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-150">
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800">Layar TV Gelap tapi Suara Ada</td>
              <td class="px-4 py-3 text-slate-600">Lampu Backlight LED Terbakar</td>
              <td class="px-4 py-3 text-emerald-700 font-bold">Ganti set lampu backlight LED original</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800">AC Bocor Air Menetes</td>
              <td class="px-4 py-3 text-slate-600">Saluran pembuangan kotor berlendir</td>
              <td class="px-4 py-3 text-emerald-700 font-bold">Steam cuci AC & bersihkan drainase</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800">Mesin Cuci Tidak Berputar</td>
              <td class="px-4 py-3 text-slate-600">Kapasitor Dinamo Lemah/Putus</td>
              <td class="px-4 py-3 text-emerald-700 font-bold">Ganti Kapasitor dengan ukuran mikrofarad sesuai</td>
            </tr>
          </tbody>
        </table>
      </div>
    `;
    insertHTML(tableHtml);
  };

  // Fast Inject Template Sample Article to test WYSIWYG
  const handleInjectSampleTemplate = () => {
    const sampleHtml = `
      <h2>💡 Mengenal 4 Komponen Utama Penyebab TV LED Rusak & Solusinya</h2>
      <p>Banyak pelanggan Service Elektronik Sinar Barokah yang mengeluhkan TV LED kesayangan mereka mendadak tidak mau menyala, layarnya buram, ataupun ada suara serta bau gosong tanpa dibarengi gambar visual. Sebelum Anda membawa TV Anda ke bengkel servis, mari kita ulas 4 biang kerok utama kerusakan TV dengan tata letak penulisan yang rapi ini!</p>
      
      <div class="p-5 my-6 bg-amber-50/75 border-l-4 border-amber-500 rounded-r-2xl border border-slate-100 shadow-sm">
        <p class="text-slate-900 font-extrabold text-sm mb-1">📢 Warning Keselamatan oleh Bang Ipul:</p>
        <p class="text-slate-700 text-sm leading-relaxed">Selalu cabut stopkontak TV Anda dari aliran daya sebelum mencoba memeriksa panel bagian luar. Bagian kapasitor pada power supply bisa menyimpan muatan listrik tegangan tinggi meskipun kabel sudah dicabut!</p>
      </div>

      <h3>1. Backlight LED (Lampu Latar Gelap)</h3>
      <p>Masalah paling umum pada TV LED adalah <i>"Suara normal terdengar di speaker tetapi layar benar-benar gelap gulita"</i>. Hal ini dipicu oleh matinya salah satu lampu LED pada rangkaian seri backlight. Karena dirangkai secara seri, jika satu lampu putus, seluruh barisan lampu latar akan ikut padam.</p>
      
      <h3>2. Power Supply Unit (PSU) Rusak Kosong</h3>
      <p>Bila lampu indikator standby di pojok TV Anda mati total tidak berkedip, kemungkinan besar terjadi kerusakan sirkuit pada papan regulator PSU. Kerusakan biasanya dipicu oleh elco kembung, dioda jebol, atau transistor regulator terbakar akibat fluktuasi voltase listrik PLN.</p>

      <h3>Tabel Panduan Diagnosa Mandiri TV LED Sinar Barokah:</h3>
      <div class="overflow-x-auto my-6 border border-slate-100 rounded-xl shadow-sm">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-slate-100/80 border-b border-slate-200">
              <th class="px-4 py-3 text-left font-extrabold text-slate-900">Kerusakan Visual</th>
              <th class="px-4 py-3 text-left font-extrabold text-slate-900">Penyebab Teknis</th>
              <th class="px-4 py-3 text-left font-extrabold text-slate-900">Solusi Service</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-150">
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800">Layar Gelap diterawang pakai senter HP ada bayangan tipis</td>
              <td class="px-4 py-3 text-slate-600">Lampu Backlight LED Mati</td>
              <td class="px-4 py-3 text-emerald-700 font-bold">Ganti Full-set Backlight Original</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800">TV Mati Total (Lampu Standby Padam)</td>
              <td class="px-4 py-3 text-slate-600">Kapasitor Regulator Elco Bocor/Meletus</td>
              <td class="px-4 py-3 text-emerald-700 font-bold">Ganti Elco Regulator Baru</td>
            </tr>
            <tr>
              <td class="px-4 py-3 font-semibold text-slate-800">Muncul Garis Vertikal atau Horisontal Statis</td>
              <td class="px-4 py-3 text-slate-600">Kabel COF T-Con Korosi Lemah</td>
              <td class="px-4 py-3 text-emerald-700 font-bold">Bonding ulang COF Kuping Panel LCD</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Kesimpulan Perawatan:</h3>
      <p>Untuk menghindari kerusakan backlight dan PSU yang berulang, disarankan menurunkan setting <b>"Backlight Level"</b> di menu pengaturan TV Anda dari tingkatan maksimal 100% ke kisaran 70-80% saja. Ini akan menghemat konsumsi watt listrik rumah Anda sekaligus memperpanjang umur kerja lampu hingga bertahun-tahun!</p>
    `;
    if (window.confirm("Apakah Anda ingin menimpa isi artikel saat ini dengan contoh artikel test terstruktur Sinar Barokah?")) {
      onChange(sampleHtml.trim());
      if (editorMode === 'visual' && editorRef.current) {
        editorRef.current.innerHTML = sampleHtml.trim();
      }
    }
  };

  return (
    <div className="w-full border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-900 bg-white transition-all shadow-sm">
      {/* Editor Toolbar Header */}
      <div className="flex flex-wrap items-center justify-between gap-1 bg-slate-50 border-b border-slate-200 p-2 select-none">
        {/* Style & Text Controls Group */}
        <div className="flex flex-wrap items-center gap-1">
          {editorMode === 'visual' ? (
            <>
              {/* Text formatting tags */}
              <button
                type="button"
                onClick={() => executeCommand('bold')}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all"
                title="Tebal (Bold)"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('italic')}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all"
                title="Miring (Italic)"
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('underline')}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all"
                title="Garis Bawah (Underline)"
              >
                <Underline className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>

              {/* Headings */}
              <button
                type="button"
                onClick={() => handleAddHeading('<h2>')}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all flex items-center font-bold text-xs"
                title="Sub-judul Utama (H2)"
              >
                <Heading className="w-4 h-4 mr-0.5" />2
              </button>
              <button
                type="button"
                onClick={() => handleAddHeading('<h3>')}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all flex items-center font-bold text-xs"
                title="Sub-judul Detil (H3)"
              >
                <Heading className="w-4 h-4 mr-0.5" />3
              </button>
              <button
                type="button"
                onClick={() => handleAddHeading('<p>')}
                className="px-2 py-1 text-slate-500 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all text-xs font-semibold"
                title="Paragraf Normal"
              >
                Normal
              </button>

              <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>

              {/* Lists */}
              <button
                type="button"
                onClick={() => executeCommand('insertUnorderedList')}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all"
                title="Daftar Bullet"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('insertOrderedList')}
                className="p-2 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all"
                title="Daftar Angka/Nomor"
              >
                <ListOrdered className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>

              {/* Alignments */}
              <button
                type="button"
                onClick={() => executeCommand('justifyLeft')}
                className="p-1.5 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all"
                title="Rata Kiri"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('justifyCenter')}
                className="p-1.5 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all"
                title="Rata Tengah"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('justifyRight')}
                className="p-1.5 text-slate-600 hover:text-blue-950 hover:bg-slate-200 rounded-lg transition-all"
                title="Rata Kanan"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>

              <div className="w-[1px] h-5 bg-slate-200 mx-1"></div>

              {/* Inserting Custom Rich blocks */}
              <button
                type="button"
                onClick={handleAddLink}
                className="p-2 text-slate-600 hover:text-amber-600 hover:bg-slate-200 rounded-lg transition-all"
                title="Sisipkan Tautan Link"
              >
                <LinkIcon className="w-4 h-4 text-blue-900" />
              </button>
              <button
                type="button"
                onClick={handleAddImage}
                className="p-2 text-slate-600 hover:text-amber-600 hover:bg-slate-200 rounded-lg transition-all"
                title="Sisipkan Gambar Ilustrasi"
              >
                <ImageIcon className="w-4 h-4 text-emerald-600" />
              </button>
              <button
                type="button"
                onClick={handleAddTipBox}
                className="p-2 text-slate-600 hover:text-amber-600 hover:bg-slate-200 rounded-lg transition-all"
                title="Sisipkan Kotak Tips Bang Ipul"
              >
                <Info className="w-4 h-4 text-amber-500" />
              </button>
              <button
                type="button"
                onClick={handleAddTable}
                className="p-2 text-slate-600 hover:text-amber-600 hover:bg-slate-200 rounded-lg transition-all"
                title="Sisipkan Tabel Diagnosa & Garansi"
              >
                <TableIcon className="w-4 h-4 text-purple-600" />
              </button>
              <button
                type="button"
                onClick={() => executeCommand('removeFormat')}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Hapus Semua Format Penulisan"
              >
                <Eraser className="w-4 h-4" />
              </button>
            </>
          ) : (
            <div className="text-xs font-mono font-bold text-slate-400 px-3 py-1 bg-slate-250 rounded-full select-none">
              &lt; / &gt; MODE EDITOR SOURCE CODE (HTML)
            </div>
          )}
        </div>

        {/* Templates & HTML Mode Controllers Group */}
        <div className="flex items-center gap-1">
          {editorMode === 'visual' && (
            <button
              type="button"
              onClick={handleInjectSampleTemplate}
              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500 text-amber-700 hover:text-slate-900 text-xs font-extrabold rounded-lg transition-all flex items-center gap-1.5 border border-amber-500/20"
              title="Masukkan Contoh Artikel Service secara Instan"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Contoh Artikel</span>
            </button>
          )}
          
          <button
            type="button"
            onClick={() => setEditorMode(prev => prev === 'visual' ? 'code' : 'visual')}
            className={`p-2 rounded-lg transition-all flex items-center gap-1 ml-1 ${
              editorMode === 'code' 
                ? 'bg-blue-900 text-white font-semibold' 
                : 'text-slate-600 hover:bg-slate-200 hover:text-blue-950'
            }`}
            title={editorMode === 'visual' ? "Pindah ke Edit Source Code HTML" : "Pindah ke Edit Visual WYSIWYG"}
          >
            {editorMode === 'visual' ? (
              <>
                <Code className="w-4 h-4" />
                <span className="text-xs font-bold hidden sm:inline">HTML</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span className="text-xs font-bold hidden sm:inline">Visual</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Content Body Area */}
      <div className="p-1">
        {editorMode === 'visual' ? (
          <div
            id="wysiwyg-content-editable"
            ref={editorRef}
            contentEditable={true}
            onInput={handleInput}
            onBlur={handleInput}
            className="w-full min-h-[300px] max-h-[500px] overflow-y-auto px-5 py-4 focus:outline-none focus:ring-0 text-slate-700 font-sans text-sm md:text-base leading-relaxed prose max-w-none prose-slate"
            style={{ 
              whiteSpace: "normal"
            }}
            placeholder={placeholder}
          />
        ) : (
          <textarea
            rows={14}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[300px] font-mono p-4 text-xs bg-slate-950 text-emerald-400 border-none focus:ring-0 rounded-b-xl"
            placeholder="Masukkan sirkuit HTML artikel manual di sini..."
          />
        )}
      </div>
      
      {/* Editor Footer Status Bar */}
      <div className="bg-slate-50/80 px-4 py-2 border-t border-slate-150 text-[10px] text-slate-400 font-mono flex items-center justify-between">
        <span>Karakter: {value?.length || 0}</span>
        <span>HTML Mode: {editorMode.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default RichTextEditor;
