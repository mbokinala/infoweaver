"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function QuizQuestion({
  question, options, answerIndex,
}: {
  question: string;
  options: string[];
  answerIndex: number;
}) {
  let [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  return (
    <div className="rounded-xl bg-card p-4">
      <div className="text-lg font-semibold">{question}</div>
      <div className="grid gap-2">
        {options.map((option, index) => (
          <Button
            variant="outline"
            className={cn("px-4 py-2 w-full text-balance text-center", {
              "bg-red-200 hover:bg-red-200": selectedOptionIndex === index && index !== answerIndex,
              "bg-green-200 hover:bg-green-200": selectedOptionIndex === index && index === answerIndex,
            
            })}
            key={index}
            onClick={() => {
              setSelectedOptionIndex(index);
            }}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
