import { GetServerSideProps } from "next";
import { User } from "../../interfaces";
import Layout from "../../components/Layout";
import ListDetail from "../../components/ListDetail";

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
    const [item] = await fetch(`http://localhost:3000/api/users/getUser?id=${id}`).then((res) => res.json());
    return { props: { item } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
