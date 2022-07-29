import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import styled from "styled-components";
import PostCard from "../components/UI/PostCard";
import { useInView } from "react-intersection-observer";

import axios from "axios";
import { loadMyInfo, loadUser, userInfo } from "../actions/user";
import { loadPosts, loadPost } from "../actions/post";
import wrapper from "../store/configureStore";

import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// ######################################################## //
// ######################################################## //

async function fetchProjects(page = 0) {
  const id = window.location.href.substring(22);
  const { data } = await axios.get(`/posts?id=${id}`);
  return data;
}

const IndexPage = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(0);
  const router = useRouter();

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    { keepPreviousData: true, staleTime: 5000 }
  );

  const dispatch = useDispatch();
  // const { id } = router.query;
  const {
    postStack,
    mainPosts,
    loadPostsLoading,
    hasMorePosts,
    singlePost,
    singleStack,
  } = useSelector((state) => state.post);
  const { loadUser } = useSelector((state) => state.user);
  const [ref, inView] = useInView();

  useEffect(() => {
    console.log("라우터", router);
    console.log("데이터", data?.posts);
    console.log("데이터길이", data?.numbering);
    // console.log("넘어레이", numberingArr);
    console.log("메인 싱글포스트", singlePost);
    console.log("메인 싱글스택", singlePost);
    console.log("메인 메인포스트", mainPosts);
    console.log("메인 포스텍", postStack);
  });

  // const numberingArr = new Array(data?.numbering); // new Array(3)
  // const numberLink = numberingArr.map((v, i, z) => <button>{z}</button>);
  // numberingArr.map((v, i) => <button />);

  return (
    <div style={{ background: "#e87777" }}>
      <Layout />
      <MainDiv>
        <SearchDiv>서치 폼</SearchDiv>
        {/* <div></div> */}
        <CardDiv>
          {data?.posts &&
            data.posts.map((post) => <PostCard key={post.id} post={post} />)}
          {/* {mainPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))} */}
        </CardDiv>
        <PageDiv>
          <button></button>
          {/* {numberingArr && numberingArr.map((v, i) => <button />)} */}
          <div>
            {data?.numbering.map((v) => (
              <button />
            ))}
          </div>
          <button></button>
        </PageDiv>
      </MainDiv>
      {/* </Layout> */}
    </div>
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
    await context.store.dispatch(loadPosts());
    // await context.store.dispatch(loadPost({ postId: context.params.id }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default IndexPage;

// ############################################################## //

const PageDiv = styled.div`
  width: 100%;
  height: 150px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #e87777;
  button {
    width: 50px;
    height: 25px;
  }
`;

const CardDiv = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* background: #e87777; */
`;

const SearchDiv = styled.div`
  width: 100%;
  height: 110px;

  /* z-index: 1; */

  /* background: #e87777; */
`;

const MainDiv = styled.div`
  margin-left: 5%;

  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */

  width: 90%;
  height: 100rem;
  /* height: 1; */

  /* z-index: 1; */

  background: #f6f1f1;
`;
