import { GetStaticPaths, GetStaticProps } from "next";
import Layout from "../../components/Layout";
import { Question, RadioSelect, SurveySheet } from "../../interfaces";
import { surveySheets } from "../../utils/sample-data";

interface Props {
  sheet: SurveySheet;
}

export default function Survey({ sheet }: Props) {
  console.log(sheet);
  return (
    <Layout title={`${sheet.title} | Survey-next`}>
      <h1>{sheet.title}</h1>
      {sheet.createdAt && <small>{sheet.createdAt.toLocaleString()}</small>}
      {sheet.questions?.map((question, index) => (
        <SheetQuestion key={index} question={question} index={index} />
      ))}
    </Layout>
  );
}

type SheetQuestionProps = {
  question: Question;
  index: number;
};

function SheetQuestion({ question, index }: SheetQuestionProps) {
  const { questionType } = question;
  return (
    <div className={`single-question`}>
      <span className="title">
        {index + 1}. {question.title}
      </span>
      {questionType === "input" && <InputComponent />}
      {questionType === "radioSelect" && <RadioSelectComponent index={index} radioSelect={question.answer as RadioSelect} />}
    </div>
  );
}

type InputComponent = {
  index: number;
};

const InputComponent = () => <input autoComplete={"off"} spellCheck={false} />;

type RadioSelectProps = {
  index: number;
  radioSelect: RadioSelect;
};

function RadioSelectComponent({ radioSelect, index }: RadioSelectProps) {
  const { options } = radioSelect;
  return (
    <>
      {options.map((option) => (
        <label key={option.value}>
          <input value={option.value} name={`${index}`} type="radio" />
          <span>{option.label}</span>
        </label>
      ))}
    </>
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
