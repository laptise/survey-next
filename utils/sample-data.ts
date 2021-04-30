import { SurveySheet, User } from "../interfaces";

/** Dummy user data. */
export const sampleUserData: User[] = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Caroline" },
  { id: 104, name: "Dave" },
];

export const existingIds = ["dfjj3l290ajs"];

export const surveySheets: SurveySheet[] = [
  {
    id: "test",
    title: "sample test",
    questions: [
      {
        title: "test question",
        questionType: "radioSelect",
        isEditing: false,
        answer: {
          options: [
            { label: "hi", value: "1" },
            { label: "hi2", value: "no" },
          ],
        },
      },
      { title: "input", questionType: "input", isEditing: false, answer: null },
    ],
  },
];
