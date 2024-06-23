"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { pdfParse } from "@/lib/actions/jobs";
import pdfToText from "react-pdftotext";
import { Spinnaker } from "next/font/google";
import { ThreeDots } from "react-loader-spinner";
import { title } from "process";
import { useRouter } from 'next/navigation';

export function CreateLessonForm() {
  const fileRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  
  const handleSubmit = async () => {
    setLoading(true);
    if (!fileRef.current?.files) {
      return;
    }

    let file = fileRef.current.files[0];

    let result = await pdfToText(file);
    await pdfParse(result, titleRef.current?.value || "test");
    router.push("/projects");
    setLoading(false);
  };

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create Lesson</CardTitle>
          <CardDescription>
            Fill out the form to create a new lesson.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Lesson Title</Label>
            <Input id="title" placeholder="Enter lesson title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content-type">Content Type</Label>
            <Select id="content-type">
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="textbook">Textbook</SelectItem>
                <SelectItem value="lecture-video">Lecture Video</SelectItem>
                <SelectItem value="lecture-slide">Lecture Slide</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="file">Upload PDF</Label>
            <Input id="file" type="file" ref={fileRef} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
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
              "Create Lesson"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
