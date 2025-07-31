"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/app/landingPage/components/navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://career-path-api.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to login");
      }

      const data = await res.json();
      const user = data.user;
      const token = data.token;

      // Simpan token & user di localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      // Cek jika career dan assessment masih kosong (null)
      const career = user?.career;
      const answers = user?.assessmentAnswers;

      if (!career || !answers) {
        router.push("/landingPage");
      } else {
        router.push("/dashboard");
      }

    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] transition-colors">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6">
          <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
            Login to your account
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
