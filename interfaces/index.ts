/** 옵션 클래스 */
export class Option {
  label: string;

  value: string;
  constructor(label: string, value: string) {
    this.label = label;
    this.value = value;
  }
}

/** 셀렉트 클래스 */
export class Select {
  options: Option[];

  constructor(options: Option[]) {
    this.options = options;
  }
}

/** 라디오 옵션 클래스 */
export class RadioOption extends Option {
  constructor(label: string, value: string) {
    super(label, value);
    this.value = value;
    this.label = label;
  }
}

/** 라디오 셀렉트 클래스 */
export class RadioSelect extends Select {
  options: RadioOption[];
  constructor(options: RadioOption[]) {
    super(options);
    this.options = options;
  }
}

export class SurveySheet {
  id: string;
  questions: undefined | Question[];
  constructor(id: string, questions = [] as Question[]) {
    this.id = id;
    this.questions = questions;
  }
}

/** 질문 클래스 */
export class Question {
  title: string;

  isEditing: boolean = true;

  questionType: QuestionType;

  answer: null | RadioSelect;

  constructor(title: string, questionType: QuestionType) {
    this.title = title;
    this.answer = null;
    this.questionType = questionType;
  }
}

/** 질문 블록 프로퍼티 */
export interface QuestionBlockProps {
  question: Question;
  index: number;
}

/** 질문 종류 */
export type QuestionType = undefined | "input" | "radioSelect";

export type User = {
  id: number;
  name: string;
};
