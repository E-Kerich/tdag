import { useEffect, useState } from "react";
import { 
  Search, 
  Filter, 
  Eye, 
  Calendar, 
  Users, 
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Download,
  ChevronDown
} from "lucide-react";
import api from "../../../services/api";

const AIDiscoveryAdmin = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timelineFilter, setTimelineFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "scheduled", label: "Scheduled", color: "bg-blue-100 text-blue-800" },
    { value: "completed", label: "Completed", color: "bg-green-100 text-green-800" },
    { value: "cancelled", label: "Cancelled", color: "bg-red-100 text-red-800" }
  ];

  const timelineOptions = [
    { value: "all", label: "All Timelines" },
    { value: "explore", label: "Explore Only" },
    { value: "implement", label: "Ready to Implement" },
    { value: "unsure", label: "Unsure" }
  ];

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [searchTerm, statusFilter, timelineFilter, requests]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/ai-discovery");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterRequests = () => {
    let filtered = requests;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.nameAndRole?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    // Apply timeline filter
    if (timelineFilter !== "all") {
      filtered = filtered.filter(request => request.timeline === timelineFilter);
    }

    setFilteredRequests(filtered);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/ai-discovery/${id}`, { status });
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const viewDetails = (request) => {
    setSelectedRequest(request);
    setIsDetailOpen(true);
  };

  const exportToCSV = () => {
    // Basic CSV export implementation
    const headers = ["Business", "Contact", "Industry", "Size", "Timeline", "Budget", "Status", "Created"];
    const csvContent = [
      headers.join(","),
      ...filteredRequests.map(r => [
        `"${r.businessName}"`,
        `"${r.nameAndRole}"`,
        `"${r.industry}"`,
        `"${r.companySize}"`,
        `"${r.timeline}"`,
        `"${r.budget}"`,
        `"${r.status}"`,
        `"${new Date(r.createdAt).toLocaleDateString()}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-discovery-requests.csv";
    a.click();
  };

  const getStats = () => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === "pending").length;
    const scheduled = requests.filter(r => r.status === "scheduled").length;
    const completed = requests.filter(r => r.status === "completed").length;
    
    return { total, pending, scheduled, completed };
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-5 border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 border">
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
          <h2 className="text-2xl font-bold text-gray-900">AI Discovery Requests</h2>
          <p className="text-gray-500 mt-1">Manage AI discovery session requests and scheduling</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold">{stats.scheduled}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by business name, industry, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Timeline Filter */}
          <div className="w-full md:w-48">
            <select
              value={timelineFilter}
              onChange={(e) => setTimelineFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {timelineOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeline</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => {
                  const statusConfig = statusOptions.find(s => s.value === request.status) || statusOptions[0];
                  
                  return (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">{request.businessName}</p>
                          <p className="text-sm text-gray-500">{request.industry}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-gray-900">{request.nameAndRole}</p>
                        {request.website && (
                          <a 
                            href={request.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-emerald-600 hover:text-emerald-700"
                          >
                            {request.website}
                          </a>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-gray-900">{request.industry}</span>
                        <p className="text-sm text-gray-500">{request.companySize}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{request.timeline}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{request.budget}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="relative">
                          <select
                            value={request.status}
                            onChange={(e) => updateStatus(request._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border appearance-none cursor-pointer ${statusConfig.color} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                          >
                            {statusOptions.filter(s => s.value !== "all").map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none" />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => viewDetails(request)}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => window.open(`mailto:${request.email || '#'}`)}
                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Send Email"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center">
                    <div className="text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-3" />
                      <p className="text-lg font-medium">No requests found</p>
                      <p className="text-sm mt-1">
                        {requests.length === 0 ? "No AI discovery requests yet" : "Try adjusting your filters"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredRequests.length > 0 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredRequests.length}</span> of{" "}
              <span className="font-medium">{requests.length}</span> requests
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1.5 text-sm border rounded-lg bg-emerald-50 text-emerald-700 border-emerald-200">
                1
              </button>
              <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
      {isDetailOpen && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">AI Discovery Request Details</h3>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-8">
                {/* Business Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">BUSINESS INFORMATION</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Business Name</p>
                      <p className="font-medium text-lg">{selectedRequest.businessName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact Person</p>
                      <p className="font-medium">{selectedRequest.nameAndRole}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Industry</p>
                      <p className="font-medium">{selectedRequest.industry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company Size</p>
                      <p className="font-medium">{selectedRequest.companySize}</p>
                    </div>
                    {selectedRequest.website && (
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Website</p>
                        <a 
                          href={selectedRequest.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          {selectedRequest.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Operations */}
                {selectedRequest.operationsAreas && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">CURRENT OPERATIONS</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Areas of Operation</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedRequest.operationsAreas.map((area, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      {selectedRequest.frictionAreas && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Friction Areas</p>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {selectedRequest.frictionAreas}
                          </p>
                        </div>
                      )}
                      {selectedRequest.repetitiveTasks && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Repetitive Tasks</p>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {selectedRequest.repetitiveTasks}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* AI Expectations */}
                {selectedRequest.successDefinition && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">AI EXPECTATIONS</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Definition of Success</p>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {selectedRequest.successDefinition}
                        </p>
                      </div>
                      {selectedRequest.expectations && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Session Expectations</p>
                          <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                            {selectedRequest.expectations}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Current Tools & Data */}
                {(selectedRequest.currentTools?.length > 0 || selectedRequest.dataStorage?.length > 0) && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">CURRENT TOOLS & DATA</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      {selectedRequest.currentTools?.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Current Tools</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedRequest.currentTools.map((tool, idx) => (
                              <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedRequest.dataStorage?.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Data Storage</p>
                          <div className="flex flex-wrap gap-2">
                            {selectedRequest.dataStorage.map((storage, idx) => (
                              <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full">
                                {storage}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Session Details */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-4">SESSION DETAILS</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Timeline</p>
                      <p className="font-medium">{selectedRequest.timeline}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget Range</p>
                      <p className="font-medium">{selectedRequest.budget}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Preferred Format</p>
                      <p className="font-medium">{selectedRequest.format}</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {selectedRequest.additionalInfo && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">ADDITIONAL INFORMATION</h4>
                    <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                      {selectedRequest.additionalInfo}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-6 border-t flex gap-3">
                  <button
                    onClick={() => updateStatus(selectedRequest._id, "scheduled")}
                    className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Schedule Session
                  </button>
                  <button
                    onClick={() => setIsDetailOpen(false)}
                    className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDiscoveryAdmin;