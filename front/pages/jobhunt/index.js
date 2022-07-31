import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styled from "styled-components";
import PostCard from "../../components/UI/PostCard";
import Link from "next/link";

import axios from "axios";
import { loadMyInfo, loadUser, userInfo } from "../../actions/user";
import { loadPosts, loadPost } from "../../actions/post";
import wrapper from "../../store/configureStore";

import {
  dehydrate,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// ######################################################## //
// ######################################################## //

async function fetchProjects(page = 0) {
  // async function fetchProjects(page = window.location.href.substring(37)) {
  const id = window.location.href.substring(30, 36);
  const idValue = window.location.href.substring(37);
  console.log("page", page);
  console.log("id", id);
  console.log("id1", window.location.href.substring(36));
  console.log("id2", window.location.search);
  console.log("id3", window.location);
  console.log("test");
  //   console.log("page", page);

  if (id === "search") {
    const { data } = await axios.get(`/posts?search=${idValue}`);
    return data;
  } else {
    const { data } = await axios.get(`/posts?page=${page}`);
    return data;
  }

  // const { data } = await axios.get(`/posts?page=${page}`);
  // const { data } = await axios.get(`/posts?search=${page}`);
  // return data;
}

const IndexPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { id } = router.query;
  //   const [page, setPage] = React.useState(router.query.index);
  //   const [page, setPage] = React.useState(0);
  const [page, setPage] = React.useState(0);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    {
      onSuccess: (data) => {
        console.log("온석세스", data);
      },
      keepPreviousData: true,
      staleTime: 5000,
    }
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

  // React.useEffect(() => {
  //   if (data?.hasMore) {
  //     queryClient.prefetchQuery(["projects", page + 1], () =>
  //       fetchProjects(page + 1)
  //     );
  //   }
  // }, [data, page, queryClient]);
  useEffect(() => {
    console.log("유즈이펙트", page);
    if (router.asPath === "/jobhunt") {
      setPage("http://localhost:3000/jobhunt");
    }
    // if (router.asPath !== "/jobhunt") {
    //   setPage(`http://localhost:3000/jobhunt?search=${router.query.search}`);
    // }
  }, [router]);

  useEffect(() => {
    console.log("쿼리클라이언트", queryClient);
    console.log("라우터쿼리인덱스", router.query.id);
    console.log("라우터쿼리", router.query);
    console.log("페이지", page);
    console.log("라우터", router);
    console.log("라우터패스", router.asPath);
    console.log("라우터쿼리", router.query);
    console.log("데이터", data?.posts);
    console.log("데이터길이", data?.numbering);
    // console.log("넘어레이", numberingArr);
    console.log("메인 싱글포스트", singlePost);
    console.log("메인 싱글스택", singlePost);
    console.log("메인 메인포스트", mainPosts);
    console.log("메인 포스텍", postStack);
  }, [queryClient, page, router, data, singlePost, mainPosts, postStack]);

  const onPagePush = (e) => {
    console.log("타겟", e.target.value);
    setPage(e.target.value);
    // setPage(router.query.index);
    // setPage(router.query.id);
    // Router.replace(`/jobhunt/${e.target.value}`);
    Router.replace(`/jobhunt?page=${e.target.value}`);
    queryClient.invalidateQueries("projects");
  };

  return (
    <div style={{ background: "#e87777" }}>
      {/* <Layout /> */}
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
          <button value={1} onClick={onPagePush}>
            {"<<"}
          </button>
          {/* {numberingArr && numberingArr.map((v, i) => <button />)} */}
          <div>
            {data?.numbering.map((v, i) =>
              i < 3 ? (
                // <Link href={`/${i + 1}`}>
                <button key={i + 1} value={i + 1} onClick={onPagePush}>
                  {i + 1}
                </button>
              ) : (
                // </Link>
                ""
              )
            )}
          </div>
          <button
            value={Math.ceil(data?.numbering.length / 5)}
            onClick={onPagePush}
          >
            {">>"}
          </button>
        </PageDiv>
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

export default IndexPage;

// ############################################################## //

const PageDiv = styled.div`
  /* position: fixed; */
  width: 100%;
  height: 25px;

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
  height: 540px;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* background: #e87777; */
`;

const SearchDiv = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 250px;

  /* z-index: 1; */

  background: #8d54ba;
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
