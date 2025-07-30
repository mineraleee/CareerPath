"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./components/card";

interface Career {
  career_id: string;
  career_name: string;
  category: string;
}

export default function ChooseCareer() {
  const [careers, setCareers] = useState<Career[]>([]);

  useEffect(() => {
    axios
      .get("https://career-path-api.onrender.com/api/careers")
      .then((res) => {
        setCareers(res.data.careers);
      })
      .catch((err) => {
        console.error("Error fetching careers:", err);
      });
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {careers.length > 0 ? (
        <Card
          careers={careers}
          onSelect={(careerId) => console.log("Selected career:", careerId)}
        />
      ) : (
        <p>Loading careers...</p>
      )}
    </div>
  );
}
