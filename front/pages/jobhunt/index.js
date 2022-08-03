import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import Layout from "../../components/Layout";
import styled from "styled-components";
import PostCard from "../../components/UI/PostCard";
import Link from "next/link";

import axios from "axios";
import { loadMyInfo, loadUser, userInfo } from "../../actions/user";
import { loadPosts, loadPost, addStack } from "../../actions/post";
import wrapper from "../../store/configureStore";

import {
  dehydrate,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import SearchForm from "../../components/SearchForm";

// ######################################################## //
// ######################################################## //

async function fetchProjects(page = 0) {
  // async function fetchProjects(page = window.location.href.substring(37)) {
  const id = window.location.href.substring(30, 36);
  const idValue = window.location.href.substring(37);
  const pageValue = window.location.href.substring(35);
  console.log("page", page);
  console.log("id", id);
  console.log("pageValue", pageValue);
  console.log("id1", window.location.href.substring(37));
  console.log("id2", window.location.search);
  console.log("id3", window.location);
  console.log("test");
  //   console.log("page", page);

  if (id === "search") {
    const { data } = await axios.get(`/posts?search=${idValue}`);
    return data;
  } else {
    const { data } = await axios.get(`/posts?page=${pageValue}`);
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
  const [page, setPage] = React.useState(1); // 리액트-쿼리 페이지
  const [pageNum, setPageNum] = useState(1); // 현재 페이지 넘버
  const [btnIndex, setBtnIndex] = useState(0);

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
    if (router.query.page < 3) {
      setPageNum(1);
      // console.log(prev);
    } else if (btnIndex === "0") {
      setPageNum((prev) => prev - 1);
      // setCurrentPageNum(router.query.page);
    } else if (btnIndex === "2") {
      setPageNum((prev) => prev + 1);
    } else if (btnIndex === ">>") {
      setPageNum(Math.ceil(data?.numbering.length / 5) - 1);
    }

    if (router.asPath === "/jobhunt") {
      setPage("http://localhost:3000/jobhunt");
      setPageNum(1);
    }
    if (router.query?.page) {
      setPage(`http://localhost:3000/jobhunt?page=${router.query.page}`);
      // setBtnIndex(router.query.page);
    }
    if (router.query?.search) {
      setPage(
        `http://localhost:3000/jobhunt?search=${router.query.search}&page=${router.query.page}`
      );
      setPageNum(1);
    }
    // if (router.asPath !== "/jobhunt") {
    //   setPage(`http://localhost:3000/jobhunt?search=${router.query.search}`);
    // }
  }, [router]);

  useEffect(() => {
    console.log("싱글스택", data);
    console.log("버튼인덱스", btnIndex);
    console.log("쿼리클라이언트", queryClient);
    console.log("라우터쿼리인덱스", router.query.id);
    console.log("라우터쿼리", router.query);
    console.log("Router", Router);
    console.log("페이지", page);
    console.log("이전url", document.referrer);
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
  }, [
    queryClient,
    page,
    router,
    data,
    singlePost,
    mainPosts,
    postStack,
    singleStack,
  ]);

  const onPagePush = (e) => {
    console.log("타겟", e.target.value);
    console.log("인덱스", e.target.dataset.index);
    setPage(e.target.value);
    // setBtnIndex(router.query.page);
    setBtnIndex(e.target.dataset.index);
    // setPage(router.query.index);
    // setPage(router.query.id);
    // Router.replace(`/jobhunt/${e.target.value}`);
    if (router.query?.page && router.query?.search) {
      return Router.replace(
        `/jobhunt?search=${router.query.search}&page=${e.target.value}`
      );
    } else if (router.query?.search) {
      return Router.replace(
        `/jobhunt?search=${router.query.search}&page=${e.target.value}`
      );
    }
    Router.replace(`/jobhunt?page=${e.target.value}`);
    queryClient.invalidateQueries("projects");
  };

  // const onEndPush = (e) => {
  //   // setPage(e.target.value);
  //   setBtnIndex(e.target.dataset.index);
  //   setPageNum(e.target.value);
  // };

  return (
    <div>
      {/* <div style={{ background: "#e87777" }}> */}
      {/* <Layout /> */}
      <MainDiv>
        <SearchForm></SearchForm>
        {/* <SearchDiv>서치 폼</SearchDiv> */}
        {/* <div></div> */}
        <CardDiv>
          {data?.posts &&
            data.posts.map((post) => (
              <PostCard key={post.id} post={post} stack={singlePost} />
            ))}
          {/* {mainPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))} */}
        </CardDiv>
        <PageDiv>
          <button value={1} onClick={onPagePush}>
            {"<"}
          </button>
          {/* {numberingArr && numberingArr.map((v, i) => <button />)} */}
          <div>
            {data?.numbering.map((v, i) =>
              i < Math.ceil(data?.numbering.length / 5) ? (
                i < 3 ? (
                  <button
                    key={i}
                    value={i + pageNum}
                    data-index={i}
                    onClick={onPagePush}
                    disabled={router.query.page > 1 && i === 1 ? true : false}
                  >
                    {i + pageNum}
                  </button>
                ) : (
                  ""
                )
              ) : (
                ""
              )
            )}
          </div>
          <button
            value={Math.ceil(data?.numbering.length / 5)}
            data-index={">>"}
            onClick={onPagePush}
          >
            {">"}
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
  height: 150px;

  display: flex;
  align-items: center;
  justify-content: center;

  /* background: #e87777; */
  button {
    width: 50px;
    height: 25px;

    /* Rectangle 46 */

    background: #ffffff;
    border: 1px solid #a7dfff;
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

const MainDiv = styled.div`
  margin-left: 5%;
  width: 90%;
  height: 1000px;

  /* background: #f6f1f1; */
`;
