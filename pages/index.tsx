import { faCode, faPaperPlane, faPen, faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="홈 | survey-next">
    <h1 style={{ textAlign: "center" }}>Survey prototype</h1>
    <small style={{ textAlign: "center", display: "block", margin: 20 }}>설문조사</small>
    <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
      <AddNewQuestionSection />
      <HowToSection />
      <DevSection />
      <FeaturesSection />
    </div>
  </Layout>
);

const AddNewQuestionSection = () => (
  <div className="main-section">
    <FontAwesomeIcon className="section-icon" icon={faPaperPlane} />
    <h2>간편한 작성과 배포</h2>
    <p>필요한 설문 항목을 작성하면 링크가 생성됩니다. 링크를 배포하고 응답자들의 제출을 기다리기만 하면 됩니다.</p>
    <Link href="/newQuestion">
      <button>새로운 질문 등록하기</button>
    </Link>
  </div>
);

const HowToSection = () => (
  <div className="main-section">
    <FontAwesomeIcon className="section-icon" icon={faPen} />
    <h2>직관적인 문제지 작성</h2>
    <p>직관적이고 알기 쉬운 방법으로 설문을 작성할 수 있습니다.</p>
  </div>
);

const DevSection = () => (
  <div className="main-section">
    <FontAwesomeIcon className="section-icon" icon={faCode} />
    <h2>테스트 설문</h2>
    <p>
      샘플 보기 <br />
      GET REQUEST TEST
    </p>
    <Link href="/survey/test">
      <button>VIEW SAMPLE</button>
    </Link>
  </div>
);

const FeaturesSection = () => (
  <div className="main-section">
    <FontAwesomeIcon className="section-icon" icon={faTools} />
    <h2>강력한 기능</h2>
    <p>메일로 결과 제출받기, CSV출력, 1회성 링크 발행, 결과분석 등 유용한 기능을 지원합니다.</p>
    <Link href="/survey/test">
      <button>더보기</button>
    </Link>
  </div>
);
export default IndexPage;
