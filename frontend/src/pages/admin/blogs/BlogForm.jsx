import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Eye, 
  Calendar,
  Tag,
  Globe
} from "lucide-react";
import api from "../../../services/api";
import { uploadFile } from "../../../services/cloudinary";
import RichTextEditor from "../../../layouts/RichText";

const categories = [
  "digital-business",
  "web-branding",
  "social-media",
  "ai-for-business",
  "digital-literacy",
  "tech-trends"
];

const statusOptions = [
  { value: "draft", label: "Draft", color: "bg-yellow-100 text-yellow-800" },
  { value: "published", label: "Published", color: "bg-green-100 text-green-800" },
  { value: "scheduled", label: "Scheduled", color: "bg-blue-100 text-blue-800" }
];

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft",
    featured: false,
    featuredImage: "",
    metaTitle: "",
    metaDescription: "",
    tags: "",
    readingTime: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/admin/blogs/${id}`);
      setForm(res.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
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
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setForm(prev => ({ ...prev, slug }));
    }

    // Auto-generate meta title from title
    if (name === "title") {
      setForm(prev => ({ ...prev, metaTitle: value }));
    }
  };

  const handleContentChange = (content) => {
    setForm(prev => ({ ...prev, content }));
  };

  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const url = await uploadFile(file);
      setForm(prev => ({ ...prev, featuredImage: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id) {
        await api.put(`/admin/blogs/${id}`, form);
      } else {
        await api.post("/admin/blogs", form);
      }
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePreviewUrl = () => {
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setPreviewUrl(`/blog/${slug}`);
  };

  if (isLoading && id) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <button
            onClick={() => navigate("/admin/blogs")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {id ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            {id ? "Update your blog post" : "Write and publish a new blog post"}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {form.slug && (
            <a
              href={previewUrl || `/blog/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
              Preview
            </a>
          )}
          <button
            type="submit"
            form="blog-form"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span className="hidden sm:inline">{id ? "Update Blog" : "Publish Blog"}</span>
                <span className="sm:hidden">{id ? "Update" : "Publish"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form id="blog-form" onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title *
              </label>
              <input
                name="title"
                placeholder="Enter blog title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                required
                disabled={isLoading}
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={generatePreviewUrl}
                  className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1 self-end sm:self-auto"
                >
                  <Globe className="w-3 h-3" />
                  Generate URL
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm sm:text-base">/blog/</span>
                <input
                  name="slug"
                  placeholder="url-friendly-slug"
                  value={form.slug}
                  onChange={handleChange}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt
              </label>
              <textarea
                name="excerpt"
                placeholder="Brief summary of your blog post (shown in listings)"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm sm:text-base"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-2">Maximum 160 characters recommended</p>
            </div>

            {/* Content - Replaced with RichTextEditor */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Content *
                </label>
                <span className="text-sm text-gray-500">
                  Rich text editor
                </span>
              </div>
              <RichTextEditor
                value={form.content}
                onChange={handleContentChange}
                placeholder="Start writing your blog post content here..."
              />
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-4 lg:space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
              <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <Upload className="w-4 h-4" />
                Featured Image
              </h3>
              
              {form.featuredImage ? (
                <div className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
                    <img
                      src={form.featuredImage}
                      alt="Featured preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, featuredImage: "" }))}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <label className={`block border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:border-emerald-400 transition-colors ${imageUploading ? 'opacity-50' : ''}`}>
                  {imageUploading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">Click to upload image</span>
                      <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px</p>
                      <input
                        type="file"
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        disabled={imageUploading}
                      />
                    </>
                  )}
                </label>
              )}
            </div>

            {/* Category & Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                  required
                  disabled={isLoading}
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(option => (
                    <label
                      key={option.value}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all flex-1 min-w-[100px] justify-center ${form.status === option.value ? option.color + ' border-current' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={option.value}
                        checked={form.status === option.value}
                        onChange={handleChange}
                        className="hidden"
                        disabled={isLoading}
                      />
                      <span className={`w-2 h-2 rounded-full ${form.status === option.value ? 'bg-current' : 'bg-gray-300'}`}></span>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Additional Settings</h3>
              
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  disabled={isLoading}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Featured Post</p>
                  <p className="text-xs text-gray-500">Show this post in featured section</p>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </div>
                </label>
                <input
                  name="tags"
                  placeholder="comma, separated, tags"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Reading Time (minutes)
                  </div>
                </label>
                <input
                  type="number"
                  name="readingTime"
                  placeholder="5"
                  value={form.readingTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* SEO Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">SEO Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  name="metaTitle"
                  placeholder="Meta title for SEO"
                  value={form.metaTitle}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  placeholder="Meta description for SEO"
                  value={form.metaDescription}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none text-sm sm:text-base"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;