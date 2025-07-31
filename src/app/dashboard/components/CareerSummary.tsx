interface Props {
  salary: string;
  growth: string;
  score: number;
}

export default function CareerSummary({ salary, growth, score }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mt-2">
      <div className="bg-white shadow rounded-lg px-6 py-4 text-center">
        <p className="text-sm text-gray-500">Average Salary</p>
        <p className="text-lg font-semibold text-gray-800">${salary}</p>
      </div>
      <div className="bg-white shadow rounded-lg px-6 py-4 text-center">
        <p className="text-sm text-gray-500">Job Growth</p>
        <p className="text-lg font-semibold text-gray-800">{growth}</p>
      </div>
      <div className="bg-white shadow rounded-lg px-6 py-4 text-center">
        <p className="text-sm text-gray-500">Match Score</p>
        <p className="text-lg font-semibold text-blue-600">{score}%</p>
      </div>
    </div>
  );
}