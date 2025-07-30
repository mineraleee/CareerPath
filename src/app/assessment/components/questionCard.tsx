"use client";

import React from "react";
interface QuestionCardProps {
  question: string;
  options: string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

export default function QuestionCard({
  question,
  options,
  selected,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-3xl">
      <h2 className="text-2xl mb-6 text-gray-800">{question}</h2>
      <div className="space-y-4">
        {options.map((option, idx) => (
          <label
            key={idx}
            className={`block p-5 border rounded-lg cursor-pointer transition-all duration-200 text-left ${
              selected === option
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-300"
            }`}
          >
            <input
              type="radio"
              name="option"
              value={option}
              checked={selected === option}
              onChange={() => onSelect(option)}
              className="mr-3"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}