import CareerCoursePage from './careerclient/page';
import { Navbar } from './components/navbar';

export default async function CareerPage({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await the searchParams since it's now a Promise in Next.js 15
  const resolvedSearchParams = await searchParams;
  const careerId = typeof resolvedSearchParams?.id === 'string' ? resolvedSearchParams.id : undefined;

  return (
    <div>
      <Navbar />
      <CareerCoursePage careerId={careerId} />
    </div>
  );
}