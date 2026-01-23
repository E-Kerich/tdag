import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Shield, 
  Download, 
  CheckCircle,
  ChevronRight,
  Star,
  Home,
  FileText,
  Users,
  Zap,
  Plus,
  Minus,
  Loader2
} from "lucide-react";
import api from "../../../services/api";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/products/${slug}`);
      setProduct(res.data);
      
      if (res.data.category) {
        fetchRelatedProducts(res.data.category, res.data._id);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async (category, excludeId) => {
    try {
      const res = await api.get(`/shop?category=${category}`);
      const filtered = res.data.filter(p => p._id !== excludeId).slice(0, 3);
      setRelatedProducts(filtered);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  const buyNow = () => {
    navigate(`/checkout?product=${product._id}`, {
      state: { productIds: [product._id], quantity }
    });
  };

  const formatPrice = (price) => {
    return `KES ${price.toLocaleString()}`;
  };

  const calculateDiscount = () => {
    if (product?.comparePrice) {
      return Math.round((1 - product.price / product.comparePrice) * 100);
    }
    return 0;
  };

  // Render HTML content properly with spacing
  const renderDescription = (content) => {
    if (!content) return null;
    
    return (
      <div 
        className="prose prose-lg max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/shop")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const images = [product.coverImage, ...(product.galleryImages || [])].filter(Boolean);
  const features = product.features || [];
  const discount = calculateDiscount();
  const isBundle = product.type === "bundle";
  const files = product.files || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb - Responsive */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center text-sm text-gray-500 overflow-x-auto">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 hover:text-emerald-600 whitespace-nowrap"
            >
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">Home</span>
            </button>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-2 flex-shrink-0" />
            <button
              onClick={() => navigate("/shop")}
              className="hover:text-emerald-600 whitespace-nowrap"
            >
              Shop
            </button>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-2 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate whitespace-nowrap">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Detail - Responsive grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images Section */}
          <div>
            {/* Main Image */}
            <div className="relative bg-white rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden mb-3 sm:mb-4">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-contain bg-gray-50"
              />
              {product.featured && (
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-amber-500 text-white text-xs sm:text-sm font-medium rounded-full flex items-center gap-1">
                    <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-white" />
                    <span className="hidden sm:inline">Featured</span>
                  </span>
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  <span className="px-2 py-1 sm:px-3 sm:py-1.5 bg-red-500 text-white text-xs sm:text-sm font-medium rounded-full">
                    Save {discount}%
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-4 gap-2 sm:gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-emerald-500' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Files */}
            {files.length > 0 && (
              <div className="mt-3 sm:mt-4">
                <p className="text-sm text-gray-600 mb-1 sm:mb-2">Included files:</p>
                <div className="grid grid-cols-4 sm:grid-cols-4 gap-1 sm:gap-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center"
                    >
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Category & Title */}
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-emerald-100 text-emerald-700 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                  {product.category}
                </span>
                {isBundle && (
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-blue-100 text-blue-700 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                    Bundle
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-amber-400 fill-amber-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                )}
                {product.soldCount && (
                  <span className="text-xs sm:text-sm text-gray-500">
                    {product.soldCount}+ sold
                  </span>
                )}
              </div>
            </div>

            {/* Short Description */}
            {product.shortDescription && (
              <div className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {product.shortDescription}
              </div>
            )}

            {/* Bundle Items */}
            {isBundle && product.bundleItems?.length > 0 && (
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-100 rounded-xl p-4 sm:p-5">
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span className="text-sm sm:text-base">What's Included in This Bundle</span>
                </h3>
                <div className="space-y-1 sm:space-y-2">
                  {product.bundleItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 bg-white/50 rounded-lg">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-700 truncate">{item.title}</span>
                      <span className="text-xs sm:text-sm text-gray-500 ml-auto flex-shrink-0">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {features.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">What's Included</h3>
                <ul className="space-y-1 sm:space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price & Actions */}
            <div className="space-y-4 sm:space-y-6 border-t border-gray-200 pt-4 sm:pt-6">
              <div>
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && (
                    <span className="text-base sm:text-lg text-gray-500 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                  {product.comparePrice && (
                    <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-red-100 text-red-700 text-xs sm:text-sm font-medium rounded">
                      Save {discount}%
                    </span>
                  )}
                </div>
                {product.priceDescription && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{product.priceDescription}</p>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 sm:px-4 sm:py-3 text-gray-500 hover:text-gray-700"
                  >
                    <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <span className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-900 min-w-[40px] sm:min-w-[60px] text-center text-sm sm:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-2 sm:px-4 sm:py-3 text-gray-500 hover:text-gray-700"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {product.stock !== undefined && (
                    <span className={product.stock < 10 ? 'text-amber-600' : 'text-green-600'}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={buyNow}
                  className="w-full flex items-center justify-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-emerald-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-emerald-700 transition-all hover:shadow-lg text-sm sm:text-base"
                >
                  <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                  Proceed to pay {formatPrice(product.price * quantity)}
                </button>

                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                    <span className="truncate">Instant Access</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                    <span className="truncate">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                    <span className="truncate">Support Included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs - Responsive */}
        <div className="mt-8 sm:mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
              {['description', 'features', 'support'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 sm:py-4 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-4 sm:py-8">
            {activeTab === "description" && (
              <div className="text-gray-700">
                {renderDescription(product.fullDescription || product.description)}
              </div>
            )}

            {activeTab === "features" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "support" && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">What's Included</h4>
                    <ul className="space-y-1 sm:space-y-2 text-blue-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Lifetime access to files</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Free future updates</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Email support for 30 days</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2 sm:mb-3 text-sm sm:text-base">Need Help?</h4>
                    <p className="text-blue-800 mb-3 sm:mb-4 text-xs sm:text-sm">
                      Contact our support team for assistance with setup or technical questions.
                    </p>
                    <a
                      href="mailto:support@thedigitalagame.or"
                      className="inline-flex items-center gap-1 sm:gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Contact Support <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products - Responsive */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 sm:mt-16 pt-8 sm:pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4 sm:mb-8">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">You May Also Like</h2>
              <button
                onClick={() => navigate("/shop")}
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1 text-sm sm:text-base"
              >
                View all <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedProducts.map(relatedProduct => (
                <button
                  key={relatedProduct._id}
                  onClick={() => navigate(`/shop/${relatedProduct.slug}`)}
                  className="group bg-white rounded-xl border border-gray-200 hover:border-emerald-200 hover:shadow-xl transition-all p-4 sm:p-5 text-left"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {relatedProduct.coverImage ? (
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={relatedProduct.coverImage}
                          alt={relatedProduct.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors truncate text-sm sm:text-base">
                        {relatedProduct.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                        {relatedProduct.shortDescription || relatedProduct.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm sm:text-base">
                          {formatPrice(relatedProduct.price)}
                        </span>
                        <span className="text-emerald-600 text-xs sm:text-sm font-medium group-hover:text-emerald-700 transition-colors">
                          View <ChevronRight className="inline w-2 h-2 sm:w-3 sm:h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;