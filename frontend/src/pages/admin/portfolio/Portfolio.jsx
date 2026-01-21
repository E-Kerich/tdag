import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  ExternalLink,
  Filter,
  Search,
  Calendar,
  Star,
  Image as ImageIcon,
  TrendingUp
} from "lucide-react";
import api from "../../../services/api";

const Portfolio = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");

  // Get unique categories from items, safely handling undefined/null
  const categories = ["all", ...new Set(
    items
      .map(item => item?.category)
      .filter(category => category && typeof category === 'string')
  )];
  
  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title", label: "Title A-Z" },
    { value: "featured", label: "Featured First" }
  ];

  const fetchPortfolio = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/portfolio");
      setItems(res.data || []);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  useEffect(() => {
    filterAndSortItems();
  }, [searchTerm, categoryFilter, featuredFilter, sortBy, items]);

  const filterAndSortItems = () => {
    let filtered = items || [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item => {
        const title = item?.title || '';
        const description = item?.description || '';
        const client = item?.client || '';
        
        return (
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(item => item?.category === categoryFilter);
    }

    // Apply featured filter
    if (featuredFilter === "featured") {
      filtered = filtered.filter(item => item?.featured);
    } else if (featuredFilter === "not-featured") {
      filtered = filtered.filter(item => !item?.featured);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
        case "oldest":
          return new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0);
        case "title":
          return (a?.title || '').localeCompare(b?.title || '');
        case "featured":
          const aFeatured = a?.featured || false;
          const bFeatured = b?.featured || false;
          return (bFeatured === aFeatured) ? 0 : bFeatured ? 1 : -1;
        default:
          return 0;
      }
    });

    setFilteredItems(filtered);
  };

  const getCategoryLabel = (category) => {
    if (!category || typeof category !== 'string') return "Uncategorized";
    
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCategoryColor = (category) => {
    if (!category || typeof category !== 'string') return "bg-gray-100 text-gray-700";
    
    const colors = {
      "web-development": "bg-blue-100 text-blue-700",
      "mobile-app": "bg-purple-100 text-purple-700",
      "ui-ux": "bg-pink-100 text-pink-700",
      "branding": "bg-amber-100 text-amber-700",
      "e-commerce": "bg-emerald-100 text-emerald-700",
      "saas": "bg-indigo-100 text-indigo-700"
    };
    return colors[category] || "bg-gray-100 text-gray-700";
  };

  const remove = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      await api.delete(`/admin/portfolio/${id}`);
      fetchPortfolio();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  const getSafeValue = (value, defaultValue = '') => {
    return value || defaultValue;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="h-64 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Portfolio Projects</h2>
          <p className="text-gray-500 mt-1">Manage your portfolio projects and case studies</p>
        </div>
        <Link
          to="/admin/portfolio/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <ImageIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Projects</p>
              <p className="text-2xl font-bold">{items.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Star className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Featured Projects</p>
              <p className="text-2xl font-bold">
                {items.filter(item => item?.featured).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Categories</p>
              <p className="text-2xl font-bold">
                {new Set(items.map(item => item?.category).filter(Boolean)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by title, client, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories
                .filter(cat => cat !== "all" && cat)
                .map(category => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
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

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredItems.map(item => (
                  <tr key={item?._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          {item?.thumbnail ? (
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={item.thumbnail}
                                alt={item?.title || 'Project'}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">{getSafeValue(item?.title, 'Untitled Project')}</p>
                            {item?.featured && (
                              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          {item?.client && (
                            <p className="text-sm text-gray-500">Client: {item.client}</p>
                          )}
                          {item?.description && (
                            <p className="text-sm text-gray-600 truncate max-w-[300px]">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item?.category)}`}>
                        {getCategoryLabel(item?.category)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          item?.featured 
                            ? 'bg-amber-100 text-amber-800 border border-amber-200' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {item?.featured ? 'Featured' : 'Standard'}
                        </span>
                        {item?.liveUrl && (
                          <a 
                            href={item.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {item?.createdAt ? 
                          new Date(item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          }) : 
                          'No date'
                        }
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {item?.liveUrl && (
                          <a
                            href={item.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Live"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          to={`/admin/portfolio/edit/${item?._id}`}
                          className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => remove(item?._id, item?.title)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-gray-400">
              <ImageIcon className="w-12 h-12 mx-auto mb-3" />
              <p className="text-lg font-medium">No projects found</p>
              <p className="text-sm mt-1">
                {items.length === 0 ? "No projects added yet" : "Try adjusting your filters"}
              </p>
              {items.length === 0 && (
                <Link
                  to="/admin/portfolio/new"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Project
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Pagination */}
        {filteredItems.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredItems.length}</span> of{" "}
              <span className="font-medium">{items.length}</span> projects
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-emerald-50 text-emerald-700 border-emerald-200">
                1
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;