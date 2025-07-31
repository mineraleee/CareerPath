"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CareerSummary from "./components/CareerSummary";
import CourseCard from "./components/CourseCard";
import { Navbar } from "./career/components/navbar";

interface Course {
  course_id: string;
  title: string;
  organization: string;
  rating: number;
  difficulty: string;
  duration: string;
  skills: string[];
  is_free: boolean;
}

interface ApiResponse {
  status: string;
  assessment_summary: {
    questions_answered: number;
    required_questions_answered: number;
    assessment_completeness: number;
  };
  career_recommendation: {
    career_id: string;
    career_name: string;
    match_percentage: number;
    description: string;
    key_skills_mentioned: string[];
    related_qa_count: number;
  };
  course_recommendations: Course[];
  confidence_score: number;
  alternatives: {
    career_id: string;
    career_name: string;
    match_percentage: number;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("access_token");
    const storedAnswers = localStorage.getItem("answers");

    if (!user_id || !token || !storedAnswers) {
      console.error("Missing user_id, token, or answers");
      return;
    }

    const payload = {
      user_id,
      answers: JSON.parse(storedAnswers),
    };

    axios
      .post("https://career-path-api.onrender.com/api/assess-career", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recommendation:", err.response?.data || err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading your career recommendation...</div>;
  }

  if (!data) {
    return <div className="text-center p-10 text-red-500">Failed to load recommendation data.</div>;
  }

  const recommendation = data.career_recommendation;

  return (
    <div>
      <Navbar/>
      <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Your recommended career is:{" "}
          <span className="text-[#0EA5E9]">{recommendation.career_name}</span>
        </h1>
        <p className="text-gray-600 mb-6 max-w-2xl">{recommendation.description}</p>

        <CareerSummary
          salary="—"
          growth="—"
          score={recommendation.match_percentage}
        />

        {/* Optional: key skills */}
        <section className="mt-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">Key Skills</h2>
          <ul className="flex flex-wrap gap-2">
            {recommendation.key_skills_mentioned.map((skill, idx) => (
              <li
                key={idx}
                className="bg-blue-100 text-[#0EA5E9] px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommended Courses</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.course_recommendations.map((course) => (
              <CourseCard key={course.course_id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
    
  );
}
