import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-800">
          Login
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div className="text-center">
            <span className="text-sm text-blue-700 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          <button
            type="button"
            className="w-full bg-blue-800 text-white py-3 rounded hover:bg-blue-900 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button
          className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Sign in with Google
          </span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-700 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
