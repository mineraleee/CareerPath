"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/card";
import { useRouter } from "next/navigation";

interface Career {
  career_id: string;
  career_name: string;
  category: string;
}

export default function ChooseCareer() {
  const [careers, setCareers] = useState<Career[]>([]);
  const router = useRouter();

  // Ambil daftar karier dan assessment dari localStorage
  useEffect(() => {
    const email = localStorage.getItem("email"); // disimpan saat register
    if (!email) {
      alert("Email tidak ditemukan. Silakan register terlebih dahulu.");
      router.push("/register");
      return;
    }

    const assessment = localStorage.getItem(`assessment_${email}`);
    if (!assessment) {
      alert("Silakan isi assessment terlebih dahulu.");
      router.push("/landingpage");
      return;
    }

    // Fetch daftar karier
    axios
      .get("https://career-path-api.onrender.com/api/careers")
      .then((res) => {
        setCareers(res.data.careers);
      })
      .catch((err) => {
        console.error("Gagal mengambil data karier:", err);
      });
  }, []);

  const handleCareerSelect = async (careerId: string) => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Email tidak ditemukan.");
      return;
    }

    const assessmentKey = `assessment_${email}`;
    const assessment = JSON.parse(localStorage.getItem(assessmentKey) || "{}");

    const resultKey = `result_${email}`;
    const finalResult = {
      ...assessment,
      selectedCareer: careerId,
    };

    localStorage.setItem(resultKey, JSON.stringify(finalResult));
    alert("Karier berhasil dipilih dan disimpan!");

    // Fetch courses by skills (jika perlu)
    try {
      const response = await axios.post(
        "https://career-path-api.onrender.com/api/courses/skills",
        {
          skills: assessment.skills || [],
        }
      );
      console.log("Courses fetched successfully:", response.data);
    } catch (error) {
      console.error("Gagal mengambil course berdasarkan skill:", error);
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {careers.length > 0 ? (
        <Card
          careers={careers}
          onSelect={(careerId) => {
            console.log("Selected career:", careerId);
            handleCareerSelect(careerId);
          }}
        />
      ) : (
        <p>Loading careers...</p>
      )}
    </div>
  );
}
