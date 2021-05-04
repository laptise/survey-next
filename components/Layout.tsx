import React, { ReactNode, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children?: ReactNode;
  title?: string;
  bodyClass?: string;
};

const Layout = ({ children, title = "This is the default title", bodyClass }: Props) => (
  <div id="app">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <div id="app-body" className={`${bodyClass || ""}`}>
      {children}
    </div>
    <Footer />
  </div>
);

const Header = () => {
  const [langSetter, setLangSetter] = useState(false);
  return (
    <header>
      <nav>
        <Link href="/">
          <a>홈</a>
        </Link>{" "}
        |{" "}
        <Link href="/newQuestion">
          <a>새 질문 만들기</a>
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

const LocaleChanger = ({}: LocaleChangerProps) => (
  <div id="language-setter">
    <span onClick={() => (window.location.href = "./?lang=ja")}>日本語</span>
    <span onClick={() => (window.location.href = "./?lang=ko")}>한국어</span>
  </div>
);

const Footer = () => (
  <footer>
    <span>survey prototype All Rights are Reserved</span>
  </footer>
);

export default Layout;
