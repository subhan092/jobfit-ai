import React, { useState } from "react";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../utils/key";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ForgotPasswordUI.jsx
// Tailwind CSS required in your project (recommended with PostCSS or via CDN in simple pages)

export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const valid = password.length >= 6 && password === confirm;
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!valid) {
      setError("Passwords must match and be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {

        const res = await axios.post(`${USER_API_END_POINT}/forgot-password`, {

          password,
          email,
        });
        if (res.status === 200) {
          const data = res.data;
              // success state (you can replace with router push or toast)
      toast.success(data.message || "Password updated successfully.");
      setPassword("");
      setConfirm("");
      setEmail("");
      navigate('/login');
        }

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white shadow-2xl rounded-2xl p-8">
          {/* Top: small app icon + title (header uses serif font) */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
              {/* placeholder app icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h1 className="text-2xl font-serif">Reset Password</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-sans"
                    placeholder="enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-sans"
                  placeholder="New password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 font-sans"
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={!valid || loading}
              className={`w-full py-3 rounded-lg text-white font-medium ${valid && !loading ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-300 cursor-not-allowed"}`}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-4">Password must be at least 6 characters.</p>
        </div>
      </div>
    </div>
  );
}
