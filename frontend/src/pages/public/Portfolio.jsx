import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Filter, 
  Search, 
  ArrowRight, 
  Eye, 
  Calendar,
  Star,
  ExternalLink,
  TrendingUp,
  Target,
  CheckCircle,
  Zap
} from "lucide-react";
import api from "../../services/api";
import GetServiceModal from "../../components/forms/ServiceModal";

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [featuredProject, setFeaturedProject] = useState(null);

  // Get unique categories from projects
  const categories = ["all", ...new Set(
    projects
      .map(project => project?.category)
      .filter(category => category && typeof category === 'string')
  )];

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterAndSortProjects();
  }, [searchTerm, categoryFilter, sortBy, projects]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/portfolio");
      const projectsData = res.data || [];
      setProjects(projectsData);
      
      // Find featured project
      const featured = projectsData.find(project => project?.featured) || projectsData[0];
      setFeaturedProject(featured);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortProjects = () => {
    let filtered = projects || [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project => {
        const title = project?.title || '';
        const description = project?.description || '';
        const client = project?.client || '';
        const tags = project?.tags || [];
        
        return (
          title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tags.some(tag => tag?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(project => project?.category === categoryFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "featured":
          const aFeatured = a?.featured || false;
          const bFeatured = b?.featured || false;
          return (bFeatured === aFeatured) ? 0 : bFeatured ? 1 : -1;
        case "newest":
          return new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0);
        case "oldest":
          return new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0);
        case "alphabetical":
          return (a?.title || '').localeCompare(b?.title || '');
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  };

  const getCategoryLabel = (category) => {
    if (!category || typeof category !== 'string') return "Project";
    
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getCategoryColor = (category) => {
    if (!category || typeof category !== 'string') return "bg-gray-100 text-gray-700";
    
    const colors = {
      "web-development": "bg-blue-100 text-blue-700 border-blue-200",
      "mobile-app": "bg-purple-100 text-purple-700 border-purple-200",
      "ui-ux": "bg-pink-100 text-pink-700 border-pink-200",
      "branding": "bg-amber-100 text-amber-700 border-amber-200",
      "e-commerce": "bg-emerald-100 text-emerald-700 border-emerald-200",
      "saas": "bg-indigo-100 text-indigo-700 border-indigo-200",
      "ai-solutions": "bg-teal-100 text-teal-700 border-teal-200",
      "digital-marketing": "bg-rose-100 text-rose-700 border-rose-200"
    };
    return colors[category] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const getStats = () => {
    const total = projects.length;
    const featured = projects.filter(project => project?.featured).length;
    const categories = new Set(projects.map(project => project?.category).filter(Boolean)).size;
    
    return { total, featured, categories };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-12"></div>
            
            {/* Featured Project Skeleton */}
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-8 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-xl border p-6 space-y-3">
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-900 to-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 lg:py-15">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
              <span className="text-sm font-medium">Real-World Solutions</span>
            </div>
            
            <h1 className="text-2xl md:text-6xl font-bold mb-6">
              Portfolio & <span className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 bg-clip-text text-transparent">Case Studies</span>
            </h1>
            
            <p className="text-sm md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Real projects. Measurable outcomes. A transparent look at how we solve digital challenges for businesses.
            </p>
            
            {/* Search & Filters */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects by title, client, or technology..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

              
            </div>
          </div>
        </div>
      </div>

    

      {/* Featured Project */}
      {featuredProject && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900">Featured Case Study</h2>
            </div>
            <p className="text-gray-600">An in-depth look at one of our most impactful projects</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Image */}
              <div className="relative h-64 lg:h-full min-h-[400px]">
                {featuredProject.thumbnail ? (
                  <img
                    src={featuredProject.thumbnail}
                    alt={featuredProject.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <Target className="w-16 h-16 text-white/50" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getCategoryColor(featuredProject.category)}`}>
                    {getCategoryLabel(featuredProject.category)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {featuredProject.createdAt ? 
                      new Date(featuredProject.createdAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      }) : 
                      'Recent project'
                    }
                  </div>
                  {featuredProject.client && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>Client: {featuredProject.client}</span>
                    </div>
                  )}
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {featuredProject.title}
                </h2>

                <p className="text-lg text-gray-600 mb-6">
                  {featuredProject.description || "A detailed case study showcasing our approach and results."}
                </p>

                {featuredProject.problem && (
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <h4 className="font-semibold text-gray-900">The Challenge</h4>
                    </div>
                    <p className="text-gray-600 line-clamp-3">{featuredProject.problem}</p>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <Link
                    to={`/portfolio/${featuredProject.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors group"
                  >
                    View Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
            <p className="text-gray-500 mt-1">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map(project => (
              <Link
                key={project._id}
                to={`/portfolio/${project.slug}`}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <Target className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                      {getCategoryLabel(project.category)}
                    </span>
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3">
                      <div className="p-1.5 bg-amber-100 rounded-lg">
                        <Star className="w-3 h-3 text-amber-600 fill-amber-600" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between mb-3">
                    {project.client && (
                      <span className="text-xs font-medium text-gray-500">
                        {project.client}
                      </span>
                    )}
                    {project.createdAt && (
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="w-3 h-3" />
                        {new Date(project.createdAt).getFullYear()}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description || "View case study for project details and results."}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-auto">
                    <div className="text-emerald-600 font-medium text-sm group-hover:text-emerald-700 transition-colors">
                      View Case Study
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        onClick={(e) => e.stopPropagation()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-emerald-600 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || categoryFilter !== "all" 
                ? "Try adjusting your search or filters" 
                : "No portfolio projects available yet"}
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
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-emerald-600 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            See something similar to what you need? Let's discuss how we can achieve similar results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={() => setOpen(true)}
           
              className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start a Project
            </button>

            <Link
              to="/services"
              className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg"
            >
              View Our Services
            </Link>
          </div>
          <GetServiceModal open={open} onClose={() => setOpen(false)} />
        </div>
    </div>
    
   
    </div>
  );
};

export default PortfolioPage;