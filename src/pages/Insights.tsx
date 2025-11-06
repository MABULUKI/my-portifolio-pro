import { useState, useEffect, memo, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
// Define consistent types
interface Post {
  id?: number;
  title: string;
  date: string;
  content: string;
  image: string;
  author?: string;
  readTime?: string;
  category?: string;
}

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg my-4">
    <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
    <p className="text-sm mb-2">{error.message}</p>
    <button 
      onClick={resetErrorBoundary}
      className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded text-sm transition-colors"
    >
      Try again
    </button>
  </div>
);

// Loading skeleton component
const CardSkeleton = () => (
  <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
    <div className="w-full h-48 bg-gray-200"></div>
    <div className="p-5 flex flex-col flex-grow">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

// Memoized card component for performance
const InsightCard = memo(({
  post,
  onReadMore,
}: {
  post: Post;
  onReadMore: (post: Post) => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = useCallback(() => {
    onReadMore(post);
  }, [post, onReadMore]);

  const handleButtonClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onReadMore(post);
  }, [post, onReadMore]);

  return (
    <article 
      className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border border-gray-100 group cursor-pointer"
      onClick={handleCardClick}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
      aria-label={`Read more about ${post.title}`}
    >
      <div className="relative w-full h-48 overflow-hidden ">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image unavailable</span>
          </div>
        ) : (
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {post.category && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow bg-gradient-to-r from-blue-50 to-blue-50">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span>{post.date}</span>
          {post.readTime && (
            <>
              <span className="mx-2">•</span>
              <span>{post.readTime} read</span>
            </>
          )}
        </div>
        <h6 className="text-xl font-medium text-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
          {post.title}
        </h6>
        <p className="text-base text-gray-700 flex-grow leading-relaxed mb-4 line-clamp-3">
          {post.content}
        </p>
        <button
          onClick={handleButtonClick}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition flex items-center self-start group"
          aria-label={`Read more about ${post.title}`}
        >
          Read More 
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
    </article>
  );
});

const staticPosts: Post[] = [
  {
    id: 1,
    title: "Empowering Local Miners through Digital Mapping",
    date: "October 28, 2025",
    content: "We launched a GIS-based mapping tool to help small-scale miners identify exploration areas and access better markets — promoting transparency, sustainability, and smarter decisions.",
    image: "https://media.gettyimages.com/id/477196585/photo/ore-and-conveyor-belt-aerial.jpg?s=612x612&w=0&k=20&c=cef5qrgk8DLkCXPcf5-MenLNW0QdBXBadfGWT265GF0=",
    author: "Sarah Johnson",
    readTime: "5 min",
    category: "Technology"
  },
  {
    id: 2,
    title: "New Partnership: Tech-Driven Mining Advisory",
    date: "November 2, 2025",
    content: "Partnering with regional investors to deliver transparent, data-driven insights for ethical mineral trading and resource management.",
    image: "https://media.gettyimages.com/id/94922745/photo/crystal-and-metal.jpg?s=612x612&w=0&k=20&c=y8-qrHlYQjsGa09CGxF2hYEMb6G8qFkMoeNpxhtaM9g=",
    author: "Michael Chen",
    readTime: "3 min",
    category: "Partnership"
  },
  {
    id: 3,
    title: "Sustainability First: Our Vision for Responsible Mining",
    date: "November 4, 2025",
    content: "We're developing frameworks for environmentally sustainable mining — emphasizing community welfare, ethical sourcing, and digital traceability.",
    image: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=600",
    author: "Elena Rodriguez",
    readTime: "7 min",
    category: "Sustainability"
  },
];
const Insights = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
   const fetchedPosts = useQuery(api.functions.blogs.getBlogs) as Post[] | undefined;

     useEffect(() => {
    if (fetchedPosts !== undefined) {
      setIsLoading(false); // Data is ready, stop loading
    } else {
      setIsLoading(true); // Still loading
    }
  }, [fetchedPosts]);

  const posts = fetchedPosts && fetchedPosts.length > 0 ? fetchedPosts : staticPosts;
  // Simulate fetching posts
   useEffect(() => {
    if (selectedPost) {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsModalOpen(false);
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  useEffect(() => {
    if (selectedPost) {
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsModalOpen(false);
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPost]);

  const closeModal = useCallback(() => {
    setSelectedPost(null);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share && selectedPost) {
      navigator.share({
        title: selectedPost.title,
        text: selectedPost.content,
        url: window.location.href,
      }).catch(err => console.log('Error sharing:', err));
    }
  }, [selectedPost]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <section
        id="insights"
        className="py-16 px-4 sm:px-6 md:px-10 lg:px-16"
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="relative inline-block text-gray-900 mb-4 text-5xl font-semibold">
              <span className="relative z-10">Latest Insights</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-blue-200 opacity-50 -z-10 transform -skew-x-12"></span>
            </h2>
            <p className="text-gray-600 max-w-md mx-auto text-base">
              Explore the latest updates and innovations in responsible mining and
              digital transformation.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {isLoading 
              ? Array.from({ length: 3 }).map((_, index) => <CardSkeleton key={index} />)
              : posts.map((post) => (
                  <InsightCard key={post.id} post={post} onReadMore={setSelectedPost} />
                ))
            }
          </div>

          {/* Modal */}
          {isModalOpen && selectedPost && (
            <div 
              className={`fixed inset-0 flex items-center justify-center z-50 px-4 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
              onClick={closeModal}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
              <div 
                className={`bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative transform transition-all duration-300 ${isModalOpen ? 'scale-100' : 'scale-95'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 text-gray-700 hover:text-gray-900 transition-all"
                    aria-label="Close modal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)] ">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{selectedPost.date}</span>
                    {selectedPost.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>By {selectedPost.author}</span>
                      </>
                    )}
                    {selectedPost.readTime && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{selectedPost.readTime} read</span>
                      </>
                    )}
                  </div>
                  
                  <h3 id="modal-title" className="text-4xl font-semibold text-gray-900 mb-4">
                    {selectedPost.title}
                  </h3>
                  
                  <div className="prose prose-sm max-w-none">
                    <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedPost.content}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                    <button
                      onClick={closeModal}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md transition-colors"
                    >
                      Close
                    </button>
                    
                    <button 
                      onClick={handleShare}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Insights;