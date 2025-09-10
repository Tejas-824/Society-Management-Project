import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FaCreditCard, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Payment = ({ onPaymentSuccess }) => {
  const [searchParams] = useSearchParams();
  const billId = searchParams.get("billId");
  const amount = searchParams.get("amount");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleFakePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/bills/${billId}/pay`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          setStatus("success");
          onPaymentSuccess && onPaymentSuccess();
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("failed");
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          💳 Online Payment
        </h1>

        <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
          <p className="text-gray-600">
            <span className="font-semibold">Bill ID:</span> {billId}
          </p>
          <p className="text-gray-800 text-lg mt-2">
            <span className="font-semibold">Amount Due:</span>{" "}
            <span className="text-green-600 font-bold text-xl">₹{amount}</span>
          </p>
        </div>

        {/* show fake form if no status */}
        {status === null && (
          <form onSubmit={handleFakePayment} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Expiry
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="123"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : <> <FaCreditCard /> Pay ₹{amount} </>}
            </button>
          </form>
        )}

        {/* success / fail screens */}
        {status === "success" && (
          <div className="text-center mt-6">
            <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
            <p className="text-lg font-semibold text-green-600">
              Payment Successful 🎉
            </p>
          </div>
        )}
        {status === "failed" && (
          <div className="text-center mt-6">
            <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-3" />
            <p className="text-lg font-semibold text-red-600">
              Payment Failed ❌
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
