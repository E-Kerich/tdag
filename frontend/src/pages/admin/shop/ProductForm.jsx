import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  Upload, 
  Save, 
  ArrowLeft, 
  X, 
  FileText,
  Package,
  DollarSign,
  Tag,
  Eye,
  FileImage,
  Plus,
  Download
} from "lucide-react";
import api from "../../../services/api";

const categories = [
  { value: "tool", label: "Digital Tool" },
  { value: "guide", label: "Guide / Ebook" },
  { value: "template", label: "Template" },
  { value: "course", label: "Course" },
  { value: "bundle", label: "Bundle" },
  { value: "resource", label: "Resource Pack" }
];

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "tool",
    price: "",
    comparePrice: "",
    coverImage: "",
    files: [],
    active: true,
    featured: false,
    sku: "",
    tags: ""
  });

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/admin/products/${id}`);
      const product = res.data;
      setForm({
        ...product,
        tags: product.tags?.join(", ") || "",
        comparePrice: product.comparePrice || ""
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Auto-generate slug from title
    if (name === "title" && !id) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, '');
      setForm(prev => ({ ...prev, slug }));
    }
  };

  const uploadCover = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      // In production, replace with actual upload function
      const url = URL.createObjectURL(file);
      setForm(prev => ({ ...prev, coverImage: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploadingImage(false);
    }
  };

  const uploadProductFile = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingFile(true);
    try {
      const url = URL.createObjectURL(file);
      setForm(prev => ({
        ...prev,
        files: [
          ...prev.files, 
          { 
            name: file.name, 
            url, 
            size: file.size, 
            type: file.type,
            id: Date.now().toString()
          }
        ]
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploadingFile(false);
    }
  };

  const removeFile = (fileId) => {
    setForm(prev => ({
      ...prev,
      files: prev.files.filter(file => file.id !== fileId)
    }));
  };

  const save = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
        tags: form.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };

      if (id) {
        await api.put(`/admin/products/${id}`, payload);
      } else {
        await api.post("/admin/products", payload);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading && id) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {id ? "Edit Product" : "Create New Product"}
          </h2>
          <p className="text-gray-500 mt-1">
            {id ? "Update your digital product" : "Add a new digital product to your store"}
          </p>
        </div>

        <button
          type="submit"
          form="product-form"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {id ? "Update Product" : "Create Product"}
            </>
          )}
        </button>
      </div>

      <form id="product-form" onSubmit={save} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Product Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  name="title"
                  placeholder="Enter product title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug *
                </label>
                <input
                  name="slug"
                  placeholder="product-url-slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  placeholder="Brief description shown in product listings"
                  value={form.shortDescription}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description *
                </label>
                <textarea
                  name="description"
                  placeholder="Detailed product description"
                  value={form.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Pricing & Category</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Category
                    </div>
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      SKU (Optional)
                    </div>
                  </label>
                  <input
                    name="sku"
                    placeholder="e.g., DIGITAL-001"
                    value={form.sku}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (KES) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare Price (KES)
                  </label>
                  <input
                    type="number"
                    name="comparePrice"
                    placeholder="0.00"
                    value={form.comparePrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Shows original price crossed out
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  name="tags"
                  placeholder="digital, tool, productivity, software"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Cover Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Cover Image</h3>
              
              {form.coverImage ? (
                <div className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
                    <img
                      src={form.coverImage}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, coverImage: "" }))}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow hover:bg-gray-50"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500">Click the image to replace it</p>
                </div>
              ) : (
                <label className={`block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-400 transition-colors ${uploadingImage ? 'opacity-50' : ''}`}>
                  {uploadingImage ? (
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <FileImage className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">Upload cover image</span>
                      <p className="text-xs text-gray-500 mt-1">Recommended: 800x800px</p>
                      <input
                        type="file"
                        onChange={uploadCover}
                        accept="image/*"
                        className="hidden"
                      />
                    </>
                  )}
                </label>
              )}
            </div>

            {/* Product Files */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-lg">Product Files</h3>
                <span className="text-sm text-gray-500">
                  {form.files.length} file{form.files.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {form.files.length > 0 && (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {form.files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="p-1 hover:bg-gray-200 rounded flex-shrink-0"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <label className={`block border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-emerald-400 transition-colors ${uploadingFile ? 'opacity-50' : ''}`}>
                {uploadingFile ? (
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <span className="text-sm text-gray-600">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                    <span className="text-sm text-gray-600">Upload digital file</span>
                    <p className="text-xs text-gray-500 mt-1">PDF, ZIP, DOCX, etc.</p>
                    <input
                      type="file"
                      onChange={uploadProductFile}
                      className="hidden"
                      multiple
                    />
                  </>
                )}
              </label>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Settings</h3>
              
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Active Product</p>
                  <p className="text-xs text-gray-500">Show this product in the store</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Featured Product</p>
                  <p className="text-xs text-gray-500">Highlight on homepage</p>
                </div>
              </label>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Preview</h4>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>URL:</strong> /shop/{form.slug || 'product-slug'}</p>
                  <p><strong>Price:</strong> KES {form.price || '0.00'}</p>
                  {form.comparePrice && (
                    <p><strong>Original:</strong> KES {form.comparePrice}</p>
                  )}
                  <p><strong>Category:</strong> {
                    categories.find(c => c.value === form.category)?.label || 'Tool'
                  }</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;