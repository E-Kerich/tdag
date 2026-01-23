import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle, 
  Shield, 
  Download, 
  Clock,
  ShoppingBag,
  Star,
  Truck,
  FileText,
  Tag,
  ChevronRight,
  Home
} from "lucide-react";
import api from "../../../services/api";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/products/${slug}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buyNow = () => {
    navigate("/checkout", {
      state: { productIds: [product._id] }
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-6"></div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-96 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded w-32 mt-8"></div>
              <div className="h-12 bg-gray-200 rounded w-full mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/shop")}
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const images = [product.coverImage, ...(product.galleryImages || [])].filter(Boolean);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <button
            onClick={() => navigate("/shop")}
            className="flex items-center gap-1 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">{product.category}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden mb-4">
              {images[selectedImage] ? (
                <img
                  src={images[selectedImage]}
                  alt={product.title}
                  className="w-full h-[400px] object-contain"
                />
              ) : (
                <div className="w-full h-[400px] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <ShoppingBag className="w-24 h-24 text-white/50" />
                </div>
              )}
              {product.featured && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-amber-500 text-white text-sm font-medium rounded-full">
                    Featured
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
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
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  {product.category}
                </span>
                {product.type && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    {product.type}
                  </span>
                )}
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price & Actions */}
            <div className="space-y-6 border-t pt-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    KES {product.price.toLocaleString()}
                  </span>
                  {product.comparePrice && (
                    <span className="text-lg text-gray-500 line-through">
                      KES {product.comparePrice.toLocaleString()}
                    </span>
                  )}
                  {product.comparePrice && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded">
                      Save {Math.round((1 - product.price / product.comparePrice) * 100)}%
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={buyNow}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Buy Now - KES {product.price.toLocaleString()}
                </button>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Download className="w-4 h-4 text-emerald-500" />
                    <span>Instant Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-emerald-500" />
                    <span>Email Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Digital Delivery</p>
                  <p className="text-sm text-gray-600">
                    This is a digital product. You'll receive access immediately after purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products could go here */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {product.relatedProducts.map(relatedProduct => (
                <div key={relatedProduct._id} className="border rounded-xl p-4 hover:shadow-lg transition-shadow">
                  <img 
                    src={relatedProduct.coverImage} 
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.title}</h3>
                  <p className="text-emerald-600 font-medium">KES {relatedProduct.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;