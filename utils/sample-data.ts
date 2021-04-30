import { Question, SurveySheet, User } from "../interfaces";

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Caroline" },
  { id: 104, name: "Dave" },
];

export const existingIds = ["dfjj3l290ajs"];

export const surveySheets: SurveySheet[] = [new SurveySheet("test", [new Question("TEST QUESTION?", "radioSelect")])];
