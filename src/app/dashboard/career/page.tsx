'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import CourseCard from '../CourseCard';
import { Navbar } from './components/navbar';

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

interface Checkpoint {
  checkpoint_id: number;
  title: string;
  description: string;
  skills_derived: string[];
  estimated_time: string;
  is_completed: boolean;
  skills_source: string;
}

interface RoadmapResponse {
  status: string;
  career_info: {
    career_id: string;
    career_name: string;
    description: string;
    qa_count: number;
  };
  roadmap: {
    total_checkpoints: number;
    estimated_duration: string;
    checkpoints: Checkpoint[];
  };
}

export default function CareerCoursePage() {
  const searchParams = useSearchParams();
  const careerId = searchParams.get('id');
  const [courses, setCourses] = useState<Course[]>([]);
  const [roadmapData, setRoadmapData] = useState<RoadmapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const getCheckpointStatus = (index: number) => {
    const firstIncompleteIndex = roadmap.checkpoints.findIndex(cp => !cp.is_completed);

    if (roadmap.checkpoints[index].is_completed) {
        return 'Completed';
    }

    if (index === firstIncompleteIndex) {
        return 'In Progress';
    }

    return 'Not Started';
    };

  useEffect(() => {
    if (!careerId) return;

    const fetchData = async () => {
      try {
        // const token = localStorage.getItem('token'); // Pastikan token disimpan di localStorage setelah login
        // if (!token) {
        //   throw new Error('Unauthorized: No token found');
        // }

        const [roadmapRes, coursesRes] = await Promise.all([
          axios.get(`https://career-path-api.onrender.com/api/roadmap/${careerId}`),
          axios.get(`https://career-path-api.onrender.com/api/courses/career/${careerId}`, {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZXhwIjoxNzUzOTY3NTA1fQ.lyAcxX3kyJ62wbkOBOqbpaS8LtjCK_24MSscEKV5p5I`
            //   Authorization: `Bearer ${token}`
            }
          })
        ]);

        setRoadmapData(roadmapRes.data);
        setCourses(coursesRes.data.courses);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [careerId]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!roadmapData) return <div className="p-10 text-red-500 text-center">Failed to load data.</div>;

  const { career_info, roadmap } = roadmapData;

  return (
    <div>
        <Navbar/>
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Your recommended career is: <span className="text-[#0EA5E9]">{career_info.career_name}</span>
        </h1>
        <p className="text-gray-700 text-sm max-w-xl">{career_info.description}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600">
          <span>Estimated Duration: {roadmap.estimated_duration}</span>
          <span>Total Checkpoints: {roadmap.total_checkpoints}</span>
          <span>Career QA Items: {career_info.qa_count}</span>
        </div>
      </div>

      {/* Roadmap Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Learning Roadmap</h2>
        <ol className="space-y-5">
          {roadmap.checkpoints.map((cp, idx) => (
            <li key={cp.checkpoint_id} className="relative border-l-4 pl-4 border-[#0EA5E9]">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-[#0EA5E9]">
                    {idx + 1}. {cp.title}
                  </h3>
                  <p className="text-sm text-gray-600">{cp.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Estimated time: {cp.estimated_time}</p>
                  <p className="text-xs text-gray-500">
                    Skills: {cp.skills_derived.join(', ')}
                  </p>
                </div>
                <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                    getCheckpointStatus(idx) === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : getCheckpointStatus(idx) === 'In Progress'
                        ? 'bg-[#0EA5E9] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}

                >
                {getCheckpointStatus(idx)}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Courses Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recommended Courses & Certifications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.course_id} course={course} />
          ))}
        </div>
      </div>
    </div>
    </div>

  );
}
