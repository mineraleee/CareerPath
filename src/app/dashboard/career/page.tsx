import CareerCoursePage from './careerclient/page';
import { Navbar } from './components/navbar';

interface Props {
  searchParams: { id?: string };
}

export default function CareerPage({ searchParams }: Props) {
  const careerId = searchParams.id;

  return (
    <div>
      <Navbar />
      <CareerCoursePage careerId={careerId} />
    </div>
  );
}
