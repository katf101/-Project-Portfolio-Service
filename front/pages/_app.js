import React from "react";
import Head from "next/head";
import Layout from "../components/Layout";

const SNS = ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <title>SNS</title>
    </Head>
    <Component />
  </>
);

export default SNS;
