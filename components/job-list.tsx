"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Script, VideoGenerateJob } from "@/lib/db/types";
import Link from "next/link";
import { regenerate } from "@/lib/actions/jobs";
import { useRouter } from 'next/navigation';

export function JobList({
  jobs,
  scripts,
}: {
  jobs: VideoGenerateJob[];
  scripts: Script[];
}) {
  const router = useRouter();
  return (
    <section className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Your Lessons</h1>
      </header>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="p-6 bg-background rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Link href={`/lesson/${job.scriptId}`}>
                <h2 className="text-xl font-semibold">
                  {scripts.find((s) => s.id === job.scriptId)?.tag ?? ""}
                </h2>
              </Link>
              <div className="flex items-center">
                {(job.status === "done" || job.status === 'failed') && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-4"
                    onClick={async () => {
                      await regenerate(job.id);
                      router.refresh();
                    }}
                  >
                    Regenerate
                  </Button>
                )}
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    job.status === "queued"
                      ? "bg-gray-200 text-gray-800"
                      : job.status === "processing"
                      ? "bg-yellow-200 text-yellow-800"
                      : job.status === "failed"
                      ? "bg-red-200 text-red-800"
                      : "bg-green-200 text-green-800"
                  }`}
                >
                  {job.status}
                </div>
              </div>
            </div>
            <p />
            <div className="text-sm text-muted-foreground">
              Created: {new Date(job.createdAt).toLocaleString()}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
