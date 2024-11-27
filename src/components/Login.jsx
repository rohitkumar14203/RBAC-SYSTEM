import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const availableAccounts = [
    { role: "Admin", email: "admin@example.com", password: "admin" },
    { role: "Editor", email: "editor@example.com", password: "editor" },
    { role: "Viewer", email: "viewer@example.com", password: "viewer" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login({ email, password });

    if (result === true) {
      navigate("/dashboard");
    } else if (result === "inactive") {
      alert("Your account is inactive. Please contact an administrator.");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Login to your account
        </h2>

        {/* Available Accounts Section */}
        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            Available Accounts
          </h3>
          {availableAccounts.map((account, index) => (
            <div key={index} className="text-sm text-gray-600 py-1">
              <span className="text-gray-800">{account.role}:</span>{" "}
              {account.email} / {account.password}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
