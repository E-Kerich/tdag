import { useEffect, useState } from "react";
import { 
  Users, TrendingUp, CheckCircle, DollarSign, 
  Eye, MessageSquare, Calendar, ArrowUpRight 
} from "lucide-react";
import api from "../../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeLeads: 0,
    convertedLeads: 0,
    monthlyRevenue: 0,
    newLeadsThisMonth: 0,
    openRate: 0
  });

  const [recentLeads, setRecentLeads] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month"); // month, quarter, year

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch all necessary data
      const leadsRes = await api.get("/admin/leads");
      const leads = leadsRes.data;
      
      // You should have these API endpoints
      // const statsRes = await api.get("/admin/stats", { params: { range: timeRange } });
      // const activityRes = await api.get("/admin/recent-activity");
      
      // For now, calculate from leads data
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      
      const newLeadsThisMonth = leads.filter(lead => {
        const leadDate = new Date(lead.createdAt);
        return leadDate.getMonth() === currentMonth && 
               leadDate.getFullYear() === currentYear;
      }).length;

      const convertedLeads = leads.filter(l => l.status === "converted");
      const activeLeads = leads.filter(l => l.status === "active" || l.status === "contacted");
      
      // Mock email stats (replace with actual API call)
      const openRate = 68; // This should come from your email service API

      // Calculate revenue (adjust based on your pricing model)
      const monthlyRevenue = convertedLeads.length * 1999;

      setStats({
        totalLeads: leads.length,
        activeLeads: activeLeads.length,
        convertedLeads: convertedLeads.length,
        monthlyRevenue,
        newLeadsThisMonth,
        openRate
      });

      // Get recent leads (last 5)
      const sortedLeads = [...leads]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentLeads(sortedLeads);

     

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate rates
  const conversionRate = stats.totalLeads > 0 
    ? Math.round((stats.convertedLeads / stats.totalLeads) * 100) 
    : 0;

  const activeRate = stats.totalLeads > 0 
    ? Math.round((stats.activeLeads / stats.totalLeads) * 100) 
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-xl p-5 border">
              <div className="h-10 w-10 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-500 mt-1">Overview of your business performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Time range:</span>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none "
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last quarter</option>
            <option value="year">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          change={stats.newLeadsThisMonth > 0 ? `+${stats.newLeadsThisMonth} this month` : null}
          icon={Users}
          color="bg-blue-50 text-blue-600"
          isLoading={isLoading}
        />
        <StatCard
          title="Active Leads"
          value={stats.activeLeads}
          change={activeRate > 0 ? `${activeRate}% of total` : null}
          icon={TrendingUp}
          color="bg-emerald-50 text-emerald-600"
          isLoading={isLoading}
        />
        <StatCard
          title="Converted"
          value={stats.convertedLeads}
          change={conversionRate > 0 ? `${conversionRate}% conversion` : null}
          icon={CheckCircle}
          color="bg-green-50 text-green-600"
          isLoading={isLoading}
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          change={stats.monthlyRevenue > 0 ? "Current month" : null}
          icon={DollarSign}
          color="bg-purple-50 text-purple-600"
          isLoading={isLoading}
        />
      </div>

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads - 2 columns on desktop */}
        <div className="lg:col-span-2 bg-white rounded-xl p-4 sm:p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900 text-lg">Recent Leads</h3>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{recentLeads.length} leads</span>
              <a 
                href="/admin/leads" 
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                View all <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {recentLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-500 border-b">
                    <th className="pb-3 font-medium">Lead</th>
                    <th className="pb-3 font-medium">Service</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentLeads.map(lead => (
                    <tr key={lead._id} className="hover:bg-gray-50">
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          <p className="text-sm text-gray-500 truncate max-w-[150px]">{lead.email}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-gray-600 capitalize">{lead.serviceInterest}</span>
                      </td>
                      <td className="py-3">
                        <span className={`inline-block px-2.5 py-1 text-xs rounded-full ${
                          lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                          lead.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                          lead.status === 'converted' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </td>
                      <td className="py-3">
                        <button className="text-sm text-emerald-600 hover:text-emerald-700">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">No leads yet</p>
              <p className="text-gray-400 text-sm mt-1">Leads will appear here once received</p>
            </div>
          )}
        </div>

        {/* Right Column - Stats & Activity */}
        <div className="space-y-6">
          {/* Performance Stats */}
          <div className="bg-white rounded-xl p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 text-lg mb-6">Performance</h3>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Conversion Rate</span>
                  <span className="font-medium text-gray-900">{conversionRate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                    style={{ width: `${conversionRate}%` }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Email Open Rate</span>
                  <span className="font-medium text-gray-900">{stats.openRate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                    style={{ width: `${stats.openRate}%` }} 
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Active Rate</span>
                  <span className="font-medium text-gray-900">{activeRate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-500 rounded-full transition-all duration-500" 
                    style={{ width: `${activeRate}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 text-lg mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map(activity => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${activity.color.replace('text-', 'bg-')} bg-opacity-10`}>
                      <Icon className={`w-4 h-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {activity.type === 'new_lead' && 'New lead added'}
                        {activity.type === 'conversion' && 'Lead converted'}
                        {activity.type === 'email_sent' && 'Email campaign sent'}
                        {activity.type === 'view' && 'Blog post viewed'}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.user}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, icon: Icon, color, isLoading }) => (
  <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-200 hover:shadow-sm transition-shadow">
    <div className="flex items-center justify-between mb-3">
      <div className={`p-2.5 rounded-lg ${color.split(' ')[0]} ${color.split(' ')[1]?.replace('text-', '')}`}>
        <Icon className="w-5 h-5" />
      </div>
      {change && (
        <span className="text-xs font-medium text-gray-500">{change}</span>
      )}
    </div>
    <p className="text-gray-500 text-sm">{title}</p>
    {isLoading ? (
      <div className="h-8 mt-2 bg-gray-100 rounded animate-pulse"></div>
    ) : (
      <p className="text-2xl font-bold mt-1">{value}</p>
    )}
  </div>
);

export default Dashboard;