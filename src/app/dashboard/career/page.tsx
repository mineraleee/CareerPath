import CareerCoursePage from './careerclient/page';
import { Navbar } from './components/navbar';

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function CareerPage({ searchParams }: Props) {
  const careerId = typeof searchParams?.id === 'string' ? searchParams.id : undefined;

  return (
    <div>
      <Navbar />
      <CareerCoursePage careerId={careerId} />
    </div>
  );
}
