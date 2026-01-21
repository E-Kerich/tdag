import { useState, useEffect } from "react";
import { 
  Send, 
  Users, 
  Mail, 
  Eye, 
  Calendar,
  BarChart3,
  Target,
  Clock,
  ArrowUpRight,
  BookTemplateIcon
} from "lucide-react";
import api from "../../../services/api";

const Email = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [previewText, setPreviewText] = useState("");
  const [segment, setSegment] = useState("all");
  const [schedule, setSchedule] = useState("send_now");
  const [scheduledDate, setScheduledDate] = useState("");
  const [sending, setSending] = useState(false);
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    openRate: 0,
    clickRate: 0
  });
  const [templates, setTemplates] = useState([]);

  const segments = [
    { value: "all", label: "All Subscribers" }
  ];
  

  const scheduleOptions = [
    { value: "send_now", label: "Send Immediately" },
    { value: "schedule", label: "Schedule for Later" }
  ];

  useEffect(() => {
    fetchEmailStats();
    fetchTemplates();
  }, []);

  const fetchEmailStats = async () => {
    try {
      const res = await api.get("/admin/subscribers");
  
      setSubscribers(res.data);
  
      setStats({
        totalSubscribers: res.data.length,
        activeSubscribers: res.data.length, // Phase 1 = all active
        openRate: 0, // Phase 2 feature
        clickRate: 0 // Phase 2 feature
      });
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };
  

  const fetchTemplates = async () => {
    setTemplates([]);
  };
  

  const loadTemplate = (template) => {
    setSubject(template.subject);
    setContent(template.content);
    setPreviewText(template.previewText || "");
  };

  const sendNewsletter = async (e) => {
    e.preventDefault();
  
    if (!subject.trim() || !content.trim()) {
      alert("Please fill in both subject and content");
      return;
    }
  
    setSending(true);
  
    try {
      await api.post("/admin/email/newsletter", {
        subject,
        content,
        previewText
      });
  
      setSubject("");
      setContent("");
      setPreviewText("");
  
      alert(`Newsletter sent to ${subscribers.length} subscribers`);
    } catch (error) {
      console.error("Error sending newsletter:", error);
      alert("Failed to send newsletter.");
    } finally {
      setSending(false);
    }
  };
  

  

  const previewEmail = () => {
    if (!content.trim()) {
      alert("Please add content to preview");
      return;
    }
    
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Email Preview: ${subject}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; }
            .email-container { max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
            .email-header { background: #f9fafb; padding: 20px; border-bottom: 1px solid #e5e7eb; }
            .email-content { padding: 30px; background: white; }
            .preview-text { color: #6b7280; font-size: 14px; margin-bottom: 20px; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h2>${subject}</h2>
              ${previewText ? `<div class="preview-text">${previewText}</div>` : ''}
            </div>
            <div class="email-content">
              ${content}
            </div>
          </div>
        </body>
      </html>
    `);
    previewWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Email Campaigns</h2>
          <p className="text-gray-500 mt-1">Send newsletters and email campaigns to your audience</p>
        </div>
        
        <div className="flex items-center gap-3">
          <a
            href="/admin/email/campaigns"
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            View Campaigns
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Subscribers</p>
              <p className="text-2xl font-bold">{stats.totalSubscribers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Mail className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Subscribers</p>
              <p className="text-2xl font-bold">{stats.activeSubscribers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-lg">
              <Eye className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Open Rate</p>
              <p className="text-2xl font-bold">{stats.openRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 ">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Click Rate</p>
              <p className="text-2xl font-bold">{stats.clickRate}%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Email Form - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <form onSubmit={sendNewsletter} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line *
                </label>
                <input
                  placeholder="Enter email subject line"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  required
                  disabled={sending}
                />
                <p className="text-xs text-gray-500 mt-2">Keep it concise and compelling</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preview Text
                </label>
                <input
                  placeholder="Brief text shown in email preview (optional)"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  disabled={sending}
                  maxLength={150}
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">Shown next to subject line in inbox</p>
                  <span className="text-xs text-gray-500">{previewText.length}/150</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Content *
                  </label>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Supports HTML</span>
                    <span className="text-gray-300">•</span>
                    <button
                      type="button"
                      onClick={previewEmail}
                      className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                  </div>
                </div>
                <textarea
                  placeholder="Write your email content here. HTML supported."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono text-sm"
                  required
                  disabled={sending}
                />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-gray-500">Use HTML tags for formatting</p>
                  <span className="text-xs text-gray-500">{content.length} characters</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Target Segment
                    </div>
                  </label>
                  <select
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    disabled={sending}
                  >
                    {segments.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Send Schedule
                    </div>
                  </label>
                  <select
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-3"
                    disabled={sending}
                  >
                    {scheduleOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  
                  {schedule === "schedule" && (
                    <div>
                      <input
                        type="datetime-local"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        disabled={sending}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                <button
                  type="submit"
                  disabled={sending || !subject.trim() || !content.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-sm bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending Campaign...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {schedule === "send_now" ? "Send Newsletter" : "Schedule Newsletter"}
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-500">
                This email will be sent to <strong>{subscribers.length}</strong> subscribers
                </p>


                
              </div>
            </form>
          </div>
        </div>

        {/* Templates Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Templates */}
          <div className="bg-white rounded-xl border border-gray-200  p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <BookTemplateIcon className="w-4 h-4" />
                Email Templates
              </h3>
              <span className="text-sm text-gray-500">{templates.length} templates</span>
            </div>

            <div className="space-y-3">
              {templates.length > 0 ? (
                templates.map(template => (
                  <button
                    key={template._id}
                    onClick={() => loadTemplate(template)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{template.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 truncate">{template.subject}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">
                        Updated {new Date(template.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="text-center py-8">
                  <BookTemplateIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No templates yet</p>
                  <p className="text-sm text-gray-400 mt-1">Create templates for common emails</p>
                </div>
              )}
            </div>
          </div>

          {/* Sending Tips */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h4 className="font-semibold text-blue-900 mb-3">Sending Tips</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-blue-800">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Keep subject lines under 60 characters</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-800">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Always send a test email first</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-800">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Best sending times: 10 AM or 2 PM</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-800">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Include a clear call-to-action</span>
              </li>
            </ul>
          </div>

          {/* Stats Summary */}
          <div className="bg-white rounded-xl border border-gray-200  p-5">
            <h4 className="font-semibold text-gray-900 mb-3">Campaign Stats</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Open Rate</span>
                  <span className="font-medium">{stats.openRate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${stats.openRate}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Click Rate</span>
                  <span className="font-medium">{stats.clickRate}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${stats.clickRate}%` }}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Average Delivery Time</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">2-5 minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;