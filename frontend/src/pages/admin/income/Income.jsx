import { useEffect, useState } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar,
  Filter,
  Download,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  BarChart3,
  PieChart
} from "lucide-react";
import api from "../../../services/api";

const Income = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [form, setForm] = useState({
    client: "",
    service: "web-development",
    amount: "",
    status: "paid",
    notes: "",
    date: new Date().toISOString().split('T')[0],
    currency: "KES"
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const services = [
    { value: "web", label: "Web Development" },
    { value: "app", label: "App Development" },
    { value: "ai", label: "AI Consulting" },
    { value: "marketing", label: "Digital Marketing" },
    { value: "other", label: "Other" }
  ];
  

  const currencies = [
    { value: "KES", label: "KES", symbol: "KES" },
    { value: "USD", label: "USD", symbol: "$" },
    { value: "EUR", label: "EUR", symbol: "€" }
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "paid", label: "Paid", color: "bg-green-100 text-green-700" },
    { value: "invoiced", label: "Invoiced", color: "bg-blue-100 text-blue-700" },
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-700" },
    { value: "overdue", label: "Overdue", color: "bg-red-100 text-red-700" }
  ];

  const timeOptions = [
    { value: "all", label: "All Time" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "quarter", label: "This Quarter" },
    { value: "year", label: "This Year" }
  ];

  useEffect(() => {
    fetchIncome();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [searchTerm, statusFilter, serviceFilter, timeFilter, entries]);

  const fetchIncome = async () => {
    setIsLoading(true);
    try {
      const res = await api.get("/admin/income");
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching income:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterEntries = () => {
    let filtered = entries;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(entry =>
        entry.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(entry => entry.status === statusFilter);
    }

    // Apply service filter
    if (serviceFilter !== "all") {
      filtered = filtered.filter(entry => entry.service === serviceFilter);
    }

    // Apply time filter
    if (timeFilter !== "all") {
      const now = new Date();
      const entryDate = new Date();
      
      filtered = filtered.filter(entry => {
        entryDate.setTime(new Date(entry.date).getTime());
        
        switch (timeFilter) {
          case "today":
            return entryDate.toDateString() === now.toDateString();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        case "week":
            return entryDate >= weekAgo;
          case "month":
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return entryDate >= monthAgo;
          case "quarter":
            const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
            return entryDate >= quarterAgo;
        case "year":
            const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            return entryDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    setFilteredEntries(filtered);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/admin/income", {
        ...form,
        amount: Number(form.amount)
      });
      
      setForm({
        client: "",
        service: "web-development",
        amount: "",
        status: "paid",
        notes: "",
        date: new Date().toISOString().split('T')[0],
        currency: "KES"
      });
      
      setShowForm(false);
      fetchIncome();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const getStats = () => {
    const total = entries.reduce((sum, e) => sum + e.amount, 0);
    const paid = entries.filter(e => e.status === "paid").reduce((sum, e) => sum + e.amount, 0);
    const pending = entries.filter(e => e.status === "invoiced" || e.status === "pending").reduce((sum, e) => sum + e.amount, 0);
    const overdue = entries.filter(e => e.status === "overdue").reduce((sum, e) => sum + e.amount, 0);
    const uniqueClients = new Set(entries.map(e => e.client)).size;
    
    return { total, paid, pending, overdue, uniqueClients };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid": return <CheckCircle className="w-4 h-4" />;
      case "invoiced": return <Clock className="w-4 h-4" />;
      case "pending": return <Clock className="w-4 h-4" />;
      case "overdue": return <AlertCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getServiceColor = (service) => {
    const colors = {
        web: "bg-blue-100 text-blue-700",
        app: "bg-purple-100 text-purple-700",
        ai: "bg-emerald-100 text-emerald-700",
        marketing: "bg-amber-100 text-amber-700",
        other: "bg-gray-100 text-gray-700"
      };      
    return colors[service] || "bg-gray-100 text-gray-700";
  };

  const exportData = () => {
    const csv = [
      ["Client", "Service", "Amount", "Status", "Date", "Notes"].join(","),
      ...filteredEntries.map(e => [
        e.client,
        e.service,
        e.amount,
        e.status,
        new Date(e.date).toLocaleDateString(),
        e.notes || ""
      ].map(field => `"${field}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `income-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const stats = getStats();

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white rounded-xl p-5 border">
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
          <h2 className="text-2xl font-bold text-gray-900">Income Tracking</h2>
          <p className="text-gray-500 mt-1">Track and manage your income streams</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={exportData}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Income
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Income</p>
              <p className="text-2xl font-bold">KES {stats.total.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-2xl font-bold">KES {stats.paid.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold">KES {stats.pending.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <p className="text-2xl font-bold">KES {stats.overdue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Clients</p>
              <p className="text-2xl font-bold">{stats.uniqueClients}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by client or notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full lg:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Service Filter */}
          <div className="w-full lg:w-48">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Services</option>
              {services.map(service => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time Filter */}
          <div className="w-full lg:w-48">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {timeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add Income Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Add Income Entry</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    placeholder="Enter client name"
                    value={form.client}
                    onChange={e => setForm({ ...form, client: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service
                    </label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {services.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <select
                      value={form.currency}
                      onChange={e => setForm({ ...form, currency: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      {currencies.map(currency => (
                        <option key={currency.value} value={currency.value}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Amount *
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={form.amount}
                      onChange={e => setForm({ ...form, amount: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={e => setForm({ ...form, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {statusOptions.slice(1).map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    placeholder="Additional notes (optional)"
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Add Income
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Income Table */}
      <div className="bg-white rounded-xl border border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredEntries.length > 0 ? (
                filteredEntries.map(entry => {
                  const currencySymbol = currencies.find(c => c.value === entry.currency)?.symbol || "KES";
                  
                  return (
                    <tr key={entry._id} className="hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-gray-900">{entry.client}</p>
                          {entry.notes && (
                            <p className="text-sm text-gray-500 truncate max-w-[200px]">{entry.notes}</p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getServiceColor(entry.service)}`}>
                          {services.find(s => s.value === entry.service)?.label || entry.service}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold text-gray-900">
                            {currencySymbol} {entry.amount.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(entry.status)}
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            statusOptions.find(s => s.value === entry.status)?.color || "bg-gray-100 text-gray-700"
                          }`}>
                            {entry.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(entry.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center">
                    <div className="text-gray-400">
                      <DollarSign className="w-12 h-12 mx-auto mb-3" />
                      <p className="text-lg font-medium">No income entries found</p>
                      <p className="text-sm mt-1">
                        {entries.length === 0 ? "No income recorded yet" : "Try adjusting your filters"}
                      </p>
                      {entries.length === 0 && (
                        <button
                          onClick={() => setShowForm(true)}
                          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Add Your First Income Entry
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        {filteredEntries.length > 0 && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">{filteredEntries.length}</span> of{" "}
                  <span className="font-medium">{entries.length}</span> entries
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Filtered Total</p>
                <p className="text-xl font-bold text-gray-900">
                  KES {filteredEntries.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Income;