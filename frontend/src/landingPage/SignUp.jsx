import { useState } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
          Create an Account
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full p-2.5 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2.5 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l text-gray-700 select-none">
                +91
              </span>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                maxLength={10}
                className="w-full p-2.5 border rounded-r border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-2.5 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full p-2.5 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <button
            type="button"
            className="w-full bg-blue-800 text-white py-2.5 rounded hover:bg-blue-900 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <span className="text-blue-700 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
