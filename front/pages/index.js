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

// ######################################################## //
// ######################################################## //

const Home = () => {
  const [search, setSearch] = useState("");
  const onInputChange = (e) => {
    setSearch(e.target.value);
  };

  const onButtonHandler = () => {
    Router.push(`/jobhunt?search=${search}`);
  };

  return (
    // <div
    //   style={{
    //     background: "#e87777",
    //     // paddingTop: "15px",
    //     // marginTop: "100px",
    //   }}
    // >
    <div>
      {/* <Layout> */}
      <MainDiv>
        <SearchMainDiv>
          <div>
            <input value={search} onChange={onInputChange} type="text" />
            <button onClick={onButtonHandler}></button>
          </div>
        </SearchMainDiv>
        <RankMainDiv>
          <div></div>
        </RankMainDiv>
      </MainDiv>
      {/* </Layout> */}
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

const SearchMainDiv = styled.div`
  /* padding-top: 40px; */
  margin-top: 40px;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #79d2cd; */

  div {
    width: 100%;
    height: 125px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #4461ab;
  }

  input {
    padding: 5px;
    width: 330px;
    height: 35px;

    background: #d9f9f9;
    border-radius: 10px 0px 0px 10px;
  }

  button {
    width: 49px;
    height: 49px;

    background: #c99a9a;
    border-radius: 0px 10px 10px 0px;
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
