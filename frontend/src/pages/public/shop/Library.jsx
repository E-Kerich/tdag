import { useEffect, useState } from "react";
import { 
  Download, 
  File, 
  FileText, 
  Image, 
  Video, 
  Folder, 
  Calendar,
  Clock,
  Search,
  Filter,
  ChevronDown
} from "lucide-react";
import api from "../../../services/api";

const MyLibrary = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [downloading, setDownloading] = useState({});

  const categories = ["all", ...new Set(products.flatMap(p => p.category || []))];

  useEffect(() => {
    if (email) {
      fetchProducts();
    }
  }, [email]);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, categoryFilter, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/delivery/my-products?email=${email}`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => 
        product.category?.includes(categoryFilter)
      );
    }

    setFilteredProducts(filtered);
  };

  const download = async (productId, fileIndex, fileName) => {
    setDownloading(prev => ({ ...prev, [`${productId}-${fileIndex}`]: true }));
    
    try {
      const res = await api.post("/delivery/download", {
        email,
        productId,
        fileIndex
      });

      // Create a temporary link and trigger download
      const link = document.createElement("a");
      link.href = res.data.downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Track download in analytics
      await api.post("/delivery/track-download", {
        email,
        productId,
        fileName
      });

    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setDownloading(prev => ({ ...prev, [`${productId}-${fileIndex}`]: false }));
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    
    if (['pdf'].includes(ext)) return FileText;
    if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(ext)) return Image;
    if (['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext)) return Video;
    return File;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Required</h2>
          <p className="text-gray-600">Please access your library through the provided link with your email.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Folder className="w-8 h-8" />
                <h1 className="text-3xl md:text-4xl font-bold">My Digital Library</h1>
              </div>
              <p className="text-emerald-100">
                Access your purchased digital products and resources
              </p>
            </div>
            <div className="text-sm">
              <p className="text-emerald-100">Signed in as</p>
              <p className="font-medium">{email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats & Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-gray-600">
                <span className="font-medium text-gray-900">{filteredProducts.length}</span> products available
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none w-full sm:w-48"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(cat => cat !== "all").map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product._id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Product Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {product.title}
                      </h3>
                      {product.category && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.category.map((cat, idx) => (
                            <span key={idx} className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                              {cat}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    {product.featuredImage && (
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img 
                          src={product.featuredImage} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {product.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    {product.accessExpires && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Expires {formatDate(product.accessExpires)}</span>
                      </div>
                    )}
                    {product.lastAccessed && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Last accessed {formatDate(product.lastAccessed)}</span>
                      </div>
                    )}
                  </div>

                  {/* Files List */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Available Files ({product.files.length})
                    </p>
                    {product.files.map((file, index) => {
                      const FileIcon = getFileIcon(file.name);
                      const isDownloading = downloading[`${product._id}-${index}`];
                      
                      return (
                        <button
                          key={index}
                          onClick={() => download(product._id, index, file.name)}
                          disabled={isDownloading}
                          className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              <FileIcon className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium text-gray-900 truncate max-w-[180px]">
                                {file.name}
                              </p>
                              {file.size && (
                                <p className="text-xs text-gray-500">
                                  {Math.round(file.size / 1024 / 1024 * 100) / 100} MB
                                </p>
                              )}
                            </div>
                          </div>
                          {isDownloading ? (
                            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Download className="w-5 h-5 text-emerald-600" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Product Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-600">
                      Added {formatDate(product.createdAt)}
                    </div>
                    {product.downloadCount && (
                      <div className="text-gray-500">
                        Downloaded {product.downloadCount} times
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Folder className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm || categoryFilter !== "all" ? "No products found" : "Your library is empty"}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm || categoryFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "You haven't purchased any digital products yet."}
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

        {/* Support Section */}
        {products.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-gray-600">
                    Having trouble downloading or accessing your files? Contact our support team.
                  </p>
                </div>
                <a
                  href="mailto:support@digitalagame.com"
                  className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;