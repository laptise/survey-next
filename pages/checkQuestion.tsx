import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Survey from "../components/ViewSheet";
import { SurveySheet } from "../interfaces";

const CheckQuestion = () => {
  const [sheet, setSheet] = useState((null as unknown) as SurveySheet);
  useEffect(() => {
    const storedSheet = localStorage?.getItem("tmpSheet");
    const sheet: SurveySheet = storedSheet && JSON.parse(storedSheet);
    setSheet(sheet);
    if (!sheet) {
      window.alert("작성된 질문이 없습니다. 다시 한번 설문을 작성해 주세요.");
      window.location.href = "./newQuestion";
    }
  }, []);
  if (sheet)
    return (
      <>
        <Layout title={`등록전 확인 | Survey-next`}>
          <Survey sheet={sheet} />
          <span>총 문항 수 :{sheet.questions.length}개</span>
          <h3>제출 방식 설정</h3>
          <button>질문 등록하기</button>
        </Layout>
      </>
    );
  else return <></>;
};

export default CheckQuestion;
