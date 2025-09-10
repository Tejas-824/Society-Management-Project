import { useState, useEffect } from 'react';
import axios from 'axios';

const WaterBill = () => {
  const [formData, setFormData] = useState({
    name: '',
    flatNumber: '',
    month: '',
    amount: '',
    date: '',
    status: 'Unpaid',
  });

  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/water-bill")
    .then(res => setBills(res.data))
    .catch(err => console.error(err))
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
    const res = await axios.post("http://localhost:5000/api/water-bill", formData);
      setBills(prev => [...prev, res.data]);
      setFormData({
    name: '',
    flatNumber: '',
    billAmount: '',
    dueDate: '',
    paymentStatus: 'Unpaid',
      });
    } catch (err) {
     console.log("Error submitting water bill:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Water Bill Management</h2>

      {/* Water Bill Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="flatNumber">Flat Number</label>
          <input
            type="text"
            id="flatNumber"
            name="flatNumber"
            value={formData.flatNumber}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="month">Month</label>
          <input
            type="text"
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., January, February"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="e.g., 500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="date">Due Date</label>
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

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 bg-gray-800 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Add Water Bill
          </button>
        </div>
      </form>

      {/* Table */}
      {bills.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full border border-gray-300 text-sm rounded-md bg-gray-50">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {['Name', 'Flat No', 'Month', 'Amount', 'Due Date', 'Status'].map((head, idx) => (
                  <th key={idx} className="px-3 py-2 border border-gray-300">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bills.map((b, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{b.name}</td>
                  <td className="border border-gray-300 p-2">{b.flatNumber}</td>
                  <td className="border border-gray-300 p-2">{b.month}</td>
                  <td className="border border-gray-300 p-2">{b.amount}</td>
                  <td className="border border-gray-300 p-2">{b.date}</td>
                  <td className="border border-gray-300 p-2 text-red-600 font-medium">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WaterBill;
