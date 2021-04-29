import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { Question, QuestionBlockProps, QuestionType } from "../interfaces";

export default function NewQuestion() {
  const [questionList, setQuestionList] = useState([] as Question[]);

  /** 새 질문 추가 */
  function addNewQuestion() {
    const newQuestion = new Question("");
    setQuestionList([...questionList, newQuestion]);
  }
  return (
    <Layout title="새로 만들기 | Survey-next">
      <h1>새 질문 만들기</h1>
      {questionList.map((question, index) => (
        <QuestionBlock question={question} index={index} key={index} />
      ))}
      <div id="add-new-question">
        <button onClick={addNewQuestion}>クリックして質問追加+</button>
      </div>
    </Layout>
  );
}

/** 질문 블록 */
function QuestionBlock({ question, index }: QuestionBlockProps) {
  const [editingState, setEditingState] = useState(question.isEditing);
  const [titleState, setTitleState] = useState(question.title);
  const titleInput = useRef((null as unknown) as HTMLInputElement);
  const [questionType, setQuestionType] = useState((null as unknown) as QuestionType);

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

  const editButtonEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
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
            質問を登録
          </button>
          <div className="question-title-div">
            {index + 1}.
            <input ref={titleInput} placeholder="質問を入力" value={titleState} onInput={titleInputEvent} className="question-title-input title" />
          </div>
          <div className="choose-question-type">
            <span>質問のタイプを選択</span>
            <div>
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
              {questionType === "input" && <div>주관식이네</div>}
              {questionType === "radioSelect" && <div>객관식이네</div>}
            </div>
          </div>
        </>
      ) : (
        <>
          <button className="edit-button" onClick={editButtonEvent}>
            編集
          </button>
          <span className="title">
            {index + 1}. {question.title}
          </span>
        </>
      )}
    </div>
  );
}
