import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Router, { useRouter } from "next/router";

import axios from "axios";
import { loadMyInfo, loadUser, userInfo } from "../../actions/user";
import { loadPosts, loadPost, loadStack } from "../../actions/post";
import wrapper from "../../store/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const dispatch = useDispatch();
  const { singleStack } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const route = useRouter();
  const userInfo = new Object();
  userInfo = route.query["postInfo"];
  let fruitKeys = Object.keys(route.query);

  const stack = singleStack;

  useEffect(() => {
    console.log("싱글스택", stack);
    console.log("싱글스택", singleStack);
    console.log("라우터", route);
    console.log("라우터쿼리", route.query);
    console.log("유저아디", route.query.postUserId);
    console.log("네임", route.query.postName.slice(1, -1));
    console.log("인트로", route.query.postIntro.slice(1, -1));
    console.log("좝", route.query.postJob.slice(1, -1));
    console.log("포지션", route.query.postPosition.slice(1, -1));
    console.log("유저", route.query.postCareer.slice(1, -1));
    // console.log("유저", route.query.postName.slice(1, -1));
    console.log("포폴", route.query.postPofol.slice(1, -1));
    console.log("블로그", route.query.postBlog.slice(1, -1));
    console.log("깃", route.query.postGit.slice(1, -1));
    // console.log("유저인포", userInfo["id"]);
  }, [route, singleStack]);

  useEffect(() => {
    dispatch(
      loadStack({
        userId: 18,
        // UserId: route.query.postUserId,
      })
    );
  }, []);

  return (
    <Layout>
      <MainDiv>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </MainDiv>
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
    // await context.store.dispatch(loadStack({ userId: context.params.id }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Detail;

const MainDiv = styled.div`
  width: 100%;
  /* height: 1319px; */
  /* height: 1319px; */

  background: #f3f9fa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  div {
    :nth-child(1) {
      width: 100%;
      height: 164px;

      /* background: #fec6c6; */
    }
    :nth-child(2) {
      width: 100%;
      height: 50px;

      /* background: #cf7e7e; */
    }
    :nth-child(3) {
      width: 100%;
      height: 215px;

      /* background: #aabdfe; */
    }
    :nth-child(4) {
      width: 100%;
      height: 43px;

      /* background: #273257; */
    }
    :nth-child(5) {
      width: 100%;
      height: 63px;

      /* background: #d69deb; */
    }
    :nth-child(6) {
      width: 100%;
      height: 100px;

      /* background: #dfc2e9; */
    }
    :nth-child(7) {
      width: 100%;
      height: 100px;

      /* background: #946286; */
    }
    :nth-child(8) {
      width: 100%;
      height: 144px;

      /* background: #d68791; */
    }
    :nth-child(9) {
      width: 100%;
      height: 109px;

      /* background: #bdd687; */
    }
    :nth-child(10) {
      width: 100%;
      height: 296px;

      /* background: #d6e8b1; */
    }
    :nth-child(11) {
      width: 100%;
      height: 200px;

      /* background: #ffe2d9; */
    }
  }
`;
