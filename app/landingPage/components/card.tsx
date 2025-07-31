"use client";

import { ReactNode, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Heading2 from "@/components/typography/Heading2";

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  buttonColor?: string;
  iconBgColor?: string;
}

export default function Card({
  icon,
  title,
  description,
  buttonLabel,
  buttonHref,
  buttonColor = "bg-blue-500",
  iconBgColor = "bg-blue-100",
}: CardProps) {
  const [hovered, setHovered] = useState(false);

  const borderColor =
    buttonColor === "bg-[#0EA5E9]" ? "border-t-[#0EA5E9]" : "border-t-[#22C55E]";

  return (
    <Link
      href={buttonHref}
      className={`group block transition-all duration-200 w-full max-w-lg rounded-xl shadow-md bg-white p-6 text-center border-t-4 ${
        hovered ? borderColor : "border-t-transparent"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-center mb-7">
            <div className={`rounded-full p-4 ${iconBgColor}`}>{icon}</div>
          </div>
          <Heading2>{title}</Heading2>
          <p className="text-gray-500 text-lg mt-7">{description}</p>
        </div>
        <div className="mt-7">
          <div
            className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-white text-lg font-medium ${buttonColor} group-hover:brightness-95`}
          >
            {buttonLabel} <ArrowRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
