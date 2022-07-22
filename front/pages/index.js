import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import PostCard from "../components/UI/PostCard";

import axios from "axios";
import { loadMyInfo } from "../actions/user";
import wrapper from "../store/configureStore";

// ######################################################## //
const Home = () => {
  return (
    <Layout>
      <MainDiv>
        <div>서치 폼</div>
        <div></div>
        <PostCard></PostCard>
      </MainDiv>
    </Layout>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    // await context.store.dispatch(loadPosts());
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Home;

// ############################################################## //

const MainDiv = styled.div`
  margin-left: 5%;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  height: 960px;
  background: #d9d9d9;
  div {
    &:nth-child(1) {
      width: 100%;
      height: 110px;

      background: #e87777;
    }
  }
`;
