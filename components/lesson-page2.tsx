"use server";
import { db } from "@/lib/db/db";
import { Script } from "@/lib/db/types";
import { QuizQuestion } from "./QuizQuestion";
import { Button } from "./ui/button";
import { gradeFRQ, regenerateQuiz } from "@/lib/actions/jobs";
import RegenButton from "./regenbutton";
import { useRef } from "react";
import FRQBox from "./FRQBox";

async function getScript(scriptId: string): Promise<Script> {
  return await db.getScript(scriptId);
}

async function getQuiz(scriptId: string) {
  let quiz = await db.getQuiz(scriptId);
  return quiz;
}

async function getFRQ(scriptId: string) {
  let quiz = await db.getFRQ(scriptId);
  return quiz;
}

export async function LessonPage2({ scriptId }: { scriptId: string }) {
  const script = await getScript(scriptId);
  const quiz = await getQuiz(scriptId);
  const frq = await getFRQ(scriptId);

  const videoUrl = `https://berkeley-hackathon.s3.us-east-2.amazonaws.com/video/${scriptId}/video.mp4`;

  if (!quiz) {
    return null;
  }

  return (
    <section className="max-w-screen py-12 max-h-min">
      <div className="container grid gap-6 grid-cols-2">
        <div className="rounded-xl overflow-hidden">
          <video className="w-full aspect-video" src={videoUrl} controls />
        </div>
        <div className="col-span-1 grid gap-4">
          <div className="rounded-xl">
            <div className="flex flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">Interactive Quiz</h2>
              <RegenButton scriptId={scriptId} />
            </div>
            <p className="text-sm text-muted-foreground">
              Test your knowledge from the video lesson.
            </p>
          </div>
          <div className="grid gap-4 overflow-y-auto h-1/3">
            {quiz.questions.map((question) => (
              <QuizQuestion
                key={question.question}
                question={question.question}
                options={question.choices}
                answerIndex={question.answerIndex}
              />
            ))}

            <div className="rounded-xl bg-card p-4">
              {frq &&
                frq.questions.map((q) => (
                  <FRQBox question={q} key={q.question} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
