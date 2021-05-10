import { GetServerSideProps } from "next";
import Link from "next/link";
import { User } from "../../interfaces";
import Layout from "../../components/Layout";
import List from "../../components/List";
import excuteQuery from "../../db";

type Props = {
  items: User[];
};

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Users List | Next.js + TypeScript Example">
    <h1>Survey List</h1>
    <p>
      Example fetching data from inside <code>getServerSideProps()</code>.
    </p>
    <p>You are currently on: /users</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default WithStaticProps;

// すべてのリクエストの度に実行される
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const items = await excuteQuery({
      query: "SELECT * FROM users",
      values: null,
    });
    console.log(items);
    return { props: { items: JSON.parse(JSON.stringify(items)) } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
