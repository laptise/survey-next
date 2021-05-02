import { faPen, faPlus, faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { initialSurveySheet, Question, QuestionBlockProps, QuestionType, RadioOption, RadioSelect, SheetConfig, SurveySheet } from "../interfaces";

const SheetContext = React.createContext(([] as unknown) as [SurveySheet, React.Dispatch<React.SetStateAction<SurveySheet>>]);
export default function NewQuestion() {
  /** 설문 시트 초기형 오브젝트 클론 */
  const [sheet, setSheet] = useState({ ...initialSurveySheet });
  const [questionList, setQuestionList] = useState(sheet.questions as Question[]);
  const [sheetName, setSheetName] = useState(sheet.title);

  /** 새 질문 추가 */
  function addNewQuestion() {
    const newQuestion: Question = { title: "", questionType: "input", isEditing: true, answer: null };
    setQuestionList([...questionList, newQuestion]);
    setSheet({ ...sheet, ...{ questions: questionList } });
  }

  /** 질문 등록 */
  function submit() {
    /** 편집중인 질문 */
    const unFilledQuestion = questionList.find((question) => question.isEditing);
    if (unFilledQuestion) {
      window.alert("편집이 완료되지 않은 문항이 있습니다. 확인해주세요");
      return;
    }
    console.log(sheet);
    fetch("/api/questions/addNew", {
      method: "post",
      headers: {
        dasd: "asd",
      },
      body: JSON.stringify(sheet),
    }).then((res) => res.json());
  }

  /** 설문지 내용 업데이트 */
  function updateSheet() {
    sheet.questions = questionList;
    sheet.title = sheetName;
  }

  function sheetNameInput(e: React.FormEvent<HTMLInputElement>) {
    setSheetName(e.currentTarget.value);
  }

  useEffect(updateSheet, [questionList, sheetName]);

  return (
    <SheetContext.Provider value={[sheet, setSheet]}>
      <Layout title="새로 만들기 | Survey-next">
        <div id="new-question-title">
          <input onInput={sheetNameInput} value={sheetName} spellCheck={false} placeholder="설문지 제목 입력" />
        </div>
        <ConfigSection />
        {questionList.map((question, index) => (
          <QuestionBlock question={question} index={index} key={index} />
        ))}
        <div className="button-tools">
          <button onClick={addNewQuestion}>
            <FontAwesomeIcon icon={faPlus} /> 새질문 추가하기
          </button>
          <button id="submit-sheet" onClick={submit}>
            질문 등록하기
          </button>
        </div>
      </Layout>
    </SheetContext.Provider>
  );
}

/** 설정 섹션 */
function ConfigSection() {
  const [sheet, setSheet] = useContext(SheetContext);
  const [open, setOpen] = useState(false);
  const [manualOptionValue, setManualOptionValue] = useState(sheet.config.manualOptionValue);
  const updateConfigs = () => {
    const config = { manualOptionValue: manualOptionValue };
    setSheet({ ...sheet, ...{ config } });
    sheet.config.manualOptionValue = manualOptionValue;
    /** 만약 값 자동생성옵션으로 생성된 옵션이라면 value가 비어있기 때문에 자동으로 대입 */
    sheet.questions.forEach((question) => {
      question?.answer?.options?.forEach((option, index) => (option.value = String(index)));
    });
  };

  useEffect(updateConfigs, [manualOptionValue]);
  return (
    <div id="new-config">
      <div onClick={() => setOpen(!open)} className="header">
        고급 설정
      </div>
      {open && (
        <div className="body">
          <div className="config-item">
            <span className="title">선택지 값 선택방식</span>
            <span className="description">
              객관식 문항의 선택지 값을 어떻게 설정할 지 정할 수 있습니다. 선택지의 값은 응답자가 어떤 선택지를 선택했는지 파악하는데에 이용됩니다. 이
              값은 설문 결과를 분석하는데 이용할 수 있습니다.
            </span>

            <div className="selection">
              <label className="single-option">
                <input
                  type="radio"
                  onChange={() => setManualOptionValue(false)}
                  value={0}
                  name="optionValueName"
                  checked={manualOptionValue === false}
                />
                <span className="title">자동 값 생성 (기본)</span>
                <span className="description">선택지의 순서대로 값이 오름차 순으로 자동 부여됩니다. 간편하게 이용할 수 있습니다.</span>
              </label>
              <label className="single-option">
                <input
                  type="radio"
                  onChange={() => setManualOptionValue(true)}
                  value={1}
                  name="optionValueName"
                  checked={manualOptionValue === true}
                />
                <span className="title">수동 값 생성</span>
                <span className="description">
                  작성자가 값을 수동으로 지정해야하지만 선택지의 순서를 자유롭게 놓을 수 있어, 응답자가 의도를 파악할 수 없게 하는데 도움을 줄 수
                  있습니다.
                </span>
                <span className="warn">※ 자동 값 방식으로 작성된 객관식 문항이 존재할 경우 기존에 존재하던 선택지의 값은 자동으로 변환됩니다.</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
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

  useEffect(updateQuestion, [questionType, updateQuestion]);
  return (
    <div className={`single-question ${editingState ? "is-editing" : ""}`}>
      {editingState ? (
        <>
          <div className="choose-question-type">
            <span>質問のタイプを選択</span>
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
          </div>

          <div className="question-title-div">
            {index + 1}.
            <input ref={titleInput} placeholder="質問を入力" value={titleState} onInput={titleInputEvent} className="question-title-input title" />
          </div>
          <div className="set-answers">
            {questionType === "input" && (
              <div>
                <input readOnly={true} value="이곳에 입력을 받습니다" />
              </div>
            )}
            {questionType === "radioSelect" && <RadioSelectBuilder question={question} />}
          </div>
          <button className="confirm-button" onClick={submit}>
            <FontAwesomeIcon icon={faSave} />
            저장
          </button>
        </>
      ) : (
        <>
          <span className="title">
            {index + 1}. {question.title}
          </span>
          <div>{questionType === "input" ? <input readOnly={true} value="이곳에 입력을 받습니다" /> : <span>dada</span>}</div>
          <button className="edit-button" onClick={editButtonEvent}>
            <FontAwesomeIcon icon={faPen} />
            수정
          </button>
        </>
      )}
    </div>
  );
}

interface RadioSelectBuilderProps {
  question: Question;
}

function RadioSelectBuilder({ question }: RadioSelectBuilderProps) {
  const [sheet] = useContext(SheetContext);
  const radioSelect = new RadioSelect([]);
  const [options, setOptions] = useState(radioSelect.options as RadioOption[]);
  const [labelName, setLabelName] = useState("");
  const [valueName, setValueName] = useState("");
  const isAutoValue = !sheet.config.manualOptionValue;
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

  /** 추가버튼 유효성 */
  const addButtonValidity = isAutoValue ? labelName : valueName && labelName;

  useEffect(updateQuestion, [options]);
  return (
    <div className="radio-select-builder">
      <div>
        <input
          onInput={valueNameInput}
          disabled={isAutoValue}
          type={"number"}
          placeholder={`${isAutoValue ? "값 자동생성" : "값"}`}
          value={isAutoValue ? "" : valueName}
        />
        <input onInput={labelNameInput} value={labelName} placeholder="선택지 라벨" />
        <button disabled={!addButtonValidity} onClick={addNeweOption}>
          선택지 추가
        </button>
      </div>
      {options.map((option, index) => (
        <label key={index}>
          <input type="radio" name="113" value={isAutoValue ? index : option.value} />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
