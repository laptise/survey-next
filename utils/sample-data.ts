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
    config: { manualOptionValue: false, validationFrom: new Date(2021, 4, 3), validationTo: new Date(2022, 4, 3) },
    id: "test",
    createdAt: new Date(2021, 3, 30, 18, 45),
    title: "아침 식사",
    questions: [
      {
        title: "오늘 아침식사를 했나요?",
        questionType: "radioSelect",
        isEditing: false,
        answer: {
          options: [
            { label: "네", value: "1" },
            { label: "아니오", value: "0" },
          ],
        },
      },
      { title: "먹었다면 뭐 먹었나요?", questionType: "input", isEditing: false, answer: null },
      {
        title: "어땠나요?",
        questionType: "radioSelect",
        isEditing: false,
        answer: {
          options: [
            { label: "굉장히 맛있었음", value: "1" },
            { label: "그냥 그랬음", value: "2" },
            { label: "먹다 남겼음", value: "3" },
          ],
        },
      },
    ],
  },
];
