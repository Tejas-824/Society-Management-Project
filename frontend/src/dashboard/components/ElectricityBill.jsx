import { useState, useEffect } from 'react';
import axios from 'axios';

const ElectricityBill = () => {
  const [formData, setFormData] = useState({
    name: '',
    flatNumber: '',
    billAmount: '',
    dueDate: '',
    paymentStatus: 'Unpaid',
  });

  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/electricity-bill")
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
      const res = await axios.post("http://localhost:5000/api/electricity-bill", formData);
      setBills(prev => [...prev, res.data]);
      setFormData({
    name: '',
    flatNumber: '',
    billAmount: '',
    dueDate: '',
    paymentStatus: 'Unpaid',
      });
    } catch (err) {
     console.log("Error submitting electricity bill:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Electricity Bill Management</h2>

      {/* Bill Form */}
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
          <label className="block text-sm font-medium mb-1" htmlFor="billAmount">Bill Amount (₹)</label>
          <input
            type="number"
            id="billAmount"
            name="billAmount"
            value={formData.billAmount}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
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
            Add Bill
          </button>
        </div>
      </form>

      {/* Table */}
      {bills.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full border border-gray-300 text-sm rounded-md bg-gray-50">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {['Name', 'Flat No', 'Bill Amount (₹)', 'Due Date', 'Payment Status'].map((head, idx) => (
                  <th key={idx} className="px-3 py-2 border border-gray-300">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bills.map((b, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{b.name}</td>
                  <td className="border border-gray-300 p-2">{b.flatNumber}</td>
                  <td className="border border-gray-300 p-2">₹{b.billAmount}</td>
                  <td className="border border-gray-300 p-2">{b.dueDate}</td>
                  <td className={`border border-gray-300 p-2 font-medium ${b.paymentStatus === 'Unpaid' ? 'text-red-600' : 'text-green-600'}`}>
                    {b.paymentStatus}
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

export default ElectricityBill;
