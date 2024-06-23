"use server";

import router from "next/router";
import { db } from "../db/db";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function regenerate(jobId: string) {
  await db.requeueJob(jobId);
}

export async function pdfParse(fileContents: string, tag: string) {
  console.log('generating script')

  const result = await generateText({
    model: openai("gpt-4o"),
    messages: [
      {
        role: "system",
        content: `You are a friendly, yet highly professional tutor. You are very confident of your answers given your information source. Read the chapter, and give me a combination of script for narration and content for the slide. Each slide will have a title and some bullet points. As an experienced tutor, you give detailed bullet points that briefly summarize each concept, not just list them as a title. Give me nothing but json output (no other formatting) in the following schema:
[ { slideTitle: string, bulletPoints: [ { bulletPoint: string, narration: string } ] } ]`,
      },
      {
        role: "user",
        content: fileContents,
      }
    ],
  });

  console.log('generated script');


  let script = result.text.replaceAll("```json", "").replaceAll("`", "");
  let scriptObj = JSON.parse(script);

  let scriptResult = await db.saveScript({sections: scriptObj, tag});
  await db.createJob({
    scriptId: scriptResult.id,
    createdAt: Date.now(),
    status: "queued",
  })
}
