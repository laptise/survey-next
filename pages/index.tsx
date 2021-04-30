import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="홈 | survey-next">
    <h1>안녕하세요👋</h1>
    <div style={{ flexDirection: "column", display: "flex" }}>
      <Link href="/newQuestion">
        <a>새로운 질문 등록하기</a>
      </Link>
      <Link href="/survey/test">
        <a>test 질문 (GET TEST)</a>
      </Link>
    </div>
  </Layout>
);

export default IndexPage;
