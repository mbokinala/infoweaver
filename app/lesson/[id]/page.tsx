import { LessonPage } from "@/components/lesson-page";
import { LessonPage2 } from "@/components/lesson-page2";

export default function Lesson({ params }: { params: { id: string } }) {
  // get the lesson id from the URL

  return (
    <>
      <div className="mx-auto px-4">
        <LessonPage2 scriptId={params.id} />
      </div>
    </>
  );
}
