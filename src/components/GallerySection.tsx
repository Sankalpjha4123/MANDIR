import React, { useState, useEffect } from 'react';
import { GALLERY_DATA, GalleryImage } from '../data/templeData';
import { playTempleBell } from '../utils/audioEngine';

interface GallerySectionProps {
  lang: 'hi' | 'en';
}

export const GallerySection: React.FC<GallerySectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const [customImages, setCustomImages] = useState<GalleryImage[]>([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form states for adding new mandir picture
  const [newTitleHi, setNewTitleHi] = useState('');
  const [newCategory, setNewCategory] = useState<'temple' | 'deities' | 'festivals' | 'rituals'>('temple');
  const [newCaptionHi, setNewCaptionHi] = useState('');
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file');
  const [successMessage, setSuccessMessage] = useState(false);

  // Load custom user added images from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('mandir_custom_gallery_photos');
      if (stored) {
        setCustomImages(JSON.parse(stored));
      }
    } catch (_) {}
  }, []);

  const categories = [
    { id: 'all', labelHi: 'सभी छायाचित्र', labelEn: 'All Photos' },
    { id: 'temple', labelHi: 'मंदिर परिसर व स्थापत्य', labelEn: 'Mandir Architecture' },
    { id: 'deities', labelHi: 'आराध्य देव गर्भगृह', labelEn: 'Deities Sanctum' },
    { id: 'festivals', labelHi: 'उत्सव व कार्यक्रम', labelEn: 'Festivals' },
    { id: 'rituals', labelHi: 'अनुष्ठान व सेवा', labelEn: 'Rituals & Seva' },
  ];

  // Combine default pictures with user-added custom pictures
  const allImages = [...customImages, ...GALLERY_DATA];

  const filteredImages =
    activeCategory === 'all'
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  // Handle local file selection (supports multiple files)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      if (files.length === 1) {
        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setImagePreview(result);
          setImageUrlInput(result);
        };
        reader.readAsDataURL(file);
      } else {
        // Multi-file batch upload!
        const newBatch: GalleryImage[] = [];
        let loadedCount = 0;
        Array.from(files).forEach((file, index) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const dataUrl = reader.result as string;
            newBatch.push({
              id: 'custom-' + Date.now() + '-' + index,
              titleHi: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'मंदिर छायाचित्र',
              titleEn: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') || 'Mandir Photo',
              category: newCategory,
              imageUrl: dataUrl,
              captionHi: 'श्री १००८ नवचेतना शिव शक्ति मंदिर का पावन छायाचित्र।',
              captionEn: 'Sacred photograph of Shri 1008 Nav Chetna Shiv Shakti Mandir.',
            });
            loadedCount++;
            if (loadedCount === files.length) {
              const updated = [...newBatch, ...customImages];
              setCustomImages(updated);
              try {
                localStorage.setItem('mandir_custom_gallery_photos', JSON.stringify(updated));
              } catch (_) {}
              playTempleBell();
              setSuccessMessage(true);
              setTimeout(() => {
                setSuccessMessage(false);
                setShowAddModal(false);
              }, 1500);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    }
  };

  const handleAddPictureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = imagePreview || imageUrlInput.trim();
    if (!finalUrl || !newTitleHi.trim()) return;

    const newImage: GalleryImage = {
      id: 'custom-' + Date.now(),
      titleHi: newTitleHi.trim(),
      titleEn: newTitleHi.trim(),
      category: newCategory,
      imageUrl: finalUrl,
      captionHi: newCaptionHi.trim() || 'श्री १००८ नवचेतना शिव शक्ति मंदिर का पावन छायाचित्र।',
      captionEn: newCaptionHi.trim() || 'Sacred photograph of Shri 1008 Nav Chetna Shiv Shakti Mandir.',
    };

    const updated = [newImage, ...customImages];
    setCustomImages(updated);
    try {
      localStorage.setItem('mandir_custom_gallery_photos', JSON.stringify(updated));
    } catch (_) {}

    playTempleBell();
    setSuccessMessage(true);

    setTimeout(() => {
      setSuccessMessage(false);
      setShowAddModal(false);
      setNewTitleHi('');
      setNewCaptionHi('');
      setImageUrlInput('');
      setImagePreview('');
    }, 1500);
  };

  const handleDeleteCustomImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customImages.filter((img) => img.id !== id);
    setCustomImages(updated);
    try {
      localStorage.setItem('mandir_custom_gallery_photos', JSON.stringify(updated));
    } catch (_) {}
  };

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-20 w-full" id="gallery-section">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <span className="text-xs sm:text-sm uppercase tracking-widest text-[#9d2f00] font-bold">
          {lang === 'hi' ? 'पावन दर्शन दीर्घा' : 'Sacred Photo Gallery'}
        </span>
        <h2 className="font-serif-devanagari text-2xl sm:text-4xl text-[#2a170f] font-bold mt-2">
          {lang === 'hi' ? 'मंदिर छायाचित्र एवं पावन दर्शन' : 'Mandir Photos & Sanctum Gallery'}
        </h2>
        <p className="text-sm sm:text-base text-[#5a4139] mt-3">
          {lang === 'hi'
            ? 'श्री १००८ नवचेतना शिव शक्ति के भव्य शिखर, गुलाबी तोरण, स्वर्ण कलश, गर्भगृह एवं उत्सवों के अलौकिक छायाचित्र।'
            : 'Explore architectural beauty, sacred pink arches, golden kalash spire, sanctums and vibrant festivities.'}
        </p>

        {/* Action Button: Add Mandir Picture */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-full text-xs sm:text-sm font-bold shadow-md hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffdea3]">add_photo_alternate</span>
            <span>{lang === 'hi' ? '+ नया मंदिर चित्र जोड़ें' : '+ Add Mandir Picture'}</span>
          </button>
          {customImages.length > 0 && (
            <span className="text-xs text-[#705100] bg-[#fff1ec] px-3 py-1.5 rounded-full border border-[#ffe9e2] font-semibold">
              {customImages.length} {lang === 'hi' ? 'भक्तों द्वारा जोड़े गए चित्र' : 'Custom Photo(s) Added'}
            </span>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#9d2f00] text-white shadow-md'
                  : 'bg-white text-[#5a4139] hover:bg-[#ffe9e2] border border-[#ffe9e2]'
              }`}
            >
              {lang === 'hi' ? cat.labelHi : cat.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((img) => {
          const isCustom = img.id.startsWith('custom-');
          return (
            <div
              key={img.id}
              onClick={() => setActiveImage(img)}
              className="group relative rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(44,24,16,0.06)] bg-white cursor-pointer border border-[#ffe9e2] hover:shadow-[0_12px_28px_rgba(44,24,16,0.12)] hover:-translate-y-1 transition-all"
            >
              <div className="h-64 sm:h-72 overflow-hidden relative">
                <img
                  src={img.imageUrl}
                  alt={img.titleHi}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85 group-hover:opacity-65 transition-opacity" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#9d2f00]/90 backdrop-blur-md text-white text-[11px] font-bold shadow">
                    {img.category === 'temple'
                      ? lang === 'hi' ? 'मंदिर परिसर' : 'Mandir Architecture'
                      : img.category === 'deities'
                      ? lang === 'hi' ? 'आराध्य देव' : 'Sanctum'
                      : img.category === 'festivals'
                      ? lang === 'hi' ? 'उत्सव' : 'Festival'
                      : lang === 'hi' ? 'अनुष्ठान' : 'Ritual'}
                  </span>
                  {isCustom && (
                    <span className="px-2 py-0.5 rounded-full bg-[#ffdea3] text-[#705100] text-[10px] font-bold">
                      {lang === 'hi' ? 'नया चित्र' : 'User Added'}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {isCustom && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteCustomImage(img.id, e)}
                      title="चित्र हटाएं (Delete)"
                      className="bg-black/60 hover:bg-red-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                    </button>
                  )}
                  <div className="bg-white/80 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center text-[#9d2f00] shadow group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[18px]">zoom_in</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-serif text-base sm:text-lg font-bold leading-tight drop-shadow">
                    {lang === 'hi' ? img.titleHi : img.titleEn}
                  </h3>
                  <p className="text-xs text-[#ffdea3] mt-1 line-clamp-2">
                    {lang === 'hi' ? img.captionHi : img.captionEn}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Mandir Picture Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fff8f6] rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border-2 border-[#b58a2a] p-6 sm:p-7 relative">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#ffe9e2] text-[#9d2f00] flex items-center justify-center mx-auto mb-2">
                <span className="material-symbols-outlined text-[26px]">add_photo_alternate</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#2a170f] font-bold">
                {lang === 'hi' ? 'गैलरी में मंदिर चित्र जोड़ें' : 'Add Mandir Picture to Gallery'}
              </h3>
              <p className="text-xs text-[#5a4139] mt-1">
                {lang === 'hi'
                  ? 'अपने फोन या कंप्यूटर से मंदिर परिसर, गर्भगृह अथवा आरती का पावन चित्र अपलोड करें।'
                  : 'Upload temple pictures from your device or paste an image URL.'}
              </p>
            </div>

            {!successMessage ? (
              <form onSubmit={handleAddPictureSubmit} className="space-y-4">
                {/* Mode Selector (File vs URL) */}
                <div className="flex bg-[#ffe9e2] p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setUploadMode('file')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      uploadMode === 'file' ? 'bg-white text-[#9d2f00] shadow-sm' : 'text-[#5a4139]'
                    }`}
                  >
                    📁 {lang === 'hi' ? 'डिवाइस से फोटो चुनें' : 'Upload File'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode('url')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      uploadMode === 'url' ? 'bg-white text-[#9d2f00] shadow-sm' : 'text-[#5a4139]'
                    }`}
                  >
                    🔗 {lang === 'hi' ? 'वेब इमेज लिंक (URL)' : 'Paste Image URL'}
                  </button>
                </div>

                {/* Upload Input */}
                {uploadMode === 'file' ? (
                  <div>
                    <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                      {lang === 'hi' ? 'फोटो फाइल चुनें (एक या एक से अधिक JPG, PNG, WebP) *' : 'Select Photo(s) (One or more JPG, PNG, WebP) *'}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      required={!imagePreview}
                      className="w-full text-xs text-[#5a4139] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#9d2f00] file:text-white hover:file:bg-[#c63f02] cursor-pointer"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                      {lang === 'hi' ? 'इमेज वेब लिंक (URL) दर्ज करें *' : 'Image URL *'}
                    </label>
                    <input
                      type="url"
                      required
                      value={imageUrlInput}
                      onChange={(e) => {
                        setImageUrlInput(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="https://example.com/mandir-photo.jpg"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                    />
                  </div>
                )}

                {/* Live Image Preview */}
                {imagePreview && (
                  <div className="relative h-44 rounded-2xl overflow-hidden border-2 border-[#b58a2a] bg-black/10">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-0.5 rounded text-white text-[10px] font-bold">
                      पूर्वावलोकन (Preview)
                    </div>
                  </div>
                )}

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                    {lang === 'hi' ? 'चित्र का शीर्षक (Title) *' : 'Photo Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitleHi}
                    onChange={(e) => setNewTitleHi(e.target.value)}
                    placeholder={lang === 'hi' ? 'उदा: नवनिर्मित मुख्य द्वार एवं तोरण' : 'e.g. Sanctum Courtyard'}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                    {lang === 'hi' ? 'गैलरी श्रेणी (Category) *' : 'Gallery Category *'}
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as 'temple' | 'deities' | 'festivals' | 'rituals')
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  >
                    <option value="temple">मंदिर परिसर व स्थापत्य (Mandir Architecture)</option>
                    <option value="deities">आराध्य देव गर्भगृह (Deities Sanctum)</option>
                    <option value="festivals">उत्सव व कार्यक्रम (Festivals)</option>
                    <option value="rituals">अनुष्ठान व सेवा (Rituals & Seva)</option>
                  </select>
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-xs font-bold text-[#705100] uppercase mb-1">
                    {lang === 'hi' ? 'विवरण या अनुभव (Caption)' : 'Caption / Description'}
                  </label>
                  <textarea
                    rows={2}
                    value={newCaptionHi}
                    onChange={(e) => setNewCaptionHi(e.target.value)}
                    placeholder="उदा: मंदिर शिखर के दिव्य दर्शन एवं फूलों से सुसज्जित द्वार..."
                    className="w-full px-4 py-2 rounded-xl border border-[#ffe9e2] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#9d2f00]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#9d2f00] hover:bg-[#c63f02] text-white rounded-xl text-sm font-bold shadow-md transition-colors flex items-center justify-center gap-2 mt-2"
                >
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                  <span>{lang === 'hi' ? 'गैलरी में सहेजें (Save Photo)' : 'Save Photo to Gallery'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="font-serif text-lg font-bold text-[#2a170f]">
                  {lang === 'hi' ? 'मंदिर चित्र सफलतापूर्वक जोड़ दिया गया!' : 'Mandir Picture Added Successfully!'}
                </h4>
                <p className="text-xs text-[#5a4139]">
                  {lang === 'hi'
                    ? 'चित्र अब गैलरी में प्रदर्शित हो रहा है।'
                    : 'The picture is now visible in the photo gallery.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#fff8f6] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#b58a2a]/40"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="max-h-[70vh] overflow-hidden flex items-center justify-center bg-black/10">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.titleHi}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 bg-white border-t border-[#ffe9e2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#9d2f00] uppercase tracking-wider block mb-1">
                  {activeImage.category === 'temple'
                    ? lang === 'hi' ? 'मंदिर परिसर व स्थापत्य' : 'Mandir Architecture'
                    : activeImage.category === 'deities'
                    ? lang === 'hi' ? 'आराध्य देव' : 'Deities Sanctum'
                    : activeImage.category === 'festivals'
                    ? lang === 'hi' ? 'उत्सव व कार्यक्रम' : 'Festivals'
                    : lang === 'hi' ? 'अनुष्ठान व सेवा' : 'Rituals & Seva'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#2a170f] font-bold">
                  {lang === 'hi' ? activeImage.titleHi : activeImage.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#5a4139] mt-1.5 leading-relaxed">
                  {lang === 'hi' ? activeImage.captionHi : activeImage.captionEn}
                </p>
              </div>

              <div className="flex gap-2 shrink-0">
                <a
                  href={activeImage.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="px-4 py-2 bg-[#fff1ec] hover:bg-[#ffe9e2] text-[#9d2f00] rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  <span>{lang === 'hi' ? 'फुल स्क्रीन' : 'Full View'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
