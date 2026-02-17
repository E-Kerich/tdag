import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  DollarSign, 
  Target, 
  Clock,
  CheckCircle,
  Send,
  XCircle,
  Calendar,
  User,
  FileText,
  Building,
  Briefcase,
  Code,
  MapPin
} from "lucide-react";
import api from "../../../services/api";

const DiscoveryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchEntry();
  }, [id]);

  const fetchEntry = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/admin/web-discovery/${id}`);
      setEntry(res.data);
    } catch (error) {
      console.error("Error fetching entry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (status) => {
    setUpdating(true);
    try {
      const res = await api.put(`/admin/web-discovery/${id}`, { status });
      setEntry(res.data);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-emerald-600";
    if (score >= 5) return "text-amber-600";
    return "text-gray-600";
  };

  const getScoreBg = (score) => {
    if (score >= 8) return "bg-emerald-50";
    if (score >= 5) return "bg-amber-50";
    return "bg-gray-50";
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-50 text-blue-700 border-blue-200",
      contacted: "bg-purple-50 text-purple-700 border-purple-200",
      qualified: "bg-emerald-50 text-emerald-700 border-emerald-200",
      proposal: "bg-amber-50 text-amber-700 border-amber-200",
      closed: "bg-gray-50 text-gray-700 border-gray-200"
    };
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const formatBudget = (budget) => {
    const budgets = {
      "under-50k": "Under 50K",
      "50k-150k": "50K – 150K",
      "150k-400k": "150K – 400K",
      "400k-plus": "400K+"
    };
    return budgets[budget] || budget;
  };

  const formatTimeline = (timeline) => {
    const timelines = {
      "urgent": "Under 1 Month",
      "1-2months": "1–2 Months",
      "flexible": "Flexible"
    };
    return timelines[timeline] || timeline;
  };

  const formatOrganizationType = (type) => {
    const types = {
      "individual": "Individual",
      "startup": "Startup",
      "small-business": "Small Business",
      "sme": "SME",
      "corporate": "Corporate",
      "ngo": "NGO",
      "institution": "Institution"
    };
    return types[type] || type;
  };

  const formatWebsiteType = (type) => {
    const types = {
      "company": "Company Website",
      "ecommerce": "E-commerce",
      "portfolio": "Portfolio",
      "webapp": "Web Application",
      "saas": "SaaS",
      "educational": "Educational Platform",
      "redesign": "Redesign"
    };
    return types[type] || type;
  };

  const formatReadiness = (value) => {
    const values = {
      "yes": "Yes",
      "no": "No",
      "unsure": "Not sure",
      "ready": "Fully ready",
      "partial": "Partially ready",
      "not-started": "Not started"
    };
    return values[value] || value;
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="bg-white rounded-xl p-6 border border-gray-50 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!entry) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/web-discovery")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Discovery Leads
        </button>
        
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
          <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(entry.status)}`}>
            {entry.status}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - All Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Card */}
          <div className="bg-white rounded-xl border border-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-400" />
              Contact Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <span className="text-emerald-600 font-semibold">
                    {entry.name?.charAt(0) || '?'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{entry.name}</p>
                  <a href={`mailto:${entry.email}`} className="text-sm text-emerald-600 hover:text-emerald-700">
                    {entry.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Website Type</p>
                  <p className="font-medium">{formatWebsiteType(entry.websiteType)}</p>
                </div>
                <div className="p-3 border border-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Budget Range</p>
                  <p className="font-medium">{formatBudget(entry.budget)}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border  border-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Lead Score</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>
                      {entry.score}
                    </span>
                    <span className="text-sm text-gray-400">/10</span>
                  </div>
                </div>
                <div className="p-3 border border-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Submitted</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">
                      {new Date(entry.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Organization Details */}
          {(entry.organizationType || entry.industry) && (
            <div className="bg-white rounded-xl border border-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-gray-400" />
                Organization Details
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {entry.organizationType && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Organization Type</p>
                    <p className="font-medium">{formatOrganizationType(entry.organizationType)}</p>
                  </div>
                )}
                {entry.industry && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Industry</p>
                    <p className="font-medium capitalize">{entry.industry}</p>
                  </div>
                )}
                {entry.location && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Location</p>
                    <p className="font-medium">{entry.location}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Project Details */}
          <div className="bg-white rounded-xl border border-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-400" />
              Project Details
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Project Type</p>
                  <p className="font-medium capitalize">{entry.projectType || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Timeline</p>
                  <p className="font-medium">{formatTimeline(entry.timeline)}</p>
                </div>
              </div>

              {entry.challenges && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Challenges</p>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                    {entry.challenges}
                  </p>
                </div>
              )}

              {entry.expectations && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Expectations</p>
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                    {entry.expectations}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Technical Readiness */}
          {(entry.domain || entry.hosting || entry.contentReady || entry.assetsReady) && (
            <div className="bg-white rounded-xl border border-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-gray-400" />
                Technical Readiness
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {entry.domain && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Domain</p>
                    <p className="font-medium">{formatReadiness(entry.domain)}</p>
                  </div>
                )}
                {entry.hosting && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Hosting</p>
                    <p className="font-medium">{formatReadiness(entry.hosting)}</p>
                  </div>
                )}
                {entry.contentReady && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Content Readiness</p>
                    <p className="font-medium">{formatReadiness(entry.contentReady)}</p>
                  </div>
                )}
                {entry.assetsReady && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Assets Ready</p>
                    <p className="font-medium">{formatReadiness(entry.assetsReady)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Actions & Score */}
        <div className="space-y-6">
          {/* Status Actions */}
          <div className="bg-white rounded-xl border border-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => updateStatus("qualified")}
                disabled={updating || entry.status === "qualified"}
                className="w-full flex items-center justify-between p-3 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Mark Qualified</span>
                </div>
                {entry.status === "qualified" && (
                  <span className="text-xs bg-emerald-200 px-2 py-1 rounded-full">Current</span>
                )}
              </button>

              <button
                onClick={() => updateStatus("proposal")}
                disabled={updating || entry.status === "proposal"}
                className="w-full flex items-center justify-between p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <Send className="w-5 h-5" />
                  <span className="font-medium">Proposal Sent</span>
                </div>
                {entry.status === "proposal" && (
                  <span className="text-xs bg-amber-200 px-2 py-1 rounded-full">Current</span>
                )}
              </button>

              <button
                onClick={() => updateStatus("closed")}
                disabled={updating || entry.status === "closed"}
                className="w-full flex items-center justify-between p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5" />
                  <span className="font-medium">Close Lead</span>
                </div>
                {entry.status === "closed" && (
                  <span className="text-xs bg-gray-300 px-2 py-1 rounded-full">Current</span>
                )}
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-50 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <a
                href={`mailto:${entry.email}`}
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-400" />
                <span>Send Email</span>
              </a>

              <button
                onClick={() => window.print()}
                className="w-full flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <FileText className="w-5 h-5 text-gray-400" />
                <span>Export Details</span>
              </button>
            </div>
          </div>

          {/* Score Indicator */}
          {entry.score !== undefined && (
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-700">Lead Score</h4>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getScoreBg(entry.score)} mb-3`}>
                  <span className={`text-3xl font-bold ${getScoreColor(entry.score)}`}>
                    {entry.score}
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {entry.score >= 8 ? "High potential lead" :
                   entry.score >= 5 ? "Medium potential" :
                   "Low potential"}
                </p>
              </div>
            </div>
          )}

          {/* Submission Summary */}
          <div className="bg-gray-50 rounded-xl border border-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Submission ID</h4>
            <p className="text-xs text-gray-500 break-all">{entry._id}</p>
            <p className="text-xs text-gray-400 mt-2">
              Last updated: {new Date(entry.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryDetail;