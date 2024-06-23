"use server";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Script } from "@/lib/db/types";
import { db } from "@/lib/db/db";

async function getScript(scriptId: string): Promise<Script> {
  return await db.getScript(scriptId);
}

export async function LessonPage({ scriptId }: { scriptId: string }) {
  const script = await getScript(scriptId);
  const videoUrl = `https://berkeley-hackathon.s3.us-east-2.amazonaws.com/video/${scriptId}/video.mp4`
  
  return (
    <div className="flex flex-col gap-8 py-12 md:flex-row md:items-start">
      <div className="w-full max-w-3xl md:mr-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          <div className="absolute inset-x-0 top-0 p-4 text-lg text-white bg-gradient-to-b from-black/50 to-transparent">
            <div className="line-clamp-1">Lesson 1: Introduction to React</div>
          </div>
          <video className="w-full" controls>
            <source
              src={videoUrl}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Lesson 1 Quiz</h2>
          <p className="text-muted-foreground">
            Answer the following multiple choice questions to test your
            understanding of the lesson.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Question 1</h3>
              <p>What is React?</p>
              <RadioGroup defaultValue="a">
                <div className="grid gap-2">
                  <RadioGroupItem value="a">
                    <Label>
                      <span className="flex items-center gap-2">
                        <div />A JavaScript library for building user interfaces
                      </span>
                    </Label>
                  </RadioGroupItem>
                  <RadioGroupItem value="b">
                    <Label>
                      <span className="flex items-center gap-2">
                        <div />A backend framework for building APIs
                      </span>
                    </Label>
                  </RadioGroupItem>
                  <RadioGroupItem value="c">
                    <Label>
                      <span className="flex items-center gap-2">
                        <div />A database management system
                      </span>
                    </Label>
                  </RadioGroupItem>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Question 2</h3>
              <p>What is the purpose of JSX in React?</p>
              <RadioGroup defaultValue="a">
                <div className="grid gap-2">
                  <RadioGroupItem value="a">
                    <Label>
                      <span className="flex items-center gap-2">
                        <div />
                        To define the structure of the user interface
                      </span>
                    </Label>
                  </RadioGroupItem>
                  <RadioGroupItem value="b">
                    <Label>
                      <span className="flex items-center gap-2">
                        <div />
                        To handle user interactions
                      </span>
                    </Label>
                  </RadioGroupItem>
                  <RadioGroupItem value="c">
                    <Label>
                      <span className="flex items-center gap-2">
                        <div />
                        To manage the application state
                      </span>
                    </Label>
                  </RadioGroupItem>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
