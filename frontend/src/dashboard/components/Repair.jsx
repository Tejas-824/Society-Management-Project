import { useState, useEffect } from "react";
import axios from "axios";

const Repairs = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    message: "",
    date: "",
    priority: "Low",
  });

  const [repairs, setRepairs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/repairs")
      .then((res) => setRepairs(res.data))
      .catch((err) => console.error("Error fetching repairs:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/repairs", formData);
      setRepairs((prev) => [res.data, ...prev]); 
      setFormData({
        title: "",
        category: "",
        message: "",
        date: "",
        priority: "Low",
      });
    } catch (err) {
      console.error("Error submitting repair:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Repairs</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Repair Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., Pipe Leakage"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Category
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
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Carpentry">Carpentry</option>
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
          <label className="block text-sm font-medium mb-1" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Description
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            rows="4"
            placeholder="e.g., Water is leaking from bathroom pipe."
            required
          />
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 bg-gray-800 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Submit Repair Request
          </button>
        </div>
      </form>

      {/* Table */}
      {repairs.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full border border-gray-300 text-sm rounded-md bg-gray-50">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {["Title", "Category", "Message", "Date", "Priority"].map(
                  (head, idx) => (
                    <th key={idx} className="px-3 py-2 border border-gray-300">
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {repairs.map((r) => (
                <tr key={r._id} className="text-center">
                  <td className="border border-gray-300 p-2">{r.title}</td>
                  <td className="border border-gray-300 p-2">{r.category}</td>
                  <td className="border border-gray-300 p-2">{r.message}</td>
                  <td className="border border-gray-300 p-2">{r.date}</td>
                  <td
                    className="border border-gray-300 p-2 font-medium"
                    style={{
                      color:
                        r.priority === "High"
                          ? "#DC2626"
                          : r.priority === "Medium"
                          ? "#D97706"
                          : "#16A34A",
                    }}
                  >
                    {r.priority}
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

export default Repairs;
