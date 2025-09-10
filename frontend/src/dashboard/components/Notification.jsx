import { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    message: '',
    date: '',
    priority: 'Low',
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications"); 
        setNotifications(res.data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/notifications", formData);
      setNotifications((prev) => [...prev, res.data]); 
      setFormData({
        title: '',
        category: '',
        message: '',
        date: '',
        priority: 'Low',
      });
    } catch (err) {
      console.error("Error adding notification:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Society Notification Management</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">Notification Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., Diwali Celebration"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Festival">Festival</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Security">Security</option>
            <option value="Event">Event</option>
            <option value="General">General</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
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
          <label className="block text-sm font-medium mb-1" htmlFor="priority">Priority</label>
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
          <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            rows="4"
            placeholder="e.g., Join us for Diwali celebrations on Nov 10th at the clubhouse!"
            required
          />
        </div>
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 bg-gray-800 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Send Notification
          </button>
        </div>
      </form>

      {/* Table */}
      {notifications.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full border border-gray-300 text-sm rounded-md bg-gray-50">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {['Title', 'Category', 'Message', 'Date', 'Priority'].map((head, idx) => (
                  <th key={idx} className="px-3 py-2 border border-gray-300">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {notifications.map((n) => (
                <tr key={n._id || n.id} className="text-center">
                  <td className="border border-gray-300 p-2">{n.title}</td>
                  <td className="border border-gray-300 p-2">{n.category}</td>
                  <td className="border border-gray-300 p-2">{n.message}</td>
                  <td className="border border-gray-300 p-2">{new Date(n.date).toLocaleDateString()}</td>
                  <td
                    className="border border-gray-300 p-2 font-medium"
                    style={{
                      color: n.priority === 'High' ? '#DC2626' : n.priority === 'Medium' ? '#D97706' : '#16A34A',
                    }}
                  >
                    {n.priority}
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

export default Notification;
