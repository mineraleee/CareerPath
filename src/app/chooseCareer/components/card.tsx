'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Listbox } from '@headlessui/react';
import { Check, ChevronDown } from 'lucide-react';
import Heading2 from '@/components/typography/Heading2';

interface Career {
  career_id: string;
  career_name: string;
}

interface CardProps {
  careers: Career[];
  onSelect: (careerId: string) => void;
}

export default function Card({ careers, onSelect }: CardProps) {
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const router = useRouter();

  const handleChange = (career: Career) => {
    setSelectedCareer(career);
    onSelect(career.career_id);
  };

  const handleViewRoadmap = () => {
    if (selectedCareer) {
      router.push(`/dashboard/career?id=${selectedCareer.career_id}`);
    } else {
      alert('Please select a career path first!');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto text-center">
      <Heading2>What is your career goal?</Heading2>
      <p className="text-md text-gray-600 mb-5 mt-2">Select a career path to view its roadmap</p>

      <label className="text-sm font-medium mb-2 block text-left">Select a career</label>
      <Listbox value={selectedCareer} onChange={handleChange}>
        <div className="relative mb-4">
          <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-4 pr-10 text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <span>{selectedCareer ? selectedCareer.career_name : 'Choose a career path'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {careers.map((career) => (
              <Listbox.Option
                key={career.career_id}
                value={career}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {career.career_name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      <button
        onClick={handleViewRoadmap}
        className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white py-2 rounded-lg font-semibold transition mt-2"
      >
        View Roadmap
      </button>

      <p className="text-sm text-gray-500 mt-4">
        Can't find your career?{' '}
        <a href="#" className="text-[#0EA5E9] hover:underline">
          Contact us
        </a>
      </p>
    </div>
  );
}
