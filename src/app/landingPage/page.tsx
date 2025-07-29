import Heading1 from '@/components/typography/Heading1'
import { Navbar } from '@/app/landingPage/components/navbar'
import Card from './components/card'
import { Compass, Map } from "lucide-react";
import Link from 'next/link';

export default function LandingPage(){
    return(
        <div>
            <Navbar/>
            <main className="max-w-5xl mx-auto px-4 py-20 flex flex-col items-center text-center gap-6">
                <Heading1>How would you like to begin?</Heading1>
                <div className="text-lg lg:text-xl text-[#4B5563] mb-8">
                    Choose the path that best describes you.
                </div>
                <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
                    <Card
                    icon={<Compass className="w-7 h-7 text-[#0284C7]" />}
                    title="Find My Career Path"
                    description="Not sure which career is right for you? We'll help you explore options based on your interests, skills, and values."
                    buttonLabel="Get Started"
                    buttonHref="/assessment"
                    buttonColor="bg-[#0EA5E9]"
                    iconBgColor="bg-[#DBEAFE]"
                    />

                    <Card
                    icon={<Map className="w-6 h-6 text-[#DCFCE7] fill-[#16A34A]" />}
                    title="Get My Learning Roadmap"
                    description="Already know your desired career? We'll create a personalized learning plan to help you reach your professional goals."
                    buttonLabel="Create Roadmap"
                    buttonHref="/roadmap"
                    buttonColor="bg-[#22C55E]"
                    iconBgColor="bg-[#DCFCE7]"
                    />
                </div>
                <div>
                    Not sure which option to choose?{" "}
                    <Link href="/about" className="text-[#0284C7] hover:underline">
                        Learn more about our process
                    </Link>
                </div>
                </main>
            
        </div>
    )
}