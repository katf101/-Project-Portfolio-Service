import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";
import styled from "styled-components";
import PostCard from "../../components/UI/PostCard";

import axios from "axios";
import { loadMyInfo } from "../../actions/user";
import { loadPosts } from "../../actions/post";
import wrapper from "../../store/configureStore";
import { frontUrl } from "../../config/config";

import {
  dehydrate,
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import SearchForm from "../../components/SearchForm";
import Myform from "../../components/MyForm";
import Footer from "../../components/Footer";
import AllUserResume from "../../components/AllUserResume";

// ######################################################## //
// ######################################################## //

async function fetchProjects(page = 0) {
  // async function fetchProjects(page = window.location.href.substring(37)) {
  const id = window.location.href.substring(30, 36);
  // const idValue = window.location.href.substring(34);
  // const searchValue = window.location.href.substring(37); // 로컬
  // const pageValue = window.location.href.substring(35);
  const pageValue =
    process.env.NODE_ENV === "development"
      ? window.location.href.substring(35)
      : window.location.href.substring(34);
  const searchValue =
    process.env.NODE_ENV === "development"
      ? window.location.href.substring(37)
      : window.location.href.substring(36);

  console.log("page", page);
  console.log("id", id);
  console.log("pageValue", pageValue);
  console.log("id1", window.location.href.substring(34));
  console.log("id2", window.location.search);
  console.log("id3", window.location);
  console.log("test");
  //   console.log("page", page);

  if (id === "search") {
    const { data } = await axios.get(`/posts?search=${searchValue}`); // search = 프론트
    return data;
  } else {
    const { data } = await axios.get(`/posts?page=${pageValue}`); // page = 1
    return data;
  }

  // const { data } = await axios.get(`/posts?page=${page}`);
  // const { data } = await axios.get(`/posts?search=${page}`);
  // return data;
}

const IndexPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [stateId, setStateId] = useState(0);
  const [page, setPage] = React.useState(1); // 리액트-쿼리 페이지
  const [pageNum, setPageNum] = useState(1); // 현재 페이지 넘버
  const [btnIndex, setBtnIndex] = useState(0);

  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["projects", page],
    () => fetchProjects(page),
    {
      onSuccess: (data) => {
        console.log("온석세스", data.posts[0]?.UserId);
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
      setPage(`${frontUrl}jobhunt`);
      setPageNum(1);
    }
    if (router.query?.page) {
      setPage(`${frontUrl}jobhunt?page=${router.query.page}`);
      // setBtnIndex(router.query.page);
    }
    if (router.query?.search) {
      setPage(
        `${frontUrl}jobhunt?search=${router.query.search}&page=${router.query.page}`
      );
      setPageNum(1);
    }
    // if (router.asPath !== "/jobhunt") {
    //   setPage(`http://localhost:3000/jobhunt?search=${router.query.search}`);
    // }
  }, [router]);

  useEffect(() => {
    console.log("싱글스택", data);
    console.log("쿼리클라이언트", queryClient);
  }, [queryClient]);

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
  const [testId, setTestId] = useState(0);

  return (
    <>
      <MainDiv>
        <LeftDiv>
          <JobhuntLeftDiv>
            <CardDiv>
              {data?.posts &&
                data.posts.map((data, i) => (
                  <PostCard
                    key={data.id}
                    id={data.id}
                    post={data}
                    setTestId={setTestId}
                  />
                ))}
            </CardDiv>
            <PageDiv>
              <button value={1} onClick={onPagePush}>
                {"<"}
              </button>
              <div>
                {data?.numbering.map((v, i) =>
                  i < Math.ceil(data?.numbering.length / 5) ? (
                    i < 3 ? (
                      <button
                        key={i}
                        value={i + pageNum}
                        data-index={i}
                        onClick={onPagePush}
                        disabled={
                          router.query.page > 1 && i === 1 ? true : false
                        }
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
          </JobhuntLeftDiv>
          <JobhuntRightDiv>
            <AllUserResume
              testId={testId}
              postInfo={data?.posts}
              setStateId={setStateId}
            />
          </JobhuntRightDiv>
        </LeftDiv>
        <Myform />
      </MainDiv>
    </>
  );
};

// SSR (프론트 서버에서 실행)
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log("콘택", context);
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
    // await context.store.dispatch(loadPost({ postId: 3 }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);

export default IndexPage;

const PageDiv = styled.div`
  /* position: fixed; */
  width: 400px;
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
    border: 2px solid #3a3845;
  }
`;

const JobhuntRightDiv = styled.div`
  width: 44.27vw;
  height: 56.94vw;

  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  justify-content: center;
`;

const CardDiv = styled.div`
  width: 31.25vw;
  /* height: 36.46vw; */
  /* height: 1000px; */

  display: flex;
  flex-direction: column;
  align-items: center;

  /* background: #e87777; */
`;

const RightDiv = styled.div`
  position: sticky;
  right: 50px;
  margin-top: 50px;
  margin-bottom: 24.48vw;
  width: 19.27vw;
  height: 20.42vw;
  /* height: 26.04vw; */

  display: flex;
  justify-content: center;
  align-items: center;

  background: #eeeeee;
`;

const JobhuntLeftDiv = styled.div`
  width: 44.27vw;
  height: 56.94vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #000000; */
`;
const LeftDiv = styled.div`
  margin-top: 2.6vw;
  width: 72.92vw;
  /* height: 85.94vw; */
  height: 53.13vw;

  display: flex;
  justify-content: center;
  /* align-items: center; */

  /* background: #826f66; */
`;

const MainDiv = styled.div`
  /* position: absolute; */
  margin-bottom: -7.75vw;
  margin-top: 11.98vw;
  margin-left: -0.4vw;
  width: 99.17vw;
  right: 100vw;
  /* height: 2500px; */
  /* bottom: -27.08vw; */
  /* bottom: -540px; */
  /* border: 1px solid #000000; */
  display: flex;
  flex-direction: row;
  /* align-items: center; */

  background: #826f66;
`;
