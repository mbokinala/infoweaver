"use client";

import { gradeFRQ } from "@/lib/actions/jobs";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function FRQBox({ question }: { question: any }) {
  const answerRef = useRef<any>();

  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState<string | null>(null);

  return (
    <>
      {/* a text area with the question above*/}
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-semibold">Free Response Question</h2>
      </div>
      <p className="text-sm text-muted-foreground">{question.question}</p>
      <textarea
        className="w-full h-32 p-2 border border-gray-200 rounded-xl"
        placeholder="Your Answer"
        ref={answerRef}
      />
      <div className="w-full flex flex-row-reverse">
        <Button
          onClick={async () => {
            setLoading(true);
            const answer = answerRef.current.value;
            const feedback = await gradeFRQ(question, answer);
            setFeedback(feedback.feedback);
            // alert(feedback.feedback);
            setLoading(false);
          }}
        >
          {loading ? (
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="#fff"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Grade"
          )}
        </Button>
      </div>
      <i>{feedback}</i>
    </>
  );
}
