import { useState, useEffect } from 'react';
import axios from 'axios';

const LatePayment = () => {
  const [formData, setFormData] = useState({
    name: '',
    flatNumber: '',
    amount: '',
    dueDate: '',
    status: 'Pending',
    remarks: '',
  });

  const [fines, setFines] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:5000/api/late-fines")
      .then(res => setFines(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/late-fines", formData);
     setFines(prev => [...prev, res.data]); 
      setFormData({
        name: '',
    flatNumber: '',
    amount: '',
    dueDate: '',
    status: 'Pending',
    remarks: '',
      });
    } catch (err) {
      console.error("Error submitting Late fine payments:", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Late Payment Fine Management</h2>

      {/* Fine Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Resident Name</label>
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
          <label className="block text-sm font-medium mb-1" htmlFor="amount">Fine Amount (₹)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
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

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="status">Payment Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="remarks">Remarks</label>
          <input
            type="text"
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="mt-4 bg-gray-800 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition"
          >
            Submit Fine
          </button>
        </div>
      </form>

      {/* Fines Table */}
      {fines.length > 0 && (
        <div className="overflow-x-auto mt-10">
          <table className="w-full border border-gray-300 text-sm rounded-md bg-gray-50">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                {['Name', 'Flat No', 'Amount (₹)', 'Due Date', 'Status', 'Remarks'].map((head, idx) => (
                  <th key={idx} className="px-3 py-2 border border-gray-300">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fines.map((fine, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{fine.name}</td>
                  <td className="border border-gray-300 p-2">{fine.flatNumber}</td>
                  <td className="border border-gray-300 p-2">₹{fine.amount}</td>
                  <td className="border border-gray-300 p-2">{fine.dueDate}</td>
                  <td className={`border border-gray-300 p-2 font-medium ${fine.status === 'Paid' ? 'text-green-600' : 'text-red-600'}`}>
                    {fine.status}
                  </td>
                  <td className="border border-gray-300 p-2">{fine.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatePayment;
