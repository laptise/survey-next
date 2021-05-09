import { GetStaticProps } from "next";
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
      Example fetching data from inside <code>getStaticProps()</code>.
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await excuteQuery({
    query: "SELECT * FROM users",
    values: null,
  }).then((res) => JSON.parse(JSON.stringify(res)));
  console.log(res);
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  return { props: { items: res } };
};

export default WithStaticProps;
