import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type Id } from "../../../convex/_generated/dataModel";

interface Project {
  _id?: Id<"projects">; // Convex document ID
  title: string;
  description: string;
  image?: string; // base64 or URL
  link: string;
  technologies: string[];
}

// Fallback projects
const fallbackProjects: Project[] = [
  {
    _id: "1" as Id<"projects">,
    title: "Sample Project",
    description: "This is a fallback project description.",
    image: "",
    link: "#",
    technologies: ["React", "Tailwind"],
  },
  {
    _id: "2" as Id<"projects">,
    title: "Another Project",
    description: "Another fallback project description.",
    image: "",
    link: "#",
    technologies: ["Node.js", "Express"],
  },
];

const ProjectsPanel = () => {
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Convex queries & mutations
  const fetchedProjects = useQuery(api.functions.projects.getProjects) as Project[] | undefined;
  const addProjectMutation = useMutation(api.functions.projects.addProject);
  const updateProjectMutation = useMutation(api.functions.projects.updateProject);
  const deleteProjectMutation = useMutation(api.functions.projects.deleteProject);

  useEffect(() => {
    if (fetchedProjects && fetchedProjects.length > 0) {
      setProjects(fetchedProjects.map(p => ({ ...p, _id: p._id || undefined })));
    }
  }, [fetchedProjects]);

  const handleAdd = () => {
    setSelectedProject({ title: "", description: "", image: "", link: "", technologies: [] });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: Id<"projects"> | undefined) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await deleteProjectMutation({ id });
      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete project");
    }
  };

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedProject(prev => prev ? { ...prev, image: e.target?.result as string } : prev);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!selectedProject) return;

    try {
      if (isAdding) {
        const newId = await addProjectMutation({
          title: selectedProject.title,
          description: selectedProject.description,
          image: selectedProject.image || "",
          link: selectedProject.link,
          technologies: selectedProject.technologies,
        }) as Id<"projects">;

        setProjects(prev => [...prev, { ...selectedProject, _id: newId }]);
      } else {
        const updatedProject = await updateProjectMutation({
          id: selectedProject._id!,
          newData: {
            title: selectedProject.title,
            description: selectedProject.description,
            image: selectedProject.image || "",
            link: selectedProject.link,
            technologies: selectedProject.technologies,
          },
        }) as Project;

        setProjects(prev => prev.map(p => (p._id === updatedProject._id ? updatedProject : p)));
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save project");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="font-bold text-blue-500 text-lg sm:text-2xl">Projects Panel</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Add New Project
        </button>
      </div>

      {/* Projects List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects.map((project, idx) => (
          <div
            key={project._id || idx}
            className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}
            <h3 className="font-semibold text-blue-600 truncate">{project.title}</h3>
            <p className="text-gray-700 text-sm mt-1 line-clamp-3 flex-grow">
              {project.description}
            </p>
            <p className="text-gray-400 text-xs mt-2 truncate">
              Link:{" "}
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-500"
              >
                {project.link}
              </a>
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Tech: {project.technologies.join(", ")}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(project)}
                className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition"
              >
                Edit
              </button>
              {project._id && (
                <button
                  onClick={() => handleDelete(project._id!)}
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
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4 overflow-y-auto"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full relative animate-fadeIn shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4 text-center">
              {isAdding ? "Add New Project" : "Edit Project"}
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={selectedProject.title}
                onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description"
                value={selectedProject.description}
                onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
              <input
                type="text"
                placeholder="Project Link"
                value={selectedProject.link}
                onChange={(e) => setSelectedProject({ ...selectedProject, link: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                <input
                  type="text"
                  value={selectedProject.technologies.join(", ")}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      technologies: e.target.value.split(",").map(t => t.trim()),
                    })
                  }
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {selectedProject.image && (
                  <img
                    src={selectedProject.image}
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
              {isAdding ? "Add Project" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPanel;
