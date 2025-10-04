import JobSummaryCard from "@/components/JobSummaryCard";

export default function Home() {
  const jobs = [
    {
      jobNumber: "E4028990",
      streetNumber: "13",
      Street: "13th Ave",
      surburb: "Parkhurst",
      date: "22 November 2025",
      qoute: 12500,
    },
    {
      jobNumber: "E4028991",
      streetNumber: "42",
      Street: "Oak Street",
      surburb: "Greensborough",
      date: "15 December 2025",
      qoute: 8900,
    },
    {
      jobNumber: "E4028992",
      streetNumber: "7",
      Street: "Maple Road",
      surburb: "Westview",
      date: "5 January 2026",
      qoute: 15600,
    },
    {
      jobNumber: "E4028993",
      streetNumber: "102",
      Street: "River Crescent",
      surburb: "Lakeside",
      date: "18 February 2026",
      qoute: 21000,
    },
    {
      jobNumber: "E4028994",
      streetNumber: "25",
      Street: "Pine Avenue",
      surburb: "Mountain View",
      date: "10 March 2026",
      qoute: 11500,
    },
    {
      jobNumber: "E4028995",
      streetNumber: "58",
      Street: "Sunset Boulevard",
      surburb: "Beachside",
      date: "22 April 2026",
      qoute: 18200,
    },
  ];

  return (
    <main className="grid grid-cols-3 p-5 gap-4 mt-5">
      {jobs.map((job) => {
        <JobSummaryCard job={job} key={job.jobNumber} />;
      })}
      Hello world
    </main>
  );
}
