import { useState } from 'react';

const Maintenance = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    message: '',
    date: '',
    priority: 'Low',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can send the request to backend instead of storing locally
    console.log("Maintenance/Miscellaneous Request Submitted:", formData);

    setFormData({
      title: '',
      category: '',
      message: '',
      date: '',
      priority: 'Low',
    });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Maintenance & Miscellaneous Requests
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="title"
          >
            Request Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., Water Leakage Repair"
            required
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="category"
          >
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
            <option value="" disabled>Select Category</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="date"
          >
            Preferred Date
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
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="priority"
          >
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
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="message"
          >
            Description
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            rows="4"
            placeholder="e.g., Water is leaking from the bathroom sink. Please fix it as soon as possible."
            required
          />
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 bg-gray-800 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default Maintenance;
