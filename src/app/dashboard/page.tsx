"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CareerSummary from "./components/CareerSummary";
import CourseCard from "./components/CourseCard";

interface RecommendationResponse {
  recommended_career: string;
  description: string;
  average_salary: string;
  job_growth: string;
  match_score: number;
  learning_path: {
    step: number;
    title: string;
    status: "Completed" | "In Progress" | "Pending";
  }[];
  recommended_courses: {
    title: string;
    description: string;
    price: string;
    duration: string;
    level: string;
    rating: number;
    total_reviews: number;
  }[];
}

export default function DashboardPage() {
  const [data, setData] = useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi user_id tetap
    const payload = {
      user_id: "user123"
    };

    axios
      .post("https://career-path-api.onrender.com/api/assess-career", payload)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recommendation:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading your career recommendation...</div>;
  }

  if (!data) {
    return <div className="text-center p-10 text-red-500">Failed to load recommendation data.</div>;
  }

  return (
    <div className="p-6 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Your recommended career is:{" "}
        <span className="text-blue-600">{data.recommended_career}</span>
      </h1>
      <p className="text-gray-600 mb-6 max-w-2xl">{data.description}</p>

      <CareerSummary
        salary={data.average_salary}
        growth={data.job_growth}
        score={data.match_score}
      />

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Learning Roadmap</h2>
        <ol className="space-y-4">
          {data.learning_path.map((step) => (
            <li key={step.step} className="p-4 rounded border bg-white shadow-sm flex justify-between">
              <span>{step.step}. {step.title}</span>
              <span className={`text-sm font-medium ${getStatusColor(step.status)}`}>{step.status}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommended Courses & Certifications</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.recommended_courses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "text-green-600";
    case "In Progress":
      return "text-yellow-600";
    default:
      return "text-gray-500";
  }
}