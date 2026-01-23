import { FileText, BookOpen, CreditCard, Lock, Shield, AlertCircle, Link as LinkIcon, Scale, Mail } from "lucide-react";
import { useEffect } from "react";

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }
    , []);
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100 mb-4">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">Legal Terms</span>
        </div>
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-4">
          Terms of Service
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FileText className="w-2 h-2" />
            <span>Effective Date: Jan 2025</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-2 h-2" />
            <span>Last Updated: Jan 2026</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 space-y-8">
        {/* Acceptance of Terms */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            1.
            Acceptance of Terms
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              By accessing or using <strong>Digital A-Game</strong>, you agree to these Terms of Service.
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <p className="text-yellow-800 font-medium flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                If you do not agree, do not use the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Services Provided */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-gray-600" />
            2.
            Services Provided
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              <strong>Digital A-Game</strong> provides:
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Digital products</p>
                <p className="text-sm text-gray-500">(tools, guides, bundles)</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Educational resources</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Consulting sessions</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-900">Content & insights</p>
                <p className="text-sm text-gray-500">(digital literacy, systems, AI)</p>
              </div>
            </div>
            <p className="pt-2">
              Services may change or evolve over time.
            </p>
          </div>
        </section>

        {/* Digital Products & Delivery */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            3.
            Digital Products & Delivery
          </h2>
          <div className="space-y-4 text-gray-600">
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500">•</span>
                  <span>All digital products are delivered electronically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>Access is provided via email and/or dashboard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>No physical goods are shipped</span>
                </li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="text-red-700 font-medium">
                Once delivered, digital products are considered consumed.
              </p>
            </div>
          </div>
        </section>

        {/* Payments & Refunds */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-gray-600" />
            4.
            Payments & Refunds
          </h2>
          <div className="space-y-4 text-gray-600">
            <div className="space-y-2">
              <p className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>Prices are listed clearly before checkout</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>Payments are processed securely via third-party providers</span>
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-800 mb-2">Refund Policy</h3>
              <p className="text-yellow-700">
                All sales are final.
              </p>
              <p className="text-yellow-700 mt-1">
                Due to the nature of digital products, we do not offer refunds once access is granted.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Exceptions</h3>
              <p className="text-blue-700">
                Exceptions may be made only in cases of:
              </p>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-blue-700">
                <li>Duplicate payment</li>
                <li>Technical failure preventing access</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lock className="w-6 h-6 text-gray-600" />
            5.
            Intellectual Property
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              All content on <strong>Digital A-Game</strong>, including:
            </p>
            <div className="grid md:grid-cols-2 gap-2 mb-4">
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">Digital products</span>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">Text, graphics, logos</span>
              <span className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm">Templates and systems</span>
            </div>
            <p>
              Is owned by <strong>Digital A-Game</strong> or licensed to us.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                <h3 className="font-semibold text-emerald-800 mb-2">You May</h3>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span>Use purchased products for personal or internal business use</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">You May Not</h3>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Resell</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Redistribute</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Share</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">✗</span>
                    <span>Claim ownership</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* User Responsibilities */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            6.
            User Responsibilities
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>You agree not to:</p>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Use the platform for illegal purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Attempt to gain unauthorized access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Abuse or exploit digital products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Share access or download links unlawfully</span>
                </li>
              </ul>
            </div>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                Violation may result in loss of access without refund.
              </p>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Scale className="w-6 h-6 text-gray-600" />
            7.
            Limitation of Liability
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>Digital A-Game</strong> is not responsible for:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-gray-500">•</span>
                  <span>Business losses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500">•</span>
                  <span>Missed opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500">•</span>
                  <span>Misuse of digital products</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-500">•</span>
                  <span>Decisions made based on provided content</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                All products and services are provided "as is".
              </p>
            </div>
          </div>
        </section>

        {/* Third-Party Links & Tools */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <LinkIcon className="w-6 h-6 text-gray-600" />
            8.
            Third-Party Links & Tools
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              We may link to third-party platforms or tools.
            </p>
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <p className="text-yellow-800 font-medium">
                We are not responsible for their content, policies, or practices.
              </p>
            </div>
          </div>
        </section>

        {/* Termination */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            9.
            Termination
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              We reserve the right to suspend or terminate access if:
            </p>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>These terms are violated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500">•</span>
                  <span>Fraud or abuse is detected</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Governing Law */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            10.
            Governing Law
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              These Terms shall be governed by the laws of <strong>Kenya</strong>.
            </p>
          </div>
        </section>

        {/* Changes to Terms */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            11.
            Changes to Terms
          </h2>
          <div className="space-y-3 text-gray-600">
            <p>
              We may update these Terms periodically.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-blue-800 font-medium">
                Continued use of the platform means you accept the updated terms.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="pt-8 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-gray-600" />
            12.
            Contact Information
          </h2>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6">
            <p className="text-gray-700 mb-2">
              For questions regarding these Terms:
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
            These Terms of Service were last updated on Jan 2026
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;