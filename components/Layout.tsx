import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import scripts, { MenuScrtipt } from "../scripts/menu";

const languages: any = {
  ja: 0,
  ko: 1,
};

type Props = {
  children?: ReactNode;
  title?: string;
  bodyClass?: string;
  script?: MenuScrtipt;
};

const Layout = ({ children, title = "This is the default title", bodyClass }: Props) => {
  const router = useRouter();
  const locale = router.locale as string;
  let index = 0;
  if (locale) index = languages[locale as string];
  const script = scripts[index];
  return (
    <div id="app">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header script={script} />
      <div id="app-body" className={`${bodyClass || ""}`}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

const Header = ({ script }: Props) => {
  const [langSetter, setLangSetter] = useState(false);
  return (
    <header>
      <nav>
        <Link href="/">
          <a>{script?.home}</a>
        </Link>{" "}
        |{" "}
        <Link href="/newQuestion">
          <a>{script?.makeNewQuestion}</a>
        </Link>{" "}
        |{" "}
        <Link href="/users">
          <a>Users List</a>
        </Link>{" "}
        | <a href="/api/users">Users API</a>
      </nav>
      <button onClick={() => setLangSetter(true)}>
        <FontAwesomeIcon icon={faGlobe} />
      </button>
      {langSetter && <LocaleChanger setLangSetter={setLangSetter} />}
    </header>
  );
};

interface LocaleChangerProps {
  setLangSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

const LocaleChanger = ({}: LocaleChangerProps) => {
  const router = useRouter();
  const toJapanese = () => {
    router.push(router.route, router.route, { locale: "ja" });
  };
  const toKorean = () => {
    router.push(router.route, router.route, { locale: "ko" });
  };
  return (
    <div id="language-setter">
      <span onClick={toJapanese}>日本語</span>
      <span onClick={toKorean}>한국어</span>
    </div>
  );
};

const Footer = () => (
  <footer>
    <span>survey prototype All Rights are Reserved</span>
  </footer>
);

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Get the paths we want to pre-render based on users
//   const paths = scrtips.map((sheet) => ({
//     params: { id: sheet.id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// };

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.

export default Layout;
