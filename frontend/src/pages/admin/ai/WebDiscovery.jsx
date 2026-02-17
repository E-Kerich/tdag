import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, ChevronRight, DollarSign, TrendingUp, Clock, CheckCircle } from "lucide-react";
import api from "../../../services/api";

const WebDiscoveryList = () => {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await api.get("/admin/web-discovery");
      setEntries(res.data);
    } catch (error) {
      console.error("Error fetching discovery leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "text-emerald-600 bg-emerald-50";
    if (score >= 5) return "text-amber-600 bg-amber-50";
    return "text-gray-600 bg-gray-50";
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-50 text-blue-700",
      contacted: "bg-purple-50 text-purple-700",
      qualified: "bg-emerald-50 text-emerald-700",
      lost: "bg-red-50 text-red-700"
    };
    return colors[status] || "bg-gray-50 text-gray-700";
  };

  const getBudgetColor = (budget) => {
    if (budget >= 10000) return "text-emerald-600 font-medium";
    if (budget >= 5000) return "text-amber-600";
    return "text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        <div className="bg-white rounded-xl p-4 border">
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 bg-gray-100 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Discovery Leads</h2>
        <p className="text-gray-500 mt-1">Web discovery form submissions</p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New</p>
              <p className="text-xl font-semibold text-gray-900">
                {entries.filter(e => e.status === "new").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Contacted</p>
              <p className="text-xl font-semibold text-gray-900">
                {entries.filter(e => e.status === "contacted").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Qualified</p>
              <p className="text-xl font-semibold text-gray-900">
                {entries.filter(e => e.status === "qualified").length}
              </p>
            </div>
          </div>
        </div>

        
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-50">
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <tr key={entry._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{entry.name}</p>
                        <p className="text-sm text-gray-500">{entry.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-base ${getBudgetColor(entry.budget)}`}>
                        ${entry.budget?.toLocaleString()}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg font-semibold ${getScoreColor(entry.score)}`}>
                        {entry.score}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>
                        {entry.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/admin/web-discovery/${entry._id}`}
                        className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium group"
                      >
                        View
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    No discovery submissions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WebDiscoveryList;