import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadMyInfo } from "../../../actions/user";
import { loadPost, loadPosts, loadStack } from "../../../actions/post";
import Head from "next/head";

import ResumeForm from "../../../components/ResumeForm";
import wrapper from "../../../store/configureStore";

const Resume = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost, singleStack } = useSelector((state) => state.post);

  return (
    <>
      <Head>
        <meta property="og:title" />
        <meta
          property="og:url"
          content={`https://localhost3000/mypage/resume/${id}`}
        />
      </Head>
      <ResumeForm post={singlePost} />
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    // await context.store.dispatch(loadPost({ postId }));
    await context.store.dispatch(loadPosts());
    await context.store.dispatch(loadStack({ userId: context.params.id }));
    await context.store.dispatch(loadPost({ postId: context.params.id }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Resume;
