"use client";

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 text-sm text-gray-500">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2 py-4 px-4 lg:px-10">
        <div>©2025 CareerPath. All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}
