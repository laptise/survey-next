import { faPen, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { Question, QuestionBlockProps, QuestionType, RadioOption, RadioSelect, SurveySheet } from "../interfaces";

export default function NewQuestion() {
  const newSurveySheet: SurveySheet = { id: "", title: "", questions: [] };
  const [questionList, setQuestionList] = useState(newSurveySheet.questions as Question[]);

  /** 새 질문 추가 */
  function addNewQuestion() {
    const newQuestion: Question = { title: "", questionType: "input", isEditing: true, answer: null };
    setQuestionList([...questionList, newQuestion]);
  }

  /** 질문 등록 */
  function submit() {
    /** 편집중인 질문 */
    const unFilledQuestion = questionList.find((question) => question.isEditing);
    if (unFilledQuestion) {
      window.alert("편집이 완료되지 않은 문항이 있습니다. 확인해주세요");
      return;
    }
    fetch("/api/questions/addNew", {
      method: "post",
      headers: {
        dasd: "asd",
      },
      body: JSON.stringify(newSurveySheet),
    })
      .then((res) => res.json())
      .then(console.log);
  }

  function updateSheet() {
    newSurveySheet.questions = questionList;
  }

  useEffect(updateSheet, [questionList]);

  return (
    <Layout title="새로 만들기 | Survey-next">
      <h1>새 질문 만들기</h1>
      {questionList.map((question, index) => (
        <QuestionBlock question={question} index={index} key={index} />
      ))}
      <div id="add-new-question">
        <button onClick={addNewQuestion}>
          <FontAwesomeIcon icon={faPlus} /> 새질문 추가하기
        </button>
      </div>
      <button id="submit-sheet" onClick={submit}>
        질문 등록하기
      </button>
    </Layout>
  );
}

/** 질문 블록 */
function QuestionBlock({ question, index }: QuestionBlockProps) {
  const [editingState, setEditingState] = useState(question.isEditing);
  const [titleState, setTitleState] = useState(question.title);
  const titleInput = useRef((null as unknown) as HTMLInputElement);
  const [questionType, setQuestionType] = useState(question.questionType as QuestionType);

  /** 질문 변경내용 저장 */
  const submit = () => {
    if (!question.title) {
      titleInput.current.setCustomValidity("no");
      return;
    }
    setEditingState(false);
  };

  const titleInputEvent = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setTitleState(target.value);
  };

  const editButtonEvent = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setEditingState(true);
  };

  /** State 내용을 질문내용에 반영 */
  const updateQuestion = () => {
    question.title = titleState;
    question.isEditing = editingState;
    question.questionType = questionType;
  };

  /** 부작용: dependency가 변경되면 updateQuestion을 실행 */
  useEffect(updateQuestion, [editingState, titleState, questionType, question]);

  useEffect(() => {
    updateQuestion();
  }, [questionType, updateQuestion]);
  return (
    <div className={`single-question ${editingState ? "is-editing" : ""}`}>
      {editingState ? (
        <>
          <button className="confirm-button" onClick={submit}>
            <FontAwesomeIcon icon={faSave} />
            저장
          </button>
          <div className="question-title-div">
            {index + 1}.
            <input ref={titleInput} placeholder="質問を入力" value={titleState} onInput={titleInputEvent} className="question-title-input title" />
          </div>
          <div className="choose-question-type">
            <span>質問のタイプを選択</span>
            <div className="set-answers">
              <div className="radios">
                <input
                  name={`qeustion${index}`}
                  id={`qeustion${index}-type-1`}
                  onChange={(e) => {
                    if (e.target.checked) setQuestionType("input");
                  }}
                  checked={questionType === "input"}
                  type="radio"
                />
                <label htmlFor={`qeustion${index}-type-1`}>入力式</label>
                <input
                  onChange={(e) => {
                    if (e.target.checked) setQuestionType("radioSelect");
                  }}
                  checked={questionType === "radioSelect"}
                  name={`qeustion${index}`}
                  id={`qeustion${index}-type-2`}
                  type="radio"
                />
                <label htmlFor={`qeustion${index}-type-2`}>選択式</label>
              </div>
              {questionType === "input" && (
                <div>
                  <input readOnly={true} value="이곳에 입력을 받습니다" />
                </div>
              )}
              {questionType === "radioSelect" && <RadioSelectBuilder question={question} />}
            </div>
          </div>
        </>
      ) : (
        <>
          <button className="edit-button" onClick={editButtonEvent}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <span className="title">
            {index + 1}. {question.title}
          </span>
          <div>{questionType === "input" ? <input readOnly={true} value="이곳에 입력을 받습니다" /> : <span>dada</span>}</div>
        </>
      )}
    </div>
  );
}

interface RadioSelectBuilderProps {
  question: Question;
}

function RadioSelectBuilder({ question }: RadioSelectBuilderProps) {
  const radioSelect = new RadioSelect([]);
  const [options, setOptions] = useState(radioSelect.options as RadioOption[]);
  const [labelName, setLabelName] = useState("");
  const [valueName, setValueName] = useState("");
  const addNeweOption = () => {
    const newOption = new RadioOption(labelName, valueName);
    setOptions([...options, newOption]);
    setLabelName("");
    setValueName("");
  };
  const labelNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setLabelName(e.currentTarget.value);
  };

  const valueNameInput = (e: React.FormEvent<HTMLInputElement>) => {
    setValueName(e.currentTarget.value);
  };

  const updateQuestion = () => {
    question.questionType = "radioSelect";
    radioSelect.options = options;
    question.answer = radioSelect;
  };
  useEffect(updateQuestion, [options]);
  return (
    <div className="radio-select-builder">
      <div>
        <input onInput={valueNameInput} placeholder="값" value={valueName} />
        <input onInput={labelNameInput} value={labelName} placeholder="선택지 라벨" />
        <button disabled={!valueName || !labelName} onClick={addNeweOption}>
          선택지 추가
        </button>
      </div>
      {options.map((option, index) => (
        <label key={index}>
          <input type="radio" name="113" value={option.value} />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
