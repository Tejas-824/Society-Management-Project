import { useState, useEffect } from "react";
import axios from "axios";

const GuardSalary = () => {
  const [formData, setFormData] = useState({
    guardName: "",
    month: "",
    salaryAmount: "",
    paidDate: "",
    status: "Pending",
  });

  const [records, setRecords] = useState([]);

  // Fetch guard salary records on mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/guard-salary")
      .then((res) => setRecords(res.data))
      .catch((err) => console.error("Error fetching records:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/guard-salary",
        formData
      );
      setRecords((prev) => [...prev, res.data]); // add new record
      setFormData({
        guardName: "",
        month: "",
        salaryAmount: "",
        paidDate: "",
        status: "Pending",
      });
    } catch (err) {
      console.error("Error adding record:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Guard Salary Management
      </h2>

      {/* Salary Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="guardName">
            Guard Name
          </label>
          <input
            type="text"
            id="guardName"
            name="guardName"
            value={formData.guardName}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., Ramesh Kumar"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="month">
            Salary Month
          </label>
          <input
            type="month"
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="salaryAmount"
          >
            Salary Amount (₹)
          </label>
          <input
            type="number"
            id="salaryAmount"
            name="salaryAmount"
            value={formData.salaryAmount}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., 15000"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="paidDate">
            Paid Date
          </label>
          <input
            type="date"
            id="paidDate"
            name="paidDate"
            value={formData.paidDate}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">
            Payment Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 bg-gray-800 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Add Record
          </button>
        </div>
      </form>

      {/* Salary Records Table */}
      {records.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full border border-gray-300 text-sm rounded-md bg-gray-50">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {[
                  "Guard Name",
                  "Month",
                  "Salary (₹)",
                  "Paid Date",
                  "Status",
                ].map((head, idx) => (
                  <th key={idx} className="px-3 py-2 border border-gray-300">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((rec, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{rec.guardName}</td>
                  <td className="border border-gray-300 p-2">{rec.month}</td>
                  <td className="border border-gray-300 p-2">
                    ₹{rec.salaryAmount}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {rec.paidDate || "-"}
                  </td>
                  <td
                    className="border border-gray-300 p-2 font-medium"
                    style={{
                      color: rec.status === "Paid" ? "#16A34A" : "#DC2626",
                    }}
                  >
                    {rec.status}
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

export default GuardSalary;
