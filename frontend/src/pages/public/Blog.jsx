import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Eye, 
  ArrowRight, 
  Search,
  Filter,
  TrendingUp,
  BookOpen,
  Tag
} from "lucide-react";
import api from "../../services/api";
import NewsletterCTA from "../../components/forms/Newsletter";

const BlogPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [featuredBlog, setFeaturedBlog] = useState(null);

  // Get unique categories from blogs
  const categories = ["all", ...new Set(blogs.map(blog => blog.category))];

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchTerm, categoryFilter, blogs]);

    

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/blogs");
      const blogsData = res.data;
      setBlogs(blogsData);
      
      // Find featured blog
      const featured = blogsData.find(blog => blog.featured) || blogsData[0];
      setFeaturedBlog(featured);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = blogs;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(blog => blog.category === categoryFilter);
    }

    setFilteredBlogs(filtered);
  };

  const getCategoryColor = (category) => {
    const colors = {
      "digital-strategy": "bg-purple-100 text-purple-700",
      "web-development": "bg-blue-100 text-blue-700",
      "ai-business": "bg-emerald-100 text-emerald-700",
      "digital-literacy": "bg-amber-100 text-amber-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-100 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-100 rounded w-64"></div>
          
          {/* Featured Blog Skeleton */}
          <div className="bg-white rounded-2xl overflow-hidden">
            <div className="h-64 bg-gray-200"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-xl border p-6 space-y-3">
                <div className="h-40 bg-gray-200 rounded-lg"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-15">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-semibold">Latest Insights</span>
            </div>
            
            <h1 className="text-2xl md:text-5xl font-bold mb-6">
              Digital Insights & <span className="text-emerald-600">Expertise</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Practical advice, strategies, and thoughts on digital business, AI, web development, and modern technology.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search insights..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === "all" ? "bg-white text-gray-900" : "bg-white/10 text-white hover:bg-white/20"}`}
              >
                All Topics
              </button>
              {categories.filter(cat => cat !== "all").map(category => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${categoryFilter === category ? "bg-white text-gray-900" : "bg-white/10 text-white hover:bg-white/20"}`}
                >
                  {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Blog */}
      {featuredBlog && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl  overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="relative h-64 lg:h-full min-h-[400px]">
                {featuredBlog.featuredImage ? (
                  <img
                    src={featuredBlog.featuredImage}
                    alt={featuredBlog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white/50" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredBlog.category)}`}>
                    {featuredBlog.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredBlog.createdAt)}
                  </div>
                  {featuredBlog.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredBlog.readingTime} min read
                    </div>
                  )}
                  {featuredBlog.views && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {featuredBlog.views.toLocaleString()} views
                    </div>
                  )}
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredBlog.title}
                </h2>

                <p className="text-lg text-gray-600 mb-6">
                  {featuredBlog.excerpt}
                </p>

                {featuredBlog.tags && featuredBlog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredBlog.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  to={`/blog/${featuredBlog.slug}`}
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold group"
                >
                  Read Full Insight
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Latest Insights</h2>
            <p className="text-gray-500 mt-1">
              {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4" />
            <span>Sorted by latest</span>
          </div>
        </div>

        {filteredBlogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map(blog => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="group bg-white rounded-xl  hover:border-emerald-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {blog.featuredImage ? (
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <BookOpen className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                      {blog.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(blog.createdAt)}
                    </div>
                    {blog.readingTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {blog.readingTime} min
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {blog.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span>{blog.views?.toLocaleString() || 0} views</span>
                    </div>
                    <div className="text-emerald-600 font-medium text-sm group-hover:text-emerald-700 transition-colors">
                      Read more →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No insights found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || categoryFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "No blog posts have been published yet"}
            </p>
            {(searchTerm || categoryFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      
        <NewsletterCTA />
    </div>
  );
};

export default BlogPage;