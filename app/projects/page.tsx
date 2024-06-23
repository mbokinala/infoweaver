import { JobList } from "@/components/job-list";
import { db } from "@/lib/db/db";

async function getJobs() {
  let jobs = await db.getJobs();
  console.log(jobs)
  return jobs;
}

async function getScripts() {
  let scripts = await db.getScripts();
  return scripts;
}

export default async function ProjectsListPage() {
  let jobs = await getJobs();
  let scripts = await getScripts();
  return <JobList jobs={jobs} scripts={scripts} />;
}