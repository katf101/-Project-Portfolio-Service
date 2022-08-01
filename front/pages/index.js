import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import styled from "styled-components";
import PostCard from "../components/UI/PostCard";
import Link from "next/link";

import axios from "axios";
import { loadMyInfo, loadUser, userInfo } from "../actions/user";
import { loadPosts, loadPost } from "../actions/post";
import wrapper from "../store/configureStore";

import {
  dehydrate,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import SearchForm from "../components/SearchForm";

// ######################################################## //
// ######################################################## //

const Home = () => {
  return (
    <div>
      <Layout>
        <MainDiv>
          <SearchForm />
          <RankMainDiv>
            <div></div>
          </RankMainDiv>
        </MainDiv>
      </Layout>
    </div>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery("posts", () => fetchPosts(10));

    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadPosts());
    // await context.store.dispatch(loadPost({ postId: context.params.id }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);

export default Home;

// ############################################################## //

const RankMainDiv = styled.div`
  width: 100%;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #8d54ba;

  div {
    :nth-child(1) {
      width: 500px;
      height: 250px;

      background: #d9d9d9;
    }
  }
`;

const MainDiv = styled.div`
  /* margin-left: 5%; */

  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */

  width: 100%;
  height: 100rem;
  /* height: 1; */

  /* z-index: 1; */

  background: #fafdff;
`;
