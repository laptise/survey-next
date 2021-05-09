import { GetServerSideProps } from "next";
import { User } from "../../interfaces";
import Layout from "../../components/Layout";
import ListDetail from "../../components/ListDetail";
import excuteQuery from "../../db";

type Props = {
  item?: User;
  errors?: string;
};

const StaticPropsDetail = ({ item, errors }: Props) => {
  console.log(item);
  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return <Layout title={`${item ? item.name : "User Detail"} | Next.js + TypeScript Example`}>{item && <ListDetail item={item} />}</Layout>;
};

export default StaticPropsDetail;

// すべてのリクエストの度に実行される
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const id = params?.id;
    const [item] = await excuteQuery({
      query: "SELECT * FROM users WHERE id = ?",
      values: id,
    });
    return { props: { item: JSON.parse(JSON.stringify(item)) } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
