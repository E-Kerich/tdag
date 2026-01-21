import { useEffect, useState } from "react";
import { 
  Image, 
  Link as LinkIcon, 
  MessageSquare, 
  FileText, 
  Trash2, 
  Eye, 
  Upload, 
  Download,
  ExternalLink,
  FileImage
} from "lucide-react";
import api from "../../services/api";

const ProofManager = ({ portfolioId }) => {
  const [proofs, setProofs] = useState([]);
  const [type, setType] = useState("image");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const proofTypes = [
    { value: "image", label: "Image", icon: Image, color: "text-blue-600 bg-blue-50" },
    { value: "link", label: "Link", icon: LinkIcon, color: "text-green-600 bg-green-50" },
    { value: "testimonial", label: "Testimonial", icon: MessageSquare, color: "text-amber-600 bg-amber-50" },
    { value: "document", label: "Document", icon: FileText, color: "text-purple-600 bg-purple-50" }
  ];

  const fetchProofs = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/admin/proofs/${portfolioId}`);
      setProofs(res.data);
    } catch (error) {
      console.error("Error fetching proofs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (portfolioId) {
      fetchProofs();
    }
  }, [portfolioId]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      // For demo, we'll create a local object URL
      // In production, upload to your backend/cloudinary
      const localUrl = URL.createObjectURL(file);
      
      await api.post("/admin/proofs", {
        portfolio: portfolioId,
        type,
        title: title || file.name,
        url: localUrl,
        description
      });

      resetForm();
      fetchProofs();
    } catch (error) {
      console.error("Error uploading proof:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setUploading(true);
    try {
      await api.post("/admin/proofs", {
        portfolio: portfolioId,
        type,
        title: title || url,
        url,
        description
      });

      resetForm();
      fetchProofs();
    } catch (error) {
      console.error("Error adding proof:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (proofId) => {
    if (window.confirm("Are you sure you want to delete this proof?")) {
      try {
        await api.delete(`/admin/proofs/${proofId}`);
        fetchProofs();
      } catch (error) {
        console.error("Error deleting proof:", error);
      }
    }
  };

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setDescription("");
  };

  const getTypeIcon = (typeValue) => {
    const typeObj = proofTypes.find(t => t.value === typeValue);
    return typeObj ? typeObj.icon : FileImage;
  };

  const getTypeColor = (typeValue) => {
    const typeObj = proofTypes.find(t => t.value === typeValue);
    return typeObj ? typeObj.color : "text-gray-600 bg-gray-50";
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border p-6 mt-8">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
        <div className="h-32 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-6 mt-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Project Proofs</h3>
        <span className="text-sm text-gray-500">
          {proofs.length} {proofs.length === 1 ? 'proof' : 'proofs'}
        </span>
      </div>

      {/* Add Proof Form */}
      <div className="bg-gray-50 rounded-lg p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          {proofTypes.map((typeItem) => {
            const Icon = typeItem.icon;
            return (
              <button
                key={typeItem.value}
                onClick={() => setType(typeItem.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${type === typeItem.value ? typeItem.color + ' border border-current' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{typeItem.label}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                placeholder="Enter proof title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                disabled={uploading}
              />
            </div>

            {type === "link" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL *
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  disabled={uploading}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Brief description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  disabled={uploading}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {type === "image" || type === "document" ? (
              <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-emerald-400 transition-colors ${uploading ? 'opacity-50' : ''}`}>
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm text-gray-600">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Choose file to upload</span>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      accept={type === "image" ? "image/*" : "application/pdf,application/msword,text/plain"}
                      disabled={uploading}
                    />
                  </>
                )}
              </label>
            ) : (
              <button
                onClick={handleLinkSubmit}
                disabled={uploading || !title || (type === "link" && !url)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4" />
                    <span>Add {type === "testimonial" ? "Testimonial" : "Link"}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Proofs List */}
      {proofs.length > 0 ? (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 mb-2">Current Proofs</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {proofs.map(proof => {
              const TypeIcon = getTypeIcon(proof.type);
              const typeColor = getTypeColor(proof.type);
              
              return (
                <div key={proof._id} className="bg-gray-50 border rounded-lg p-4 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${typeColor.split(' ')[0]} ${typeColor.split(' ')[1]?.replace('text-', '')}`}>
                        <TypeIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{proof.title}</p>
                        <p className="text-xs text-gray-500 capitalize">{proof.type}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(proof._id)}
                      className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {proof.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{proof.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(proof.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      {proof.type === "image" ? (
                        <a
                          href={proof.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                          title="View Image"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </a>
                      ) : proof.type === "document" ? (
                        <a
                          href={proof.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                          title="Download Document"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      ) : (
                        <a
                          href={proof.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700"
                          title="Open Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileImage className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">No proofs yet</p>
          <p className="text-sm text-gray-400 mt-1">Add images, links, or testimonials to showcase your work</p>
        </div>
      )}
    </div>
  );
};

export default ProofManager;