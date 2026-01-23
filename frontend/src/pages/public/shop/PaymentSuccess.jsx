import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, XCircle, Loader2, Download, Mail } from "lucide-react";
import api from "../../../services/api";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const reference = params.get("reference");
  const [status, setStatus] = useState("verifying");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await api.get(`/payments/verify?reference=${reference}`);
        setOrderDetails(response.data);
        setStatus("success");
      } catch (error) {
        setStatus("failed");
      }
    };

    if (reference) {
      verifyPayment();
    }
  }, [reference]);

  if (status === "verifying") {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Verifying Payment</h3>
        <p className="text-gray-600">Please wait while we confirm your payment...</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Verification Failed</h3>
        <p className="text-gray-600 mb-6">We couldn't verify your payment. Please contact support.</p>
        <Link
          to="/contact"
          className="inline-block px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Details */}
        {orderDetails && (
          <div className="bg-gray-50 rounded-lg p-5 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Order Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Reference</span>
                <span className="font-medium">{reference}</span>
              </div>
              {orderDetails.email && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">{orderDetails.email}</span>
                </div>
              )}
              {orderDetails.amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid</span>
                  <span className="font-medium">
                    KES {orderDetails.amount.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-gray-900">What's Next?</h3>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
            <p className="text-gray-700">
              Your products have been sent to your email address. Check your inbox (and spam folder) for download links.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Products
          </a>
          <Link
            to="/shop"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Support Note */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Need help? <a href="/contact" className="text-emerald-600 hover:text-emerald-700">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;