"use client";

import { ReactNode } from "react";
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
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl shadow-[0_4px_6px_-1px_rgba(0.1,0.1,0,0.1)] p-6 w-full h-full max-w-lg text-center">
      <div >
        <div className="flex items-center justify-center mb-7">
          <div className={`rounded-full p-4 ${iconBgColor}`}>{icon}</div>
        </div>
        <Heading2>{title}</Heading2>
        <p className="text-gray-500 text-lg mt-7">{description}</p>
      </div>
      <div className="mt-7">
        <Link
          href={buttonHref}
          className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-white text-lg font-medium ${buttonColor}`}
        >
          {buttonLabel} <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
