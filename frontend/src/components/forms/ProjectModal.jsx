import { useState } from "react";
import { X, Send, Building, Calendar, Package } from "lucide-react";
import api from "../../services/api";

const packages = [
  "Starter Business Website",
  "Growth Business Website",
  "Custom Business Platform",
  "E-Commerce Solution"
];

const maintenancePlans = [
  "None",
  "Essential",
  "Professional",
  "Enterprise"
];

const ProjectRequestModal = ({ isOpen, onClose, selectedPackage }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    package: selectedPackage || "",
    maintenance: "None",
    timeline: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post("/project-request", form);
      setSubmitted(true);
    } catch (error) {
      alert("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      package: selectedPackage || "",
      maintenance: "None",
      timeline: "",
      description: ""
    });
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 pt-30 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your interest. We'll review your request and get back to you within 24 hours.
            </p>
            <button
              onClick={resetAndClose}
              className="px-6 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Start Your Project
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you with a tailored proposal.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    Company / Business
                  </label>
                  <input
                    name="company"
                    placeholder="Acme Inc. (Optional)"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    Package Selection *
                  </label>
                  <select
                    name="package"
                    value={form.package}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a package</option>
                    {packages.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maintenance Plan
                  </label>
                  <select
                    name="maintenance"
                    value={form.maintenance}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    {maintenancePlans.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Desired Timeline
                  </label>
                  <input
                    name="timeline"
                    placeholder="e.g., 1–2 months (Optional)"
                    value={form.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe your project goals, requirements, and any specific needs..."
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-medium py-3.5 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Request
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-500 text-center">
                We typically respond within 24 hours. Your information is secure and confidential.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectRequestModal;