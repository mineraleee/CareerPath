"use client";

import Image from "next/image";
import { Moon, User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="bg-white border-b border-black/10">
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
          <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
            <Moon className="w-6 h-6 text-gray-600 fill-current" />
          </div>

          <div className="w-12 h-12 bg-[#0EA5E9] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white fill-current" />
          </div>
        </div>
      </div>
    </nav>
  );
}
