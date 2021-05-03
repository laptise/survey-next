import { Question, RadioSelect, SurveySheet } from "../interfaces";
import { ReactNode } from "react";

export interface SheetProps {
  sheet: SurveySheet;
}

export default function Survey({ sheet }: SheetProps) {
  return (
    <>
      <div className="question-header">
        <h1>{sheet.title}</h1>
        {sheet.createdAt && <small>{sheet.createdAt.toLocaleString()}</small>}
      </div>
      {sheet.questions?.map((question, index) => (
        <SheetQuestion key={index} question={question} index={index} />
      ))}
    </>
  );
}

export type SheetQuestionProps = {
  question: Question;
  index: number;
  children?: ReactNode;
};

export function SheetQuestion(props: SheetQuestionProps) {
  const { question, index, children } = props;
  const { questionType } = question;
  return (
    <div className={`single-question`}>
      <Tags {...props} />
      <span></span>
      <span className="title">
        {index + 1}. {question.title}
      </span>
      <div className="answer-area">
        {questionType === "input" && <InputComponent />}
        {questionType === "radioSelect" && <RadioSelectComponent index={index} radioSelect={question.answer as RadioSelect} />}
      </div>
      {children}
    </div>
  );
}

function Tags({ question }: SheetQuestionProps) {
  const questionTypeLabel = question.questionType === "input" ? "주관식" : "객관식";
  const optionTypeLabel = "단수 선택";
  const tags = [questionTypeLabel, optionTypeLabel];
  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))}
    </div>
  );
}

type InputComponent = {
  index: number;
};

const InputComponent = () => <input autoComplete={"off"} spellCheck={false} />;

type RadioSelectProps = {
  index: number;
  radioSelect: RadioSelect;
};

function RadioSelectComponent({ radioSelect, index }: RadioSelectProps) {
  const { options } = radioSelect;
  return (
    <>
      {options.map((option) => (
        <label key={option.value}>
          <input value={option.value} name={`${index}`} type="radio" />
          <span>{option.label}</span>
        </label>
      ))}
    </>
  );
}
