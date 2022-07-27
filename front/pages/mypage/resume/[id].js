import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadMyInfo } from "../../../actions/user";
import { loadPost, loadPosts } from "../../../actions/post";
import Head from "next/head";

import Layout from "../../../components/Layout";
import ResumeForm from "../../../components/ResumeForm";
import ResumeImage from "../../../components/ResumeImage";

import wrapper from "../../../store/configureStore";

const Resume = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  useEffect(() => {
    // console.log("게시글정보", mainPosts);
    // console.log("유저정보", me);
    console.log("투미", singlePost);
  }, [singlePost]);

  return (
    <Layout>
      {/* {singlePost && ( */}
      <>
        <Head>
          <meta
            property="og:title"
            // content={`${singlePost.User.name}님의 게시글`}
          />
          <meta
            property="og:url"
            content={`https://localhost3000/mypage/resume/${id}`}
          />
        </Head>
        <ResumeImage />
        <ResumeForm post={singlePost} />
      </>
      {/* )} */}
    </Layout>
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
    await context.store.dispatch(loadPost({ postId: context.params.id }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Resume;
