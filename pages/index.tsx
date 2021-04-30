import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="홈 | survey-next">
    <h1>안녕하세요👋</h1>
    <div style={{ flexDirection: "column", display: "flex" }}>
      <AddNewQuestionSection />
      <HowToSection />
      <DevSection />
    </div>
  </Layout>
);

const AddNewQuestionSection = () => (
  <div className="main-section">
    <h2>질문지 작성과 배포 모두 간편하게</h2>
    <Link href="/newQuestion">
      <button>새로운 질문 등록하기</button>
    </Link>
  </div>
);

const HowToSection = () => (
  <div className="main-section">
    <h2>직관적인 문제지 작성</h2>
  </div>
);

const DevSection = () => (
  <div className="main-section">
    <h2>테스트 질문</h2>
    <Link href="/survey/test">
      <button>test 질문 (GET TEST)</button>
    </Link>
  </div>
);
export default IndexPage;
