import {
  initializeApp,
  applicationDefault,
  cert,
  getApp,
  getApps,
} from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";
import { Quiz, Script, VideoGenerateJob } from "./types";

var serviceAccount = process.env.FIREBASE_SERVICE_ACCT && require("./firebase-key.json");
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}
class Database {
  db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = getFirestore();
  }

  async getScript(id: string): Promise<Script> {
    let doc = await this.db.collection("scripts").doc(id).get();
    return { ...doc.data(), id: doc.id } as Script;
  }

  async updateScriptSections(id: string, sections: Script["sections"]) {
    await this.db.collection("scripts").doc(id).update({ sections });
  }

  async createQuiz(quiz: Partial<Quiz>) {
    return await this.db.collection("quizzes").add(quiz);
  }

  async getQuiz(scriptId: string): Promise<Quiz | null> {
    let doc = await this.db
      .collection("quizzes")
      .where("scriptId", "==", scriptId)
      .get();
    if (doc.empty) {
      return null;
    }
    return { ...doc.docs[0].data(), id: doc.docs[0].id } as Quiz;
  }

  async getJobs(): Promise<VideoGenerateJob[]> {
    let docs = await this.db.collection("jobs").get();
    return docs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as VideoGenerateJob[];
  }

  async getScripts(): Promise<Script[]> {
    let docs = await this.db.collection("scripts").get();
    return docs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Script[];
  }

  async requeueJob(id: string) {
    await this.db.collection("jobs").doc(id).update({
      status: "queued",
      createdAt: Date.now(),
    });
  }

  async saveScript(script: Partial<Script>) {
    return await this.db.collection("scripts").add(script);
  }

  async createJob(job: Partial<VideoGenerateJob>) {
    return await this.db.collection("jobs").add(job);
  }
}

export const db = new Database();
