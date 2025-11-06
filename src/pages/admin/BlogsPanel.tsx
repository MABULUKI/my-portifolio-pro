import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { type Id } from "../../../convex/_generated/dataModel"; 

interface Blog {
  _id?: Id<"blogs">; // Convex document ID
  title: string;
  content: string;
  image?: string;
  author: string;
  date: number;
}

// Fallback blogs
const fallbackBlogs: Blog[] = [
  {
    title: "Sample Blog",
    content: "This is a fallback blog content.",
    author: "Admin",
    date: Date.now(),
  },
  {
    title: "Another Blog",
    content: "Another fallback blog content.",
    author: "Admin",
    date: Date.now(),
  },
];

const BlogsPanel = () => {
  const [blogs, setBlogs] = useState<Blog[]>(fallbackBlogs);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch blogs from backend
  // Fetch blogs
const fetchedBlogs = useQuery(api.functions.blogs.getBlogs) as Blog[] | undefined;

// Mutations
const addBlogMutation = useMutation(api.functions.blogs.addBlog);
const updateBlogMutation = useMutation(api.functions.blogs.updateBlog);
const deleteBlogMutation = useMutation(api.functions.blogs.deleteBlog);


  // Sync backend with state
  useEffect(() => {
    if (fetchedBlogs && fetchedBlogs.length > 0) {
      setBlogs(fetchedBlogs.map(b => ({ ...b, _id: b._id || undefined })));
    }
  }, [fetchedBlogs]);

  const handleAdd = () => {
    setSelectedBlog({ title: "", content: "", image: "", author: "", date: Date.now() });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleEdit = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsAdding(false);
    setIsModalOpen(true);
  };

const handleDelete = async (blogId: Id<"blogs"> | undefined) => {
  if (!blogId) return;
  if (!confirm("Are you sure you want to delete this blog?")) return;

  try {
    await deleteBlogMutation({ id: blogId });
    setBlogs(prev => prev.filter(b => b._id !== blogId));
  } catch (err) {
    console.error(err);
    alert("Failed to delete blog");
  }
};


  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedBlog(prev => prev ? { ...prev, image: e.target?.result as string } : prev);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
  if (!selectedBlog) return;

  try {
    if (isAdding) {
      const newId = await addBlogMutation({
        title: selectedBlog.title,
        content: selectedBlog.content,
        image: selectedBlog.image || "",
        author: selectedBlog.author,
        date: selectedBlog.date,
      }) as Id<"blogs">;

      setBlogs(prev => [...prev, { ...selectedBlog, _id: newId }]);
    } else {
      const updatedBlog = await updateBlogMutation({
        id: selectedBlog._id!, // now TS knows this is Id<"blogs">
        newData: {
          title: selectedBlog.title,
          content: selectedBlog.content,
          image: selectedBlog.image || "",
          author: selectedBlog.author,
          date: selectedBlog.date,
        },
      }) as Blog;

      setBlogs(prev => prev.map(b => (b._id === updatedBlog._id ? updatedBlog : b)));
    }

    setIsModalOpen(false);
  } catch (err) {
    console.error(err);
    alert("Failed to save blog");
  }
};


  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="font-bold text-blue-500 text-lg sm:text-2xl">Blogs Panel</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
          Add New Blog
        </button>
      </div>

      {/* Blogs List */}
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        {blogs.map((blog, idx) => (
          <div
            key={blog._id || idx}
            className="flex flex-col sm:flex-row justify-between items-start p-4 hover:bg-blue-50 transition-colors gap-4"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full sm:w-20 h-40 sm:h-20 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <h3 className="font-semibold text-blue-500">{blog.title}</h3>
              <p className="text-gray-700 text-sm mt-1 line-clamp-3">{blog.content}</p>
              <p className="text-gray-400 text-xs mt-1">
                Author: {blog.author} | {new Date(blog.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => handleEdit(blog)}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm transition-colors flex-1 sm:flex-auto"
              >
                Edit
              </button>
              {blog._id && (
                <button
                  onClick={() => handleDelete(blog._id!)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm transition-colors flex-1 sm:flex-auto"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedBlog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">{isAdding ? "Add New Blog" : "Edit Blog"}</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={selectedBlog.title}
                onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Content"
                value={selectedBlog.content}
                onChange={(e) => setSelectedBlog({ ...selectedBlog, content: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <input
                type="text"
                placeholder="Author"
                value={selectedBlog.author}
                onChange={(e) => setSelectedBlog({ ...selectedBlog, author: e.target.value })}
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageChange(e.target.files[0])}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {selectedBlog.image && (
                  <img src={selectedBlog.image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
                )}
              </div>
            </div>
            <button
              onClick={handleSave}
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isAdding ? "Add Blog" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsPanel;
