'use client';

import React from 'react';
import { Star, Clock, Layers } from 'lucide-react';

interface Course {
  course_id: string;
  title: string;
  organization: string;
  rating: number;
  review_count: number;
  difficulty: string;
  course_type: string;
  duration: string;
  skills: string[];
  url: string;
  is_free: boolean;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="h-36 bg-gradient-to-r from-[#0EA5E9] to-[#6366F1] flex items-center justify-center text-white text-xl font-semibold">
        U/X
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center text-sm text-yellow-500 font-medium">
          <Star className="h-4 w-4 fill-yellow-400 mr-1" />
          {course.rating.toFixed(1)} <span className="text-gray-500 ml-1">({course.review_count.toLocaleString()} reviews)</span>
        </div>

        <h2 className="text-base font-semibold text-gray-800">{course.title}</h2>

        <p className="text-sm text-gray-600">
          A comprehensive course covering all aspects of {course.title.split(' ')[0]} from fundamentals to advanced techniques.
        </p>

        <div className="flex justify-between items-center text-sm text-gray-700 font-medium mt-1">
          <span>{course.organization}</span>
          <span>{course.is_free ? 'Free' : `$${(Math.random() * 100 + 19).toFixed(2)}`}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Layers className="w-4 h-4" />
            {course.difficulty}
          </div>
        </div>

        <a
          href={`https://www.coursera.org${course.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-[#0EA5E9] hover:bg-[#0284C7] text-white text-sm font-medium py-2 rounded-md text-center"
        >
          View Course
        </a>
      </div>
    </div>
  );
}
