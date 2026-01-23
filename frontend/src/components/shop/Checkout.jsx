import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { initiatePayment } from "../../services/paystack";

const CheckoutButton = ({ productIds }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    const savedEmail = localStorage.getItem("shopEmail");
    let email = savedEmail;

    if (!email) {
      email = prompt("Enter your email to receive access:");
      if (!email || !email.includes("@")) {
        alert("Please enter a valid email address");
        return;
      }
      localStorage.setItem("shopEmail", email);
    }

    setIsLoading(true);
    try {
      localStorage.setItem("productIds", JSON.stringify(productIds));
      await initiatePayment(email, productIds);
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white justify-center font-medium rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
    >
      <ShoppingBag className="w-5 h-5" />
      {isLoading ? "Processing..." : "Buy Now"}
    </button>
  );
};

export default CheckoutButton;