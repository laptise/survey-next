import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Survey from "../components/ViewSheet";
import { SurveySheet } from "../interfaces";

const CheckQuestion = () => {
  const [sheet, setSheet] = useState((null as unknown) as SurveySheet);
  const [expiredView, setExpiredView] = useState(false);
  const [limitedLink, setLimitedLink] = useState(false);
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
        <Layout title={`등록전 확인 | Survey-next`} bodyClass={"check-question"}>
          <Survey sheet={sheet} />
          <h3>개요</h3>
          <span>총 문항 수 :{sheet.questions.length}개</span>
          <h3>제출 기한</h3>
          <small>해당기한이 지날경우 질문 제출이 불가능해집니다.</small>
          <div className="config-item">
            <span className="title">기한만료 후 공개설정</span>
            <span className="description">제출기한이 지난 후 질문을 비공개 할지 선택합니다.</span>
            <div className="selection">
              <label className="single-option" data-checked={expiredView === false}>
                <input type="radio" checked={expiredView === false} onChange={() => setExpiredView(false)}></input>
                <span className="title">비공개</span>
                <span className="description">기한이 지날 경우 설문지를 볼 수 없습니다.</span>
              </label>
              <label className="single-option" data-checked={expiredView === true}>
                <input type="radio" checked={expiredView === true} onChange={() => setExpiredView(true)}></input>
                <span className="title">열람 가능</span>
                <span className="description">기한이 지나도 설문지를 볼 수 있습니다.</span>
              </label>
            </div>
          </div>
          <div className="config-item">
            <span className="title">URL 발행방식 설정</span>
            <span className="description">공개 URL 발행 혹은 비공개 개별 URL 발행을 선택합니다.</span>
            <div className="selection">
              <label className="single-option" data-checked={limitedLink === false}>
                <input type="radio" checked={limitedLink === false} onChange={() => setLimitedLink(false)}></input>
                <span className="title">공개 URL 발행</span>
                <span className="description">설문지용 링크를 하나 발행합니다. 응답자는 누구나 발행된 링크로 액세스하여 응답할 수 있습니다.</span>
              </label>
              <label className="single-option" data-checked={limitedLink === true}>
                <input type="radio" checked={limitedLink === true} onChange={() => setLimitedLink(true)}></input>
                <span className="title">개별 URL 발행</span>
                <span className="description">
                  지정된 사용자에게만 링크를 발행합니다. 누구에게 링크를 발행했는지 식별이 가능하므로 발행대상자의 응답 상태를 확인할 수 있습니다.
                </span>
              </label>
            </div>
          </div>
          <small>이용자에게 배포할 링크를 만드는 방식을 정합니다.</small>
          <h3>제출 방식 설정</h3>
          <div className="check-submit-type">
            <label>da</label>
            <label>da</label>
            <label>da</label>
          </div>
          <button>질문 등록하기</button>
        </Layout>
      </>
    );
  else return <></>;
};

export default CheckQuestion;
