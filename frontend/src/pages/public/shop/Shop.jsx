import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Star, 
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Shield,
  Clock,
  ArrowRight,
  Tag
} from "lucide-react";
import api from "../../../services/api";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isLoading, setIsLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "digital-tools", label: "Digital Tools", icon: Sparkles },
    { value: "ai-tools", label: "AI Tools", icon: TrendingUp },
    { value: "resource-pack", label: "Resource Pack", icon: ShoppingBag },
    { value: "template", label: "Templates", icon: Tag },
    { value: "course", label: "Courses", icon: Shield },
    { value: "ebook", label: "E-books", icon: Clock }
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "popular", label: "Most Popular" }
  ];

  useEffect(() => {
    fetchProducts();
  }, []);


  const bannerImageUrl = "https://res.cloudinary.com/dz5crqyh2/image/upload/v1769153917/ChatGPT_Image_Jan_23_2026_10_38_15_AM_p0vlax.png";

  useEffect(() => {
    filterAndSortProducts();
  }, [searchTerm, categoryFilter, sortBy, products]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/shop");
      const productsData = res.data;
      setProducts(productsData);
      
      // Find featured products
      const featured = productsData.filter(p => p.featured).slice(0, 3);
      setFeaturedProducts(featured);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredProducts(filtered);
  };

  const getCategoryColor = (category) => {
    const colors = {
      "digital-tools": "bg-blue-100 text-blue-700",
      "ai-tools": "bg-emerald-100 text-emerald-700",
      "business-systems": "bg-purple-100 text-purple-700",
      "digital-literacy": "bg-amber-100 text-amber-700",
      "templates": "bg-pink-100 text-pink-700",
      "ebooks": "bg-indigo-100 text-indigo-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            {/* Hero Skeleton */}
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full max-w-2xl mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 max-w-xl"></div>

            {/* Categories Skeleton */}
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
              ))}
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
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
      {/* Hero Section - Search Only */}
      <div 
        className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${bannerImageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Clickable Overlay */}
        <Link 
          to="#all-products" 
          className="absolute inset-0 z-10 cursor-pointer group"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('all-products')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Supercharge Your Digital Toolkit
              </h1>
            
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 text-white font-medium group-hover:bg-white/30 transition-all duration-300">
                <span>Explore All Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        {/* Search Bar (Positioned above clickable area) */}
        <div className="relative z-20 w-full max-w-2xl px-4 mt-80">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search digital tools, templates, e-books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="lg:sticky lg:top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 py-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.value}
                    onClick={() => setCategoryFilter(category.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${categoryFilter === category.value 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 hidden sm:block">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Tools</h2>
              <p className="text-gray-500 mt-1">Handpicked for maximum impact</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium text-gray-700">Editor's Choice</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/shop/${product.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {product.coverImage ? (
                    <img
                      src={product.coverImage}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                  {product.comparePrice && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                        Save {Math.round((1 - product.price / product.comparePrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                      {categories.find(c => c.value === product.category)?.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {product.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.shortDescription || product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        KES {product.price.toLocaleString()}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-gray-500 line-through">
                          KES {product.comparePrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-emerald-600 font-medium group-hover:text-emerald-700 transition-colors">
                      View Details <ArrowRight className="inline w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* All Products */}
      <div id="all-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Digital Products</h2>
            <p className="text-gray-500 mt-1">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => {
              const CategoryIcon = categories.find(c => c.value === product.category)?.icon || Sparkles;
              return (
                <Link
                  key={product._id}
                  to={`/shop/${product.slug}`}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {product.coverImage ? (
                      <img
                        src={product.coverImage}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <CategoryIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    
                    {product.featured && (
                      <div className="absolute top-3 left-3">
                        <div className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 fill-white" />
                          Featured
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                        {categories.find(c => c.value === product.category)?.label}
                    </span>
                      {product.stock !== undefined && product.stock < 10 && product.stock > 0 && (
                        <span className="text-xs font-medium text-amber-600">
                          Only {product.stock} left
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.shortDescription || product.description}
                    </p>

                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold text-gray-900">
                            KES {product.price.toLocaleString()}
                          </span>
                          {product.comparePrice && (
                            <span className="text-sm text-gray-500 line-through">
                              KES {product.comparePrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {product.type === "bundle" && (
                          <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            Bundle
                          </span>
                        )}
                      </div>
                      
                      <button className="w-full py-2.5 bg-emerald-50 text-emerald-700 font-medium rounded-lg hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || categoryFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "No products available yet"}
            </p>
            {(searchTerm || categoryFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
                className="px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-t border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Secure Purchase</h4>
              <p className="text-sm text-gray-600">Encrypted payments & instant delivery</p>
            </div>
            <div>
              <Sparkles className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Quality Guaranteed</h4>
              <p className="text-sm text-gray-600">Professionally designed & tested tools</p>
            </div>
            <div>
              <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-1">Lifetime Updates</h4>
              <p className="text-sm text-gray-600">Free updates for future improvements</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;