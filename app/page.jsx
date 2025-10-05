import JobSummaryCard from "@/components/JobSummaryCard";
import { getCollections } from "@/utils/db";

export default async function Home() {
  const { workOrdersCollection } = await getCollections();
  const jobs = await workOrdersCollection.find({}).toArray();

  const newJobs = jobs.filter((job) => job.status === "new");
  const inProgressJobs = jobs.filter((job) => job.status === "in-progress");
  const completeJobs = jobs.filter((job) => job.status === "complete");

  return (
    <main className="p-5">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-5">New</h2>
          {newJobs.map((job) => (
            <JobSummaryCard job={job} key={job._id} status="new" />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-5">In Progress</h2>
          {inProgressJobs.map((job) => (
            <JobSummaryCard job={job} key={job._id} status="in-progress" />
          ))}
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-5">Complete</h2>
          {completeJobs.map((job) => (
            <JobSummaryCard job={job} key={job._id} status="complete" />
          ))}
        </div>
      </div>
    </main>
  );
}
