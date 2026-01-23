import { useState } from "react";
import { Send, Mail, User, MessageSquare, CheckCircle, ArrowRight, Phone } from "lucide-react";
import api from "../../services/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    serviceInterest: "other",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm({
        name: "",
        email: "",
        serviceInterest: "other",
        message: ""
      });
    } catch (err) {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 sm:w-20 h-16 sm:h-20 bg-emerald-100 rounded-full mb-6 sm:mb-8">
              <CheckCircle className="w-8 sm:w-10 h-8 sm:h-10 text-emerald-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Message Received
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Thanks for reaching out. We'll review your message and get back to you within 24 hours.
            </p>
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-6 sm:p-8 max-w-md mx-auto shadow-sm">
              <div className="text-left space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Next Steps</p>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-900 font-medium">1. We'll review your inquiry</p>
                    <p className="text-gray-900 font-medium">2. Schedule a discovery call</p>
                    <p className="text-gray-900 font-medium">3. Provide initial recommendations</p>
                  </div>
                </div>
                <div className="pt-6 border-t">
                  <a 
                    href="/"
                    className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Return to homepage
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 sm:py-12 md:py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-12">
          {/* Left Column - Info */}
          <div className="w-full lg:w-1/2">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-50 rounded-full border border-emerald-100 mb-4 sm:mb-6">
                <MessageSquare className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-emerald-600" />
                <span className="text-xs sm:text-sm font-medium text-emerald-700">Get in Touch</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 mb-4 sm:mb-6">
                Let's discuss your
                <span className="text-emerald-600 block md:inline"> digital needs</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
                Tell us a bit about what you're working on, and we'll respond with clarity and practical next steps.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200">
                <div className="p-2 sm:p-3 bg-emerald-50 rounded-lg flex-shrink-0">
                  <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500">Email</p>
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">info@thedigitalagame.org</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200">
                <div className="p-2 sm:p-3 bg-emerald-50 rounded-lg flex-shrink-0">
                  <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500">Response Time</p>
                  <p className="text-sm sm:text-base font-medium text-gray-900">Within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/30 rounded-xl sm:rounded-2xl border border-emerald-100">
              <h3 className="font-semibold text-emerald-800 text-sm sm:text-base mb-2 sm:mb-3">Why reach out?</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                <li className="flex items-center gap-2 text-xs sm:text-sm text-emerald-700">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  Free initial consultation
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-emerald-700">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  No obligation, just clarity
                </li>
                <li className="flex items-center gap-2 text-xs sm:text-sm text-emerald-700">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  Practical recommendations
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-sm sm:shadow-lg p-5 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">We'll get back to you with practical next steps.</p>

              {error && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-100 rounded-lg sm:rounded-xl">
                  <p className="text-red-700 text-xs sm:text-sm">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Your name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Your email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    What are you interested in?
                  </label>
                  <select
                    name="serviceInterest"
                    value={form.serviceInterest}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base appearance-none"
                  >
                    <option value="other">Select a service</option>
                    <option value="web">Web Development / Digital Systems</option>
                    <option value="marketing">Digital Strategy & Marketing</option>
                    <option value="ai">AI for Business</option>
                    <option value="app">App Development</option>
                    <option value="consulting">General Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Your message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Briefly describe your situation, challenges, or what you'd like to achieve..."
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold text-sm sm:text-base md:text-lg rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 sm:w-5 h-4 sm:h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
                  We respect your privacy. Your information will only be used to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;