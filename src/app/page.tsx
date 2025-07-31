"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Heading2 from "@/components/typography/Heading2";
import Image from "next/image";

const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  full_name: z.string().min(3, { message: "Full name must be at least 3 characters." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    const formData = {
      email,
      full_name: fullName,
      password,
    };

    const parsed = registerSchema.safeParse(formData);

    if (!parsed.success) {
        const errors: { [key: string]: string } = {};
        parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
            errors[field] = issue.message;
        }
        });
        setFieldErrors(errors);
        return;
    }

    try {
      const response = await fetch("https://career-path-api.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      router.push("/login");
    } catch (err: any) {
      setFieldErrors({ general: err.message || "Failed to register" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <div className="mb-5">
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
            <Heading2>Create your account</Heading2>
          </div>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mt-1"
          />
          {fieldErrors.full_name && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.full_name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mt-1"
          />
          {fieldErrors.email && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md mt-1"
          />
          <p className="text-gray-500 text-sm mt-1">Must be at least 8 characters</p>
          {fieldErrors.password && (
            <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
          )}
        </div>

        {/* General error */}
        {fieldErrors.general && (
          <p className="text-red-500 text-sm mb-4">{fieldErrors.general}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold"
        >
          Sign Up
        </button>
        <div className="pt-5 flex justify-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
