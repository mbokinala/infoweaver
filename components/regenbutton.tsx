"use client";

import { createFRQ, regenerateQuiz } from "@/lib/actions/jobs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
import { create } from "domain";

export default function RegenButton({ scriptId }: { scriptId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <Button
      onClick={async () => {
        setLoading(true);
        await createFRQ(scriptId);
        await regenerateQuiz(scriptId);
        setLoading(false);
        router.refresh();
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
        "New Questions"
      )}
    </Button>
  );
}
