import { useState, useEffect } from "react";
import axios from "axios";

const FundCollection = () => {
  const [formData, setFormData] = useState({
    memberName: "",
    flatNo: "",
    amount: "",
    category: "",
    date: "",
    paymentMethod: "Cash",
    status: "Paid",
  });

  const [funds, setFunds] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/fund-collection")
      .then((res) => setFunds(res.data))
      .catch((err) => console.error("Error fetching funds:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/fund-collection", formData);
      setFunds((prev) => [...prev, res.data]);
      setFormData({
        memberName: "",
        flatNo: "",
        amount: "",
        category: "",
        date: "",
        paymentMethod: "Cash",
        status: "Paid",
      });
    } catch (err) {
      console.error("Error submitting fund contribution:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Society Fund Collection Management
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="memberName">
            Member Name
          </label>
          <input
            type="text"
            id="memberName"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., Ramesh Kumar"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="flatNo">
            Flat / Block No.
          </label>
          <input
            type="text"
            id="flatNo"
            name="flatNo"
            value={formData.flatNo}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., A-302"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="amount">
            Contribution Amount (₹)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., 1500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Purpose / Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Maintenance">Maintenance</option>
            <option value="Festival">Festival</option>
            <option value="Repair">Repair</option>
            <option value="Security">Security</option>
            <option value="General">General</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 bg-gray-800 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Add Contribution
          </button>
        </div>
      </form>

      {/* Fund Records Table */}
      {funds.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full border border-gray-300 text-sm rounded-md bg-gray-50">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {[
                  "Member",
                  "Flat No.",
                  "Amount (₹)",
                  "Category",
                  "Date",
                  "Payment Method",
                  "Status",
                ].map((head, idx) => (
                  <th key={idx} className="px-3 py-2 border border-gray-300">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {funds.map((f) => (
                <tr key={f._id || f.id} className="text-center">
                  <td className="border border-gray-300 p-2">{f.memberName}</td>
                  <td className="border border-gray-300 p-2">{f.flatNo}</td>
                  <td className="border border-gray-300 p-2 font-medium">₹{f.amount}</td>
                  <td className="border border-gray-300 p-2">{f.category}</td>
                  <td className="border border-gray-300 p-2">
                    {new Date(f.date).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 p-2">{f.paymentMethod}</td>
                  <td
                    className="border border-gray-300 p-2 font-semibold"
                    style={{
                      color: f.status === "Paid" ? "#16A34A" : "#DC2626",
                    }}
                  >
                    {f.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FundCollection;
