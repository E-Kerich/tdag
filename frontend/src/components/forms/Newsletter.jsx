import { useState } from "react";
import api from "../../services/api";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const subscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/subscribe", { email });
      setMessage("You're subscribed 🎉");
      setEmail("");
    } catch (err) {
      setMessage("Already subscribed or invalid email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Get the Latest Insights
        </h2>

        <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
          Join our newsletter for weekly digital strategy tips, AI insights, and practical tech advice.
        </p>

        <form onSubmit={subscribe} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          {message && (
            <p className="text-sm mt-3 text-emerald-600">{message}</p>
          )}

          <p className="text-sm text-gray-400 mt-3">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterCTA;
