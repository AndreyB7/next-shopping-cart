import React, { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";

type Props = {
  children: ReactNode;
  title?: string;
  company?: string | string[];
};

const Layout = ({
  children,
  title = "LMS Shopping Cart",
  company = "",
}: Props) => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thorwebdev" />
      <meta name="twitter:title" content="LMS Shopping Cart" />
      <meta
        name="twitter:description"
        content=""
      />
      <meta
        name="twitter:image"
        content="/cource-placeholder@4x.jpg"
      />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
    </Head>
    <div className="container">
      <header>
        <div className="header-content">
          <Link href="/">
            <a className="logo">
              <img src="/paktolus-logo.svg" />
            </a>
          </Link>
          <h1>
            <span className="light">LMS Shopping Cart</span>
            <br />
            Company:<br/> {company || 'not specified' }
          </h1>
        </div>
      </header>
      <main className="page-container">{children}</main>
    </div>
  </>
);

export default Layout;
