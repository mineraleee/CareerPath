"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/app/landingPage/components/navbar";
import Image from "next/image";
import Heading2 from "@/components/typography/Heading2";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://career-path-api.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // Simpan token
      localStorage.setItem("access_token", data.access_token);
      const meRes = await fetch("https://career-path-api.onrender.com/api/auth/me", {
        headers: {
            Authorization: `Bearer ${data.access_token}`,
        },
        });
        const meData = await meRes.json();

        localStorage.setItem("user_id", meData.id.toString());

      router.push("/landingPage");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0F172A] transition-colors">
      <Navbar />
      <main className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-md rounded-xl p-8 space-y-6">
          <div className="mb-2">
            <div className="flex items-center gap-3 justify-center">
              <Image
                className="dark:invert"
                src="/register.png"
                alt="register logo"
                width={40}
                height={40}
                priority
              />
              <Heading2>Sister in Tech</Heading2>
            </div>
            <div className="flex justify-center mt-3">
              <Heading2>Log in to your account</Heading2>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="text-sm text-red-500 text-center">{error}</div>
            )}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
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
