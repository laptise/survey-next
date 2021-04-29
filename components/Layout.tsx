import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div id="app">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <div id="app-body">{children}</div>
    <Footer />
  </div>
);

const Header = () => (
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
  </header>
);

const Footer = () => (
  <footer>
    <span>survey prototype All Rights are Reserved</span>
  </footer>
);

export default Layout;
