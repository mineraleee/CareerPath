"use client";

import { useEffect, useState } from "react";
import QuestionCard from "./components/questionCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Navbar } from "./components/navbar";

interface Question {
  question_id: number;
  question_text: string;
  options: string[];
}

export default function AssessmentPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://career-path-api.onrender.com/api/assessment/questions")
      .then((res) => {
        setQuestions(res.data.questions);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch questions:", err);
        setLoading(false);
      });
  }, []);

  const handleSelect = (value: string) => {
    setAnswers({ ...answers, [questions[current].question_id]: value });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");

      if (!user_id || !token) {
        console.error("User not logged in");
        return;
      }

      const payload = {
        user_id,
        answers: Object.entries(answers).map(([id, answer]) => ({
          question_id: Number(id),
          answer,
        })),
      };

      axios
        .post("https://career-path-api.onrender.com/api/assess-career", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("Assessment result:", res.data);
          router.push("/dashboard"); 
        })
        .catch((err) => {
          console.error("Submission failed:", err);
        });
    }
  };


  const handleBack = () => {
    if (current > 0) setCurrent(current - 1);
  };

  if (loading) return <div className="text-center p-10">Loading questions...</div>;
  if (questions.length === 0) return <div className="text-center p-10">No questions found.</div>;

  const progress = Math.round(((current + 1) / questions.length) * 100);

  return (
    <div>
      <Navbar/>
      <div className="flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
        <div className="w-full max-w-4xl mb-5 text-gray-500 text-sm flex justify-between items-center">
          <div>Question {current + 1} of {questions.length}</div>
          <div>{progress}% Complete</div>
        </div>
        <div className="w-full max-w-4xl h-2 bg-gray-200 rounded-full mb-8">
          <div className="h-full bg-[#6366F1] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>

        <QuestionCard
          question={questions[current].question_text}
          options={questions[current].options}
          selected={answers[questions[current].question_id] || null}
          onSelect={handleSelect}
        />

        <div className="flex justify-between items-center mt-8 w-full max-w-4xl">
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            ← Back
          </button>
          <p className="text-center text-sm lg:text-md text-gray-500">
            Your answers help us tailor career recommendations specifically for you!
          </p>
          <button
            onClick={handleNext}
            disabled={!answers[questions[current].question_id]}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
              answers[questions[current].question_id]
                ? "bg-[#4F46E5] hover:bg-[#4338CA]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {current === questions.length - 1 ? "Submit" : "Next →"}
          </button>
        </div>

      </div>
    </div>
    
  );
}
