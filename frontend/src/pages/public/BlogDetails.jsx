import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Eye, 
  ArrowLeft, 
  Share2,
  Bookmark,
  Tag,
  User,
  TrendingUp,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  ChevronRight,
  Hash,
  Menu,
  X
} from "lucide-react";
import api from "../../services/api";
import NewsletterCTA from "../../components/forms/Newsletter";

const BlogDetail = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const [showMobileTOC, setShowMobileTOC] = useState(false);
  const contentRef = useRef(null);

  const headings = [
    { id: "introduction", title: "Introduction" },
    { id: "problem", title: "The Problem" },
    { id: "solution", title: "The Solution" },
    { id: "implementation", title: "Implementation" },
    { id: "results", title: "Results" },
    { id: "conclusion", title: "Conclusion" }
  ];

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const current = headings.find(heading => {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100;
        }
        return false;
      });
      if (current) {
        setActiveHeading(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/blogs/${slug}`);
      setBlog(res.data);
      
      const relatedRes = await api.get(`/blogs/related/${res.data.category}`);
      setRelatedBlogs(relatedRes.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      "web": "bg-purple-100 text-purple-700",
      "app": "bg-blue-100 text-blue-700",
      "ai": "bg-emerald-100 text-emerald-700",
      "digital": "bg-amber-100 text-amber-700",
      "marketing": "bg-pink-100 text-pink-700",
        "branding": "bg-indigo-100 text-indigo-700",
        "tech": "bg-gray-100 text-gray-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog?.title || '';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-xl mb-8"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
        <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Navigation */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights
            </Link>
            
            {/* Mobile TOC Toggle */}
            <button
              onClick={() => setShowMobileTOC(!showMobileTOC)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border rounded-lg"
            >
              {showMobileTOC ? (
                <>
                  <X className="w-4 h-4" />
                  Close
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4" />
                  Contents
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Table of Contents Overlay */}
      {showMobileTOC && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileTOC(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Table of Contents
                </h3>
                <button
                  onClick={() => setShowMobileTOC(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={() => setShowMobileTOC(false)}
                    className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                      activeHeading === heading.id
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight className={`w-3 h-3 transition-transform ${
                        activeHeading === heading.id ? "rotate-90" : ""
                      }`} />
                      {heading.title}
                    </div>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-6 lg:mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 lg:mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(blog.category)}`}>
                  {blog.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
                <span className="hidden sm:inline text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{formatDate(blog.createdAt)}</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl  font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 lg:gap-4 text-sm text-gray-500 mb-6 lg:mb-8">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readingTime || 5} min read</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{(blog.views || 0).toLocaleString()} views</span>
                </div>
                {blog.author && (
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span>{blog.author}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {blog.featuredImage && (
              <div className="mb-6 lg:mb-8">
                <div className="rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <div className="mb-6 lg:mb-8">
                <div className="bg-gray-50 border-l-4 border-emerald-500 pl-4 sm:pl-6 py-3 sm:py-4">
                  <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{blog.excerpt}</p>
                </div>
              </div>
            )}

            {/* Share Buttons - Mobile Top */}
            <div className="flex lg:hidden items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Share:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare('twitter')}
                    className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('facebook')}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleShare('copy')}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {copied ? (
                      <span className="text-sm font-medium text-emerald-600">Copied</span>
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 border rounded-lg">
                <Bookmark className="w-4 h-4" />
                Save
              </button>
            </div>

            {/* Content */}
            <div ref={contentRef} className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
              <div
                className="[&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 sm:[&_h2]:mt-10 [&_h2]:mb-4 sm:[&_h2]:mb-6
                          [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-6 sm:[&_h3]:mt-8 [&_h3]:mb-3 sm:[&_h3]:mb-4
                          [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-4 sm:[&_p]:mb-6 [&_p]:text-base sm:[&_p]:text-lg
                          [&_ul]:list-disc [&_ul]:pl-5 sm:[&_ul]:pl-6 [&_ul]:mb-4 sm:[&_ul]:mb-6 [&_ul]:space-y-1 sm:[&_ul]:space-y-2
                          [&_ol]:list-decimal [&_ol]:pl-5 sm:[&_ol]:pl-6 [&_ol]:mb-4 sm:[&_ol]:mb-6 [&_ol]:space-y-1 sm:[&_ol]:space-y-2
                          [&_li]:text-gray-700 [&_li]:leading-relaxed
                          [&_a]:text-emerald-600 [&_a]:hover:text-emerald-700 [&_a]:underline
                          [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 sm:[&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-6 sm:[&_blockquote]:my-8
                          [&_code]:bg-gray-100 [&_code]:px-1.5 sm:[&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm
                          [&_pre]:bg-gray-900 [&_pre]:text-gray-100 [&_pre]:p-4 sm:[&_pre]:p-6 [&_pre]:rounded-lg [&_pre]:my-6 sm:[&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:text-sm sm:[&_pre]:text-base"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <span className="text-sm sm:text-base font-medium text-gray-700">Tags</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {blog.author && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <img 
                        src="/assets/author.jpg" 
                        alt={blog.author} 
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-900 text-base  sm:text-lg mb-1"><a href="https://www.linkedin.com/in/emmanuelkerich/">Emmanuel Kerich</a></h4>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Digital strategist and technology consultant helping businesses navigate the modern digital landscape.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Table of Contents (Sticky on desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-10">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                        activeHeading === heading.id
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ChevronRight className={`w-3 h-3 transition-transform ${
                          activeHeading === heading.id ? "rotate-90" : ""
                        }`} />
                        {heading.title}
                      </div>
                    </a>
                  ))}
                </nav>

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Share this article</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="p-2 text-gray-500 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <div className="bg-gray-50 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Related Articles</h2>
              <Link
                to="/blog"
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
              >
                View all
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedBlogs
                .filter(related => related._id !== blog._id)
                .slice(0, 3)
                .map(relatedBlog => (
                  <Link
                    key={relatedBlog._id}
                    to={`/blog/${relatedBlog.slug}`}
                    className="bg-white rounded-lg border hover:border-emerald-200 transition-colors"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded ${getCategoryColor(relatedBlog.category)}`}>
                          {relatedBlog.category.split('-')[0]}
                        </span>
                        <span className="text-xs text-gray-500">{formatDate(relatedBlog.createdAt)}</span>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                        {relatedBlog.title}
                      </h3>
                      
                      <p className="text-gray-600 line-clamp-3 mb-4 text-xs sm:text-sm">
                        {relatedBlog.excerpt}
                      </p>
                      
                      <div className="text-emerald-600 text-xs sm:text-sm font-medium">
                        Read more
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <NewsletterCTA/>
 
    </div>
  );
};

export default BlogDetail;