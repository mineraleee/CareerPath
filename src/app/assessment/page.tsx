import Heading1 from '@/components/typography/Heading1'
import { Navbar } from './components/navbar'

export default function LandingPage(){
    return(
        <div>
            <Navbar/>
            <main className="max-w-5xl mx-auto px-4 py-20 flex flex-col items-center text-center gap-6">
                <Heading1>How would you like to begin?</Heading1>

            </main>
        </div>
    )
}