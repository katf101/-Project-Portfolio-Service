import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import Layout from "../components/Layout";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Footer from "../components/Footer";

const Portfolio = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta charSet="utf-8" />
            <title>포폴사이트</title>
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
            <Footer />
          </Layout>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};
Portfolio.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.any.isRequired,
};

export default wrapper.withRedux(Portfolio);
