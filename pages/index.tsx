import Link from "next/link";
import Layout from "../components/Layout";

const IndexPage = () => (
  <Layout title="홈 | survey-next">
    <h1>안녕하세요👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
