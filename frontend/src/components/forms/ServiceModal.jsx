import { useEffect, useState } from "react";
import {
  X,
  Send,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  Target,
  Loader,
  Calendar,
  DollarSign,
  Phone,
  Briefcase,
  Clock,
  ArrowRight
} from "lucide-react";
import api from "../../services/api";

const GetServiceModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [services, setServices] = useState([]);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceInterestId: "",
    message: "",
    timeline: "1-3 months",
    budget: "5000-10000"
  });

  const timelineOptions = [
    { value: "immediately", label: "Immediately (ASAP)" },
    { value: "1-3 months", label: "1-3 months" },
    { value: "3-6 months", label: "3-6 months" },
    { value: "6+ months", label: "6+ months" }
  ];

  const budgetOptions = [
    { value: "1000-5000", label: "$1,000 - $5,000" },
    { value: "5000-10000", label: "$5,000 - $10,000" },
    { value: "10000-25000", label: "$10,000 - $25,000" },
    { value: "25000+", label: "$25,000+" },
    { value: "not-sure", label: "Not sure yet" }
  ];

  useEffect(() => {
    if (open) {
      api.get("/admin/services")
        .then(res => setServices(res.data))
        .catch(err => console.error("Failed to load services", err));
      
      // Reset form when modal opens
      setForm({
        name: "",
        email: "",
        phone: "",
        serviceInterestId: "",
        message: "",
        timeline: "1-3 months",
        budget: "5000-10000"
      });
      setErrors({});
    }
  }, [open]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.serviceInterestId) newErrors.serviceInterestId = "Please select a service";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const submit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await api.post("/service-request", form);
      setSubmitted(true);

      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          phone: "",
          serviceInterestId: "",
          message: "",
          timeline: "1-3 months",
          budget: "5000-10000"
        });
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 p-2 bg-white/90 hover:bg-gray-100 rounded-full shadow-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {submitted ? (
          <div className="p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Request Submitted Successfully!
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Thank you for your interest. We've received your project details and will contact you within 24 hours to discuss next steps.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Redirecting you back...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6 md:p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Start Your Project</h3>
                  <p className="text-emerald-100 text-sm mt-1">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <input
                      name="name"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="w-4 h-4" />
                      Service Interested In *
                    </label>
                    <select
                      name="serviceInterestId"
                      value={form.serviceInterestId}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none ${
                        errors.serviceInterestId ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service._id} value={service._id}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                    {errors.serviceInterestId && (
                      <p className="mt-1 text-sm text-red-600">{errors.serviceInterestId}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4" />
                      Project Timeline
                    </label>
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                    >
                      {timelineOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <DollarSign className="w-4 h-4" />
                      Estimated Budget
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                    >
                      {budgetOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  Project Details
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us about your project goals, requirements, and any specific challenges you're facing..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  The more details you provide, the better we can understand your needs.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>We typically respond within 24 hours</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full group relative bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Processing your request...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      <span>Submit Project Request</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500">
                  By submitting, you agree to our Privacy Policy and consent to contact regarding your project.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default GetServiceModal;