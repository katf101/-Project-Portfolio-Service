import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import SlideForm from "../components/SlideForm";
import MyForm from "../components/MyForm";
import styled from "styled-components";

import axios from "axios";
import { loadMyInfo } from "../actions/user";
import { loadPosts, loadPost } from "../actions/post";
import wrapper from "../store/configureStore";
import { backendUrl, frontUrl } from "../config/config";
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
  // const { me } = useSelector((state) => state.user);
  // useEffect(() => {
  //   console.log("propsess", process.env.NODE_ENV);
  //   console.log("backendUrl", backendUrl);
  //   console.log("frontUrl", frontUrl);
  //   console.log("me", me);
  // });

  return (
    <MainDiv>
      <MiddleDiv>
        <SlideForm />
        <div>
          <MyForm />
        </div>
      </MiddleDiv>
    </MainDiv>
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

const MiddleDiv = styled.div`
  /* margin-top: 20px; */
  position: absolute;
  bottom: -3.28vw;
  width: 100%;
  height: 36.46vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* border: 1px solid #000000; */
  /* background: #000000; */
  /* background: #fafdff; */
  background: #826f66; /* fallback for old browsers */
`;

const MainLogoDiv = styled.div`
  /* margin-top: px; */
  width: 100%;
  height: 150px;

  display: flex;
  align-items: flex-end;
  justify-content: center;
  div {
    width: 500px;
    height: 150px;

    display: flex;
    justify-content: center;
    align-items: flex-end;

    /* background: #fafdff; */
  }
  /* background: #d9d9d9; */
`;

const MainDiv = styled.div`
  /* margin-left: 5%; */

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 770px;
  /* height: 1; */

  /* z-index: 1; */

  background: #fafdff;
`;
