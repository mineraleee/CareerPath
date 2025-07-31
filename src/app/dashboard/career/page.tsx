import CareerCoursePage from './careerclient/page';
import { Navbar } from './components/navbar';

export default async function CareerPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const careerId = typeof searchParams?.id === 'string' ? searchParams.id : undefined;

  return (
    <div>
      <Navbar />
      <CareerCoursePage careerId={careerId} />
    </div>
  );
}
