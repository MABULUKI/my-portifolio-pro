import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface HeroImage {
  _id?: string;
  title?: string;
  subtitle?: string;
  image?: string;
}

const fallbackImages: HeroImage[] = [
  { _id: "1", title: "Sample Hero", subtitle: "Fallback hero description." },
  { _id: "2", title: "Another Hero", subtitle: "Another fallback description." },
];

const HeroImagesPanel = () => {
  const [heroImages, setHeroImages] = useState<HeroImage[]>(fallbackImages);
  const [selectedImage, setSelectedImage] = useState<HeroImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch backend data
  const fetchedImages = useQuery(api.functions.heroImages.getHeroImages) as HeroImage[] | undefined;

  // Convex mutations
  const addHeroImage = useMutation(api.functions.heroImages.addHeroImage);
  const updateHeroImage = useMutation(api.functions.heroImages.updateHeroImage);
  const deleteHeroImage = useMutation(api.functions.heroImages.deleteHeroImage);

  // Sync backend or fallback
  useEffect(() => {
    if (fetchedImages && fetchedImages.length > 0) {
      setHeroImages(fetchedImages);
    }
  }, [fetchedImages]);

  // Add/Edit/Delete handlers
  const handleAdd = () => {
    setSelectedImage({ title: "", subtitle: "", image: "" });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleEdit = (image: HeroImage) => {
    setSelectedImage(image);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteHeroImage({ id });
      setHeroImages(prev => prev.filter(img => img._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete item");
    }
  };

  const handleSave = async () => {
    if (!selectedImage) return;

    try {
      if (isAdding) {
        const resId = await addHeroImage({
          title: selectedImage.title || "",
          subtitle: selectedImage.subtitle || "",
          image: selectedImage.image || "",
        });

        setHeroImages(prev => [...prev, { ...selectedImage, _id: resId as string }]);
      } else {
        if (!selectedImage.image) selectedImage.image = "";

        const updatedHero = await updateHeroImage({
          id: selectedImage._id!,
          newData: {
            title: selectedImage.title,
            subtitle: selectedImage.subtitle,
            image: selectedImage.image,
          },
        });

        setHeroImages(prev =>
          prev.map(img => (img._id === updatedHero._id ? updatedHero : img))
        );
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save item");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h2 className="font-bold text-blue-500 text-lg sm:text-xl">Hero Images Panel</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow"
        >
          Add New Item
        </button>
      </div>

      {/* Responsive Grid Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {heroImages.map((img, idx) => (
          <div
            key={img._id || idx}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Header / Image placeholder */}
            <div className="h-24 sm:h-28 bg-blue-50 flex items-center justify-center text-blue-400 font-bold text-xl sm:text-2xl">
              {img.title ? img.title.charAt(0) : "?"}
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-blue-500 truncate">{img.title || "No Title"}</h3>
                <p className="text-gray-700 text-sm sm:text-base mt-1 line-clamp-3">{img.subtitle || "No description available."}</p>
              </div>

              {/* Actions */}
              <div className="mt-3 flex justify-end gap-2">
                <button
                  onClick={() => handleEdit(img)}
                  className="px-2 sm:px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm shadow-sm transition-colors"
                >
                  Edit
                </button>
                {img._id && (
                  <button
                    onClick={() => handleDelete(img._id!)}
                    className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm shadow-sm transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

     {/* Modal */}
{isModalOpen && selectedImage && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    onClick={() => setIsModalOpen(false)}
  >
    <div
      className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-lg"
      onClick={e => e.stopPropagation()}
    >
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
      >
        ✕
      </button>
      <h3 className="text-lg sm:text-xl font-bold mb-4">{isAdding ? "Add New Hero" : "Edit Hero"}</h3>

      <div className="space-y-3 sm:space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={selectedImage.title}
          onChange={e => setSelectedImage({ ...selectedImage, title: e.target.value })}
          className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <textarea
          placeholder="Description"
          value={selectedImage.subtitle}
          onChange={e => setSelectedImage({ ...selectedImage, subtitle: e.target.value })}
          className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          rows={3}
        />

        {/* Choose File Input for Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Choose Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                  setSelectedImage(prev => prev ? { ...prev, image: ev.target?.result as string } : prev);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          />
          {selectedImage.image && (
            <img
              src={selectedImage.image}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg"
            />
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-4 w-full px-4 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base"
      >
        {isAdding ? "Add Hero" : "Save Changes"}
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default HeroImagesPanel;
