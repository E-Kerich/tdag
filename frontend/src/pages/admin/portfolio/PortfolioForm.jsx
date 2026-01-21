import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Upload, 
  Eye, 
  Link as LinkIcon,
  Target,
  CheckCircle,
  Users,
  Globe,
  Image as ImageIcon
} from "lucide-react";
import api from "../../../services/api";

const categories = [
  { value: "web-development", label: "Web Development" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "branding", label: "Branding" },
  { value: "e-commerce", label: "E-commerce" },
  { value: "saas", label: "SaaS Platform" },
  { value: "ai-solutions", label: "AI Solutions" },
  { value: "digital-marketing", label: "Digital Marketing" }
];

const PortfolioForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    client: "",
    category: "web-development",
    problem: "",
    solution: "",
    outcome: "",
    liveUrl: "",
    description: "",
    thumbnail: "",
    featured: false,
    tags: ""
  });

  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const uploadThumbnail = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploading(true);
  
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const res = await api.post("/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
  
      setForm(prev => ({ ...prev, thumbnail: res.data.url }));
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        thumbnail: "Image upload failed"
      }));
    } finally {
      setUploading(false);
    }
  };
  

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.thumbnail) newErrors.thumbnail = "Thumbnail image is required";
    if (!form.problem.trim()) newErrors.problem = "Problem description is required";
    if (!form.solution.trim()) newErrors.solution = "Solution description is required";
    if (!form.outcome.trim()) newErrors.outcome = "Outcome description is required";
    
    if (form.liveUrl && !isValidUrl(form.liveUrl)) {
      newErrors.liveUrl = "Please enter a valid URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.focus();
      }
      return;
    }

    if (uploading) {
      alert("Please wait for image upload to finish");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...form,
        tags: form.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
      };

      await api.post("/admin/portfolio", payload);
      
      // Success message
      alert("Portfolio project saved successfully!");
      
      // Navigate back to portfolio list
      navigate("/admin/portfolio");
      
    } catch (err) {
      console.error("Submission error:", err);
      const errorMessage = err.response?.data?.message || "Failed to save project. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => navigate("/admin/portfolio")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Add Portfolio Project</h2>
          <p className="text-gray-500 mt-1">Create a new case study to showcase your work</p>
        </div>

        <button
          type="submit"
          form="portfolio-form"
          disabled={uploading || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Project
            </>
          )}
        </button>
      </div>

      <form id="portfolio-form" onSubmit={submit} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title *
                </label>
                <input
                  id="title"
                  name="title"
                  placeholder="Enter project title"
                  value={form.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Description
                </label>
                <textarea
                  name="description"
                  placeholder="Brief project description (shown in listings)"
                  value={form.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Client
                    </div>
                  </label>
                  <input
                    name="client"
                    placeholder="Client name (optional)"
                    value={form.client}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    disabled={isSubmitting}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Case Study */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Case Study Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    The Challenge / Problem *
                  </div>
                </label>
                <textarea
                  id="problem"
                  name="problem"
                  placeholder="What problem were you solving? What challenges did the client face?"
                  value={form.problem}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.problem ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                  disabled={isSubmitting}
                />
                {errors.problem && (
                  <p className="mt-1 text-sm text-red-600">{errors.problem}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Our Solution / Approach *
                  </div>
                </label>
                <textarea
                  id="solution"
                  name="solution"
                  placeholder="How did you approach the problem? What solutions did you implement?"
                  value={form.solution}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.solution ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                  disabled={isSubmitting}
                />
                {errors.solution && (
                  <p className="mt-1 text-sm text-red-600">{errors.solution}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Results / Outcome *
                </label>
                <textarea
                  id="outcome"
                  name="outcome"
                  placeholder="What were the results? Include metrics, improvements, or client feedback if available."
                  value={form.outcome}
                  onChange={handleChange}
                  rows={2}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.outcome ? 'border-red-300' : 'border-gray-300'
                  }`}
                  required
                  disabled={isSubmitting}
                />
                {errors.outcome && (
                  <p className="mt-1 text-sm text-red-600">{errors.outcome}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Thumbnail */}
            <div className="bg-white rounded-xl border  border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 text-lg mb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Project Thumbnail *
                </div>
              </h3>
              
              {form.thumbnail ? (
                <div className="space-y-3">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
                    <img
                      src={form.thumbnail}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, thumbnail: "" }))}
                    className="text-sm text-red-600 hover:text-red-700"
                    disabled={uploading}
                  >
                    Remove image
                  </button>
                </div>
              ) : (
                <label className={`block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-emerald-400 transition-colors ${uploading ? 'opacity-50' : ''}`}>
                  {uploading ? (
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mb-2"></div>
                      <span className="text-sm text-gray-600">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-sm text-gray-600">Click to upload thumbnail</span>
                      <p className="text-xs text-gray-500 mt-1">Recommended: 1200x630px • Max 5MB</p>
                      <input
                        id="thumbnail"
                        type="file"
                        onChange={uploadThumbnail}
                        accept="image/*"
                        className="hidden"
                        disabled={uploading}
                      />
                    </>
                  )}
                </label>
              )}
              {errors.thumbnail && (
                <p className="mt-2 text-sm text-red-600">{errors.thumbnail}</p>
              )}
            </div>

            {/* Links */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Project Links</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Live URL
                  </div>
                </label>
                <input
                  name="liveUrl"
                  placeholder="https://example.com"
                  value={form.liveUrl}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                    errors.liveUrl ? 'border-red-300' : 'border-gray-300'
                  }`}
                  disabled={isSubmitting}
                />
                {errors.liveUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.liveUrl}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Link to live project (optional)</p>
              </div>
            </div>

            {/* Additional Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Additional Settings</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  name="tags"
                  placeholder="react, nodejs, mongodb, etc. (comma separated)"
                  value={form.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-500 mt-1">Add tags for better categorization</p>
              </div>

              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  disabled={isSubmitting}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">Featured Project</p>
                  <p className="text-xs text-gray-500">Show this project in featured section</p>
                </div>
              </label>
            </div>

            {/* Form Tips */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h4 className="font-semibold text-blue-900 mb-3">Tips for Success</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-blue-800">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Use clear, high-quality thumbnail images</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-blue-800">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Include specific metrics in outcomes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-blue-800">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Add relevant tags for better discoverability</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PortfolioForm;