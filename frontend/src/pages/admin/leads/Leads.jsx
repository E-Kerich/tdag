import { useEffect, useState } from "react";
import api from "../../../services/api";
import StatusBadge from "../../../components/dashboard/StatusBadge";
import { Search, Filter, Download, MoreVertical, Eye, Mail, Phone, Calendar } from "lucide-react";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "new", label: "New" },
    { value: "contacted", label: "Contacted" },
    { value: "qualified", label: "Qualified" },
    { value: "converted", label: "Converted" },
    { value: "lost", label: "Lost" }
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    filterLeads();
  }, [searchTerm, statusFilter, leads]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/leads");
      setLeads(res.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = leads;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.serviceInterest.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  };

  const exportLeads = () => {
    // Implement CSV export logic here
    console.log("Exporting leads...");
  };

  const viewLeadDetails = (lead) => {
    setSelectedLead(lead);
    setIsDetailOpen(true);
  };

  const getTotalLeadsByStatus = (status) => {
    return leads.filter(lead => lead.status === status).length;
  };

  const stats = [
    { label: "Total Leads", value: leads.length, color: "text-gray-600" },
    { label: "New", value: getTotalLeadsByStatus("new"), color: "text-blue-600" },
    { label: "Contacted", value: getTotalLeadsByStatus("contacted"), color: "text-purple-600" },
    { label: "Converted", value: getTotalLeadsByStatus("converted"), color: "text-emerald-600" }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leads Management</h2>
          <p className="text-gray-500 mt-1">Track and manage all your leads in one place</p>
        </div>
        <button
          onClick={exportLeads}
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Leads
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or service..."
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
        </div>

        {/* Active Filters Badge */}
        {(searchTerm || statusFilter !== "all") && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                Search: {searchTerm}
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                Status: {statusOptions.find(o => o.value === statusFilter)?.label}
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length > 0 ? (
                filteredLeads.map(lead => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                        {lead.phone && (
                          <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 capitalize">
                        {lead.serviceInterest}
                      </span>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(lead.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewLeadDetails(lead)}
                          className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <a
                          href={`mailto:${lead.email}`}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center">
                    <div className="text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-3" />
                      <p className="text-lg font-medium">No leads found</p>
                      <p className="text-sm mt-1">
                        {leads.length === 0 ? "No leads in the system" : "Try adjusting your filters"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredLeads.length > 0 && (
          <div className="px-6 py-4 border-t flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{filteredLeads.length}</span> of{" "}
              <span className="font-medium">{leads.length}</span> leads
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

      {/* Lead Detail Modal */}
      {isDetailOpen && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Lead Details</h3>
                <button
                  onClick={() => setIsDetailOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">CONTACT INFORMATION</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedLead.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedLead.email}</p>
                    </div>
                    {selectedLead.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedLead.phone}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-gray-500">Service Interest</p>
                      <p className="font-medium capitalize">{selectedLead.serviceInterest}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Dates */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">STATUS & DATES</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Status</p>
                      <div className="mt-1">
                        <StatusBadge status={selectedLead.status} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Created On</p>
                      <p className="font-medium">
                        {new Date(selectedLead.createdAt).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                {selectedLead.message && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-3">MESSAGE</h4>
                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                      {selectedLead.message}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-6 border-t flex gap-3">
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="flex-1 py-3 bg-emerald-600 text-white rounded-lg text-center hover:bg-emerald-700 transition-colors"
                  >
                    Send Email
                  </a>
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

export default Leads;