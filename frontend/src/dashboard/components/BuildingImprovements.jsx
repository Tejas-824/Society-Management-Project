import { useState, useEffect } from "react";
import axios from "axios";

const BuildingImprovements = () => {
  const [formData, setFormData] = useState({
    improvementTitle: "",
    description: "",
    estimatedCost: "",
    startDate: "",
    completionDate: "",
    status: "Planned",
  });

  const [improvements, setImprovements] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/building-improvements")
      .then((res) => setImprovements(res.data))
      .catch((err) => console.error("Error fetching improvements:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/building-improvements", formData);
      setImprovements((prev) => [...prev, res.data]);
      setFormData({
        improvementTitle: "",
        description: "",
        estimatedCost: "",
        startDate: "",
        completionDate: "",
        status: "Planned",
      });
    } catch (err) {
      console.error("Error submitting improvement:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Building Improvements & Renovations
      </h2>

      {/* Improvement Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="improvementTitle">
            Improvement Title
          </label>
          <input
            type="text"
            id="improvementTitle"
            name="improvementTitle"
            value={formData.improvementTitle}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., Lift Renovation"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="estimatedCost">
            Estimated Cost (₹)
          </label>
          <input
            type="number"
            id="estimatedCost"
            name="estimatedCost"
            value={formData.estimatedCost}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., 50000"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            rows="4"
            placeholder="e.g., Painting of the main building and repairing cracks"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="completionDate">
            Expected Completion Date
          </label>
          <input
            type="date"
            id="completionDate"
            name="completionDate"
            value={formData.completionDate}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
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
            <option value="Planned">Planned</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 bg-gray-800 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Add Improvement
          </button>
        </div>
      </form>

      {/* Improvements Table */}
      {improvements.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full border border-gray-300 text-sm rounded-md bg-gray-50">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {[
                  "Title",
                  "Description",
                  "Cost (₹)",
                  "Start Date",
                  "Completion Date",
                  "Status",
                ].map((head, idx) => (
                  <th key={idx} className="px-3 py-2 border border-gray-300">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {improvements.map((imp) => (
                <tr key={imp._id || imp.id} className="text-center">
                  <td className="border border-gray-300 p-2">{imp.improvementTitle}</td>
                  <td className="border border-gray-300 p-2">{imp.description}</td>
                  <td className="border border-gray-300 p-2 font-medium">₹{imp.estimatedCost}</td>
                  <td className="border border-gray-300 p-2">{imp.startDate}</td>
                  <td className="border border-gray-300 p-2">{imp.completionDate}</td>
                  <td
                    className="border border-gray-300 p-2 font-semibold"
                    style={{
                      color:
                        imp.status === "Completed"
                          ? "#16A34A"
                          : imp.status === "Ongoing"
                          ? "#D97706"
                          : "#2563EB",
                    }}
                  >
                    {imp.status}
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

export default BuildingImprovements;
