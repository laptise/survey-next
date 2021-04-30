import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import { SurveySheet } from "../../interfaces";
import { surveySheets } from "../../utils/sample-data";

interface Props {
  sheet: SurveySheet;
}

export default function Survey({ sheet }: Props) {
  console.log(sheet);
  return (
    <Layout title="설문 | Survey-next">
      <h1>{sheet.id}</h1>
      {sheet.questions?.map((question, index) => (
        <div key={index}>{question.title}</div>
      ))}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const paths = surveySheets.map((sheet) => ({
    params: { id: sheet.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const id = params?.id;
    const item = JSON.parse(JSON.stringify(surveySheets.find((data) => data.id === id)));
    // By returning { props: item }, the StaticPropsDetail component
    // will receive `item` as a prop at build time
    return { props: { sheet: item } };
  } catch (err) {
    return { props: { errors: err.message } };
  }
};
