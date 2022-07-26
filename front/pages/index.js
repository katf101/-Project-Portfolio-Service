import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../components/Layout";
import styled from "styled-components";
import PostCard from "../components/UI/PostCard";
import { useInView } from "react-intersection-observer";

import axios from "axios";
import { loadMyInfo } from "../actions/user";
import { loadPosts } from "../actions/post";
import wrapper from "../store/configureStore";

// ######################################################## //
const Home = () => {
  const dispatch = useDispatch();
  const { mainPosts, loadPostsLoading, hasMorePosts } = useSelector(
    (state) => state.post
  );
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasMorePosts && !loadPostsLoading) {
      const lastId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(
        loadPosts({
          lastId,
        })
      );
    }
  }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

  // useEffect(() => {
  //   function onScroll() {
  //     // window.scrollY : 얼마나 내렸는지
  //     // document.documentElement.clientHeight : 화면에 보이는 길이
  //     // document.documentElement.scrollHeight : 총길이
  //     if (hasMorePosts && !loadPostsLoading) {
  //       if (
  //         window.scrollY + document.documentElement.clientHeight >
  //         document.documentElement.scrollHeight - 100
  //       ) {
  //         const lastId = mainPosts[mainPosts.length - 1]?.id;
  //         dispatch(
  //           loadPosts({
  //             lastId,
  //           })
  //         );
  //       }
  //     }
  //   }
  //   window.addEventListener("scroll", onScroll);
  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, [hasMorePosts, loadPostsLoading, mainPosts]);

  return (
    <Layout>
      <MainDiv>
        <SearchDiv>서치 폼</SearchDiv>
        {/* <div></div> */}
        <CardDiv>
          {mainPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          <div
            ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
            style={{ height: 10 }}
          />
        </CardDiv>
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
    await context.store.dispatch(loadPosts());
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Home;

// ############################################################## //

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

  background: #e87777;
`;

const MainDiv = styled.div`
  margin-left: 5%;

  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: center; */

  width: 90%;
  /* height: 960px; */
  /* height: 1; */

  z-index: 1;

  background: #d9d9d9;
`;
