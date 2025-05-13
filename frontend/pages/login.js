import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { UserContext } from "../components/UserContext";
// ...inside component...


import { Mail, Lock, LogIn, AlertCircle } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const navigate = useRouter();
  
  // ...inside component...
  const { setUser } = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (data.token) {
        // Store the token if successful login
        // Add this line
        const userWithToken = { ...data.user, token: data.token };
        localStorage.setItem("user", JSON.stringify(userWithToken)); 
        setUser(userWithToken); 
        router.push(`/profile/${data.user.id}`); // Redirect to the profile page with user ID
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow bg-gray-50">
        <div className="max-w-md mx-auto pt-10 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Top banner */}
            <div className="bg-green-900 px-6 py-8 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-green-800 mb-4">
                <LogIn className="h-8 w-8 text-green-200" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Welcome Back
              </h2>
              <p className="text-green-200">
                Sign in to your Barter Circle account
              </p>
            </div>

            {/* Form section */}
            <div className="px-6 py-8">
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm py-3 border"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="•••••••••••"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm py-3 border"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </button>
                </div>
              </div>
            </div>

            {/* Form footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-sm">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-green-600 hover:text-green-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
