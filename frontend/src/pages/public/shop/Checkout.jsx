import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../services/api";

const Checkout = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const { state } = useLocation();
  const productIds = state?.productIds || [];

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    setLoading(true);
    
    const res = await api.post("/payments/initialize", {
      email,
      productIds
    });

    window.location.href = res.data.authorization_url;
  };

  if (!productIds.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-600">No product selected</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Purchase</h2>
          <p className="text-gray-600">Enter your email to proceed to payment</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
            disabled={loading}
          />
        </div>

        <button
          onClick={startPayment}
          disabled={loading || !email.trim()}
          className="w-full bg-emerald-600 text-white font-semibold py-3.5 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Redirecting to Payment..." : "Proceed to Payment"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Secure payment powered by Paystack
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;