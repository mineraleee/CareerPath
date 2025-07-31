interface Course {
  title: string;
  description: string;
  price: string;
  duration: string;
  level: string;
  rating: number;
  total_reviews: number;
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-2 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
      <p className="text-sm text-gray-500">{course.description}</p>
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>{course.duration}</span>
        <span>{course.level}</span>
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-yellow-500 font-semibold">⭐ {course.rating.toFixed(1)} ({course.total_reviews} reviews)</span>
        <span className="font-semibold text-gray-800">${course.price}</span>
      </div>
      <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">View Course</button>
    </div>
  );
}