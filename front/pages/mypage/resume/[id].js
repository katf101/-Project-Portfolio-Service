import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { loadMyInfo } from "../../../actions/user";
import { loadPost, loadPosts, loadStack } from "../../../actions/post";
import Head from "next/head";

import Layout from "../../../components/Layout";
import ResumeForm from "../../../components/ResumeForm";
import ResumeImage from "../../../components/ResumeImage";

import wrapper from "../../../store/configureStore";

const Resume = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost, singleStack } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const [imageData, setImageData] = useState("");

  async function getImage() {
    try {
      const { data } = await axios.get(`/image?info=${me.id}`);
      return setImageData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("이미지", getImage());
    console.log("이미지", imageData);
    console.log("resume, 싱글포스", singlePost);
    console.log("resume, 싱글스택", singleStack);
    console.log("resume, 미", me);
  }, [singlePost, singleStack, loadStack]);

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
        <ResumeImage imagedata={imageData.src} />
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
    await context.store.dispatch(loadStack({ userId: context.params.id }));
    await context.store.dispatch(loadPost({ postId: context.params.id }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Resume;
