import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type Id } from "../../../convex/_generated/dataModel";

interface Service {
  _id?: Id<"services">;
  title: string;
  description: string;
  icon?: string; // base64 or URL
}

// Fallback services
const fallbackServices: Service[] = [
  { _id: "1" as Id<"services">, title: "Web Development", description: "Build modern websites.", icon: "" },
  { _id: "2" as Id<"services">, title: "Mobile Apps", description: "Develop cross-platform apps.", icon: "" },
];

const ServicesPanel = () => {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Convex queries & mutations
  const fetchedServices = useQuery(api.functions.services.getServices) as Service[] | undefined;
  const addServiceMutation = useMutation(api.functions.services.addService);
  const updateServiceMutation = useMutation(api.functions.services.updateService);
  const deleteServiceMutation = useMutation(api.functions.services.deleteService);

  useEffect(() => {
    if (fetchedServices && fetchedServices.length > 0) {
      setServices(fetchedServices.map(s => ({ ...s, _id: s._id || undefined })));
    }
  }, [fetchedServices]);

  const handleAdd = () => {
    setSelectedService({ title: "", description: "", icon: "" });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: Id<"services"> | undefined) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      await deleteServiceMutation({ id });
      setServices(prev => prev.filter(s => s._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete service");
    }
  };

  const handleIconChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedService(prev => prev ? { ...prev, icon: e.target?.result as string } : prev);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!selectedService) return;

    try {
      if (isAdding) {
        const newId = await addServiceMutation({
          title: selectedService.title,
          description: selectedService.description,
          icon: selectedService.icon || "",
        }) as Id<"services">;

        setServices(prev => [...prev, { ...selectedService, _id: newId }]);
      } else {
        const updatedService = await updateServiceMutation({
          id: selectedService._id!,
          newData: {
            title: selectedService.title,
            description: selectedService.description,
            icon: selectedService.icon || "",
          },
        }) as Service;

        setServices(prev =>
          prev.map(s => (s._id === updatedService._id ? updatedService : s))
        );
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save service");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="font-bold text-blue-500 text-lg sm:text-2xl">Services Panel</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Add New Service
        </button>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {services.map((service, idx) => (
          <div
            key={service._id || idx}
            className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {service.icon && (
              <img
                src={service.icon}
                alt={service.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}
            <h3 className="font-semibold text-blue-600 truncate">{service.title}</h3>
            <p className="text-gray-700 text-sm mt-1 line-clamp-3 flex-grow">{service.description}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(service)}
                className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition"
              >
                Edit
              </button>
              {service._id && (
                <button
                  onClick={() => handleDelete(service._id!)}
                  className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4 text-center">
              {isAdding ? "Add New Service" : "Edit Service"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={selectedService.title}
                onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description"
                value={selectedService.description}
                onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Icon</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleIconChange(e.target.files[0])}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {selectedService.icon && (
                  <img
                    src={selectedService.icon}
                    alt="Preview"
                    className="mt-3 w-full h-40 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="mt-5 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              {isAdding ? "Add Service" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPanel;
