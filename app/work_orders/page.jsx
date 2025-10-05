
import JobSummaryCard from "@/components/JobSummaryCard";
import { getCollections } from "@/utils/db";

export default async function WorkOrders() {
  const { workOrdersCollection } = await getCollections();
  const jobs = await workOrdersCollection.find({}).toArray();

  return (
    <main className="grid grid-cols-3 p-5 gap-4 mt-5">
      {jobs.map((job) => (
        <JobSummaryCard job={job.jobAddress} key={job._id} />
      ))}
    </main>
  );
}
