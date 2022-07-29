// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import Layout from "../components/Layout";
// import styled from "styled-components";
// import PostCard from "../components/UI/PostCard";
// import { useInView } from "react-intersection-observer";

// import axios from "axios";
// import { loadMyInfo, loadUser, userInfo } from "../actions/user";
// import { loadPosts, loadPost } from "../actions/post";
// import wrapper from "../store/configureStore";

// // import useSWR from "swr";
// // import fetcher from "../lib/tools/fetcher";
// import {
//   useQuery,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// // ######################################################## //

// // const url = "http://localhost:3060/posts";
// // const fetcher = (url) => axios.get(url).then((res) => res.data);

// // function Page({ index }) {
// //   // const { data } = useSWR(`/http://localhost:3060/posts=${index}`, fetcher);
// //   const { data } = useSWR(`/posts`, fetcher);

// //   // ... 로딩 및 에러 상태를 처리

// //   return data && data.map((item) => <div key={item.id}></div>);
// // }

// // ######################################################## //

// async function fetchProjects(page = 0) {
//   // const { data } = await axios.get("/posts/posts?page=" + page);
//   const { data } = await axios.get("/posts");
//   return data;
// }

// const Home = () => {
//   const queryClient = useQueryClient();
//   const [page, setPage] = React.useState(0);

//   const { status, data, error, isFetching, isPreviousData } = useQuery(
//     ["projects", page],
//     () => fetchProjects(page),
//     { keepPreviousData: true, staleTime: 5000 }
//   );

//   React.useEffect(() => {
//     if (data?.hasMore) {
//       queryClient.prefetchQuery(["projects", page + 1], () =>
//         fetchProjects(page + 1)
//       );
//     }
//   }, [data, page, queryClient]);

//   // const [pageIndex, setPageIndex] = useState(1);
//   // const { data, error } = useSWR(url, fetcher);
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { id } = router.query;
//   const {
//     postStack,
//     mainPosts,
//     loadPostsLoading,
//     hasMorePosts,
//     singlePost,
//     singleStack,
//   } = useSelector((state) => state.post);
//   const { loadUser } = useSelector((state) => state.user);
//   const [ref, inView] = useInView();

//   useEffect(() => {
//     // console.log("데이터", data);
//     console.log("메인 싱글포스트", singlePost);
//     console.log("메인 싱글스택", singlePost);
//     console.log("메인 메인포스트", mainPosts);
//     console.log("메인 포스텍", postStack);
//   });

//   // useEffect(() => {
//   //   if (inView && hasMorePosts && !loadPostsLoading) {
//   //     const lastId = mainPosts[mainPosts.length - 1]?.id;
//   //     dispatch(
//   //       loadPosts({
//   //         lastId,
//   //       })
//   //     );
//   //   }
//   // }, [inView, hasMorePosts, loadPostsLoading, mainPosts]);

//   // useEffect(() => {
//   //   function onScroll() {
//   //     // window.scrollY : 얼마나 내렸는지
//   //     // document.documentElement.clientHeight : 화면에 보이는 길이
//   //     // document.documentElement.scrollHeight : 총길이
//   //     if (hasMorePosts && !loadPostsLoading) {
//   //       if (
//   //         window.scrollY + document.documentElement.clientHeight >
//   //         document.documentElement.scrollHeight - 100
//   //       ) {
//   //         const lastId = mainPosts[mainPosts.length - 1]?.id;
//   //         dispatch(
//   //           loadPosts({
//   //             lastId,
//   //           })
//   //         );
//   //       }
//   //     }
//   //   }
//   //   window.addEventListener("scroll", onScroll);
//   //   return () => {
//   //     window.removeEventListener("scroll", onScroll);
//   //   };
//   // }, [hasMorePosts, loadPostsLoading, mainPosts]);

//   return (
//     <div style={{ background: "#e87777" }}>
//       <Layout />
//       <MainDiv>
//         <SearchDiv>서치 폼</SearchDiv>
//         {/* <div></div> */}
//         <CardDiv>
//           {mainPosts.map((post) => (
//             <PostCard key={post.id} post={post} />
//           ))}
//           {/* <div
//             ref={hasMorePosts && !loadPostsLoading ? ref : undefined}
//             style={{ height: 10 }}
//           /> */}
//         </CardDiv>
//         {/* <div>
//           {data && data.map((item) => <div key={item.id}></div>)}
//           <Page index={pageIndex} />
//           <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
//           <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
//         </div> */}
//         <div>
//           {status === "loading" ? (
//             <div>Loading...</div>
//           ) : status === "error" ? (
//             <div>Error: {error.message}</div>
//           ) : (
//             // `data` will either resolve to the latest page's data
//             // or if fetching a new page, the last successful page's data
//             <div>
//               {/* {data.projects.map((project) => ( */}
//               {data.map((project) => (
//                 <p key={project.id}>{project.name}</p>
//               ))}
//             </div>
//           )}
//           <div>Current Page: {page + 1}</div>
//           <button
//             onClick={() => setPage((old) => Math.max(old - 1, 0))}
//             disabled={page === 0}
//           >
//             Previous Page
//           </button>{" "}
//           <button
//             onClick={() => {
//               setPage((old) => (data?.hasMore ? old + 1 : old));
//             }}
//             disabled={isPreviousData || !data?.hasMore}
//           >
//             Next Page
//           </button>
//           {isFetching ? <span> Loading...</span> : null}{" "}
//         </div>
//       </MainDiv>
//       {/* </Layout> */}
//     </div>
//   );
// };

// // SSR (프론트 서버에서 실행)
// export const getServerSideProps = wrapper.getServerSideProps(
//   async (context) => {
//     const cookie = context.req ? context.req.headers.cookie : "";
//     axios.defaults.headers.Cookie = "";
//     // 쿠키가 브라우저에 있는경우만 넣어서 실행
//     // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
//     if (context.req && cookie) {
//       axios.defaults.headers.Cookie = cookie;
//     }
//     await context.store.dispatch(loadPosts());
//     // await context.store.dispatch(loadPost({ postId: context.params.id }));
//     await context.store.dispatch(loadMyInfo());

//     return {
//       props: {},
//     };
//   }
// );

// export default Home;

// // ############################################################## //

// const CardDiv = styled.div`
//   width: 100%;

//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   /* background: #e87777; */
// `;

// const SearchDiv = styled.div`
//   width: 100%;
//   height: 110px;

//   /* z-index: 1; */

//   /* background: #e87777; */
// `;

// const MainDiv = styled.div`
//   margin-left: 5%;

//   /* display: flex; */
//   /* flex-direction: column; */
//   /* align-items: center; */

//   width: 90%;
//   height: 100rem;
//   /* height: 1; */

//   /* z-index: 1; */

//   background: #f6f1f1;
// `;
