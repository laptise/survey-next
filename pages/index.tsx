import { faCode, faPaperPlane, faPen, faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Link from "next/link";
import Layout from "../components/Layout";
import scripts, { MainPageScript } from "../scripts/mainPage";

const languages: any = {
  ja: 0,
  ko: 1,
};

type IndexProps = {
  scripts: MainPageScript;
};

const IndexPage = (props: IndexProps) => {
  const { scripts } = props;
  return (
    <Layout title={`${scripts.pageTitle} | survey-next`}>
      <h1 style={{ textAlign: "center" }}>Survey prototype!</h1>
      <small style={{ textAlign: "center", display: "block", margin: 20 }}>{scripts.titleDesc}</small>
      <div style={{ flexDirection: "row", display: "flex", flexWrap: "wrap" }}>
        <AddNewQuestionSection {...props} />
        <HowToSection {...props} />
        <DevSection {...props} />
        <FeaturesSection {...props} />
      </div>
    </Layout>
  );
};

const AddNewQuestionSection = ({ scripts }: IndexProps) => (
  <div className="main-section">
    <FontAwesomeIcon className="section-icon" icon={faPaperPlane} />
    <h2>{scripts.addNewSectionTitle}</h2>
    <p>{scripts.addNewSectionDesc}</p>
    <Link href="/newQuestion">
      <button>{scripts.addNewSectionRegistButtonLabel}</button>
    </Link>
  </div>
);

const HowToSection = ({ scripts }: IndexProps) => (
  <div className="main-section">
    <FontAwesomeIcon className="section-icon" icon={faPen} />
    <h2>{scripts.howtoSectionTitle}</h2>
    <p>{scripts.howtoSectionDesc}</p>
  </div>
);

const DevSection = ({ scripts }: IndexProps) => (
  <div className="main-section">
    <FontAwesomeIcon className="section-icon" icon={faCode} />
    <h2>{scripts.devSectionTitle}</h2>
    <p>{scripts.devSectionDesc}</p>
    <Link href="/survey/test">
      <button>{scripts.devSectionButtonLabel}</button>
    </Link>
  </div>
);

const FeaturesSection = ({ scripts }: IndexProps) => (
  <div className="main-section">
    <FontAwesomeIcon className="section-icon" icon={faTools} />
    <h2>{scripts.featuresSectionTitle}</h2>
    <p>{scripts.featuresSectionDesc}</p>
    <Link href="/survey/test">
      <button>{scripts.featuresSectionButtonLabel}</button>
    </Link>
  </div>
);

// export const getStaticProps: GetStaticProps = async ({ params, query }) => {
//   console.log(params);
//   return {
//     props: {
//       scripts: scripts[0],
//     },
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  let index = 0;
  if (locale) index = languages[locale as string];
  return {
    props: {
      scripts: scripts[index],
    },
  };
};

export default IndexPage;
