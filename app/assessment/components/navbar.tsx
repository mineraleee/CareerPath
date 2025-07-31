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
          src="/assessment.png"
          alt="Assessment logo"
          width={250}
          height={38}
          priority
        />

        <div className="flex items-center gap-4">
          <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
            <Moon className="w-6 h-6 text-gray-600 fill-current" />
          </div>
        </div>
      </div>
    </nav>
  );
}
