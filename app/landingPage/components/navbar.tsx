"use client";

import Image from "next/image";
import { Moon, User } from "lucide-react";

export function Navbar() {
  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-black/10 dark:border-white/10 transition-colors">
      <div className="flex justify-between items-center py-4 px-4 lg:px-6">
        {/* Logo */}
        <Image
          className="dark:invert"
          src="/logo.png"
          alt="App logo"
          width={200}
          height={38}
          priority
        />

        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <Moon className="w-6 h-6 text-gray-600 dark:text-white" />
          </button>

          <div className="w-12 h-12 bg-[#0EA5E9] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}
