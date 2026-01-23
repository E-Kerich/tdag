import { Shield, FileText, Lock, Mail, CreditCard, Cookie, Clock } from "lucide-react";
import { useEffect } from "react";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-gray-200 mb-4">
          <Shield className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">Privacy & Security</span>
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-2 h-2" />
            <span>Effective Date: Jan 2025</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-2 h-2" />
            <span>Last Updated: Jan 2026</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-8">
        {/* Introduction */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            1.
            Introduction
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Digital A-Game</strong> ("we", "our", "us") respects your privacy and is committed to protecting the personal information you share with us.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, and protect your information when you:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Visit our website</li>
              <li>Purchase digital products</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us or use our services</li>
            </ul>
            <p className="pt-2">
              By using our platform, you agree to the practices described in this policy.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            2.
            Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            We collect only information necessary to operate our services effectively.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">a) Information You Provide</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Name (when provided)</li>
                <li>Email address</li>
                <li>Payment-related details (processed securely by third-party payment providers)</li>
                <li>Messages sent through contact forms</li>
                <li>Information submitted during consultations or discovery sessions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">b) Automatically Collected Information</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited and usage patterns</li>
              </ul>
              <p className="text-gray-600 mt-2">
                This data helps us improve performance and user experience.
              </p>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            3.
            How We Use Your Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Primary Uses</h3>
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Deliver purchased digital products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Process payments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Send transactional emails (receipts, delivery links)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Send newsletters (only if you subscribe)</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Additional Uses</h3>
              <ul className="space-y-1 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Respond to inquiries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Improve our services and content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Maintain security and prevent fraud</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              <strong>Important:</strong> We do not sell your personal data.
            </p>
          </div>
        </section>

        {/* Payments & Third-Party Services */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-gray-600" />
            4.
            Payments & Third-Party Services
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Payments are processed through trusted third-party providers such as:
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Paystack</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Email delivery services</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Cloud storage providers</span>
            </div>
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>We do not store your card or payment details on our servers.</span>
              </p>
              <p>
                Each third-party service operates under its own privacy policies.
              </p>
            </div>
          </div>
        </section>

        {/* Email Communication */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-gray-600" />
            5.
            Email Communication
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>You may receive:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Transactional emails</strong> (mandatory for purchases)
              </li>
              <li>
                <strong>Product delivery emails</strong>
              </li>
              <li>
                <strong>Optional newsletters</strong> (only if you opt in)
              </li>
            </ul>
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4 mt-4">
              <p className="text-emerald-800 font-medium">
                You can unsubscribe from non-essential emails at any time.
              </p>
            </div>
          </div>
        </section>

        {/* Data Storage & Security */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            6.
            Data Storage & Security
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              We take reasonable measures to protect your information, including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Secure servers</li>
              <li>Restricted access</li>
              <li>Industry-standard safeguards</li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mt-4">
              <p className="text-yellow-800">
                <strong>Note:</strong> However, no online system is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            7.
            Your Rights
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>You have the right to:</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Request access to your personal data</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Request correction or deletion</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Withdraw consent for marketing communications</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                <strong>To exercise these rights, contact us at:</strong>
              </p>
              <p className="text-emerald-600 font-medium mt-1">[your support email]</p>
            </div>
          </div>
        </section>

        {/* Cookies */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Cookie className="w-6 h-6 text-gray-600" />
            8.
            Cookies
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>We may use cookies or similar technologies to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Improve website performance</li>
              <li>Understand usage patterns</li>
            </ul>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
              <p className="text-gray-700">
                You can control cookies through your browser settings.
              </p>
            </div>
          </div>
        </section>

        {/* Changes to This Policy */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            9.
            Changes to This Policy
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              We may update this Privacy Policy from time to time.
            </p>
            <p>
              Any changes will be posted on this page with an updated effective date.
            </p>
          </div>
        </section>

        {/* Contact Us */}
        <section className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            10.
            Contact Us
          </h2>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
            <p className="text-gray-700 mb-2">
              If you have questions about this Privacy Policy, contact:
            </p>
            <div className="space-y-2">
              <p className="text-xl font-bold text-emerald-700">Digital A-Game</p>
              <p className="text-gray-600">Email: [thedigitalagame@gmail.com]</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            This Privacy Policy was last updated on Jan 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;