import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, updatePost, removePost, loadStack } from "../actions/post";
import Router from "next/router";

import styled from "styled-components";

import StackForm from "./StackForm";

const ResumeForm = ({ post }) => {
  // const [inputRender, setInputRender] = useState(null);
  // useEffect(() => {
  //   singlePost;
  //   singlePost?.post?.id;
  //   console.log("마이리슘폼확인1", singlePost?.post);
  //   console.log("마이리슘폼확인", post);
  // }, [singlePost?.post?.id]);
  const introduceRef = useRef();
  const positionRef = useRef();
  const careerRef = useRef();
  const portfolioRef = useRef();
  const githubRef = useRef();
  const blogRef = useRef();

  const dispatch = useDispatch();
  const { addPostLoading, updatePostLoading, removePostLoading, singleStack } =
    useSelector((state) => state.post);

  const me = useSelector((state) => state.user.me);
  const [job, setJob] = useState(false);

  useEffect(() => {
    setJob(post?.job);
  }, [post?.job]);

  const onJobHandler = useCallback(() => {
    setJob(!job);
  }, [job]);

  const onAddPost = useCallback(() => {
    dispatch(
      addPost({
        introduce: introduceRef.current.value,
        position: positionRef.current.value,
        career: careerRef.current.value,
        job: job,
        portfolio: portfolioRef.current.value,
        github: githubRef.current.value,
        blog: blogRef.current.value,
      })
    );
    Router.replace(`/mypage/resume/${me?.id}`);
  }, [
    introduceRef.current?.value,
    positionRef.current?.value,
    careerRef.current?.value,
    job,
    portfolioRef.current?.value,
    githubRef.current?.value,
    blogRef.current?.value,
  ]);

  const onRemovePost = useCallback(() => {
    if (!me?.id) {
      alert("로그인이 필요합니다.");
      return;
    }
    dispatch(
      removePost({
        postId: post?.id,
      })
    );
    Router.replace(`/mypage/resume/${me?.id}`);
  }, [post?.id, me?.id]);

  const onPostUpdate = useCallback(() => {
    dispatch(
      updatePost({
        postId: post?.id,
        introduce: introduceRef.current.value,
        position: positionRef.current.value,
        career: careerRef.current.value,
        job,
        portfolio: portfolioRef.current.value,
        github: githubRef.current.value,
        blog: blogRef.current.value,
      })
    );
    alert("수정완료");
  }, [
    post?.id,
    introduceRef.current?.value,
    positionRef.current?.value,
    careerRef.current?.value,
    job,
    portfolioRef.current?.value,
    githubRef.current?.value,
    blogRef.current?.value,
  ]);

  return (
    <MainDiv>
      <UserNameDiv>
        <input value={me?.name} disabled placeholder={me?.name} />
      </UserNameDiv>
      <IntroDiv>
        <textarea
          ref={introduceRef}
          defaultValue={post?.introduce}
          placeholder={"자기소개를 적어 주세요."}
          // required
        />
      </IntroDiv>
      <JobDiv>
        <input
          ref={positionRef}
          defaultValue={post?.position}
          type="text"
          placeholder={"ex) 프론트 엔드"}
        />
        <input
          ref={careerRef}
          defaultValue={post?.career}
          type="text"
          placeholder={"ex) 2년, 신입일 경우 신입"}
          // required
        />
      </JobDiv>
      <StackForm />
      <JobHuntDiv>
        <button onClick={onJobHandler} type="button">
          구직
        </button>
        {job === true ? (
          <div>셀프 구직 활동 중입니다.</div>
        ) : (
          <div>구직 활동중이 아닙니다.</div>
        )}
      </JobHuntDiv>
      <PortfolioDiv>
        <input
          ref={portfolioRef}
          defaultValue={post?.portfolio}
          type="text"
          placeholder={"포트폴리오"}
          // required
        />
        <input
          ref={githubRef}
          defaultValue={post?.github}
          type="text"
          placeholder={"Github"}
          // required
        />
        <input
          ref={blogRef}
          defaultValue={post?.blog}
          type="text"
          placeholder={"Blog"}
          // required
        />
        {post && (
          <button
            htmltype="submit"
            type="primary"
            onClick={onPostUpdate}
            loading={updatePostLoading}
          >
            수정
          </button>
        )}
        {!post ? (
          <button
            type="primary"
            htmltype="submit"
            onClick={onAddPost}
            loading={addPostLoading}
          >
            올리기
          </button>
        ) : (
          <button
            htmltype="button"
            type="primary"
            onClick={onRemovePost}
            loading={removePostLoading}
          >
            내리기
          </button>
        )}
      </PortfolioDiv>
    </MainDiv>
  );
};

export default ResumeForm;

// ############################## //

const PortfolioDiv = styled.div`
  width: 100%;
  height: 17.29vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #334eab; */
  input {
    margin-top: 1.04vw;
    width: 20.1vw;
    height: 2.08vw;
    background: #ffffff;
    border: 0.05vw solid #e0581d;
    border-radius: 0.78vw;
    font-family: "Inter";
    font-size: 1.04vw;
    line-height: 1.25vw;
    color: #000000;
  }
  button {
    margin-top: 3.02;
    width: 5.05vw;
    height: 2.03vw;
    background: #0a5ab9;
    border: none;
    border-radius: 0.78vw;
    :hover {
      background: #084995;
    }
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 1.04vw;
    line-height: 1.25vw;
    /* identical to box height */
    color: #ffffff;
  }
`;

const JobHuntDiv = styled.div`
  width: 100%;
  height: 5.1vw;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #17234f; */
  button {
    width: 4.69vw;
    height: 2.14vw;
    background: #44c82f;
    border: none;
    border-radius: 0.78vw;
    :hover {
      background: #2a8c1a;
    }
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 0.94vw;
    line-height: 1.25vw;
    color: #000000;
  }
  div {
    text-align: center;
    width: 14.58vw;
    height: 2.14vw;
    line-height: 2.14vw;
    background: #ffffff;
    border-bottom: 0.05vw solid #d6d5d5;
  }
`;

const StackDiv = styled.div`
  width: 100%;
  height: 8.85vw;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  /* background: #d34b4b; */
  div {
    :nth-child(2) {
      width: 100%;
      height: 5.21vw;
      background: #d34b4b;
    }
  }
  input {
    :focus {
      outline: none;
    }
    width: 14.9vw;
    height: 2.03vw;
    border: none;
    /* background: #ffffff; */
    border-bottom: 0.05vw solid #d6d5d5;
  }
  button {
    width: 5.05vw;
    height: 2.03vw;
    background: #0a5ab9;
    border: none;
    border-radius: 0.78vw;
    :hover {
      background: #084995;
    }
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 0.78vw;
    line-height: 1.25vw;
    color: #ffffff;
  }
`;

const JobDiv = styled.div`
  width: 100%;
  height: 8.75vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #ec8f8f; */
  input {
    margin-top: 1.3vw;
    width: 20.1vw;
    height: 2.08vw;
    background: #ffffff;
    border: 0.05vw solid #e0581d;
    border-radius: 0.78vw;
  }
`;

const IntroDiv = styled.div`
  width: 100%;
  height: 9.58vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #952e2e; */
  textarea {
    width: 19.95vw;
    height: 7.81vw;
    resize: none;
    background: #ffffff;
    border: 0.05vw solid #e0581d;
    border-radius: 0.78vw;
  }
`;

const UserNameDiv = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 3.75vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #e05555; */
  input {
    width: 20.05vw;
    height: 2.03vw;
    background: #ffffff;
    border: 0.05vw solid #e0581d;
    border-radius: 0.78vw;
  }
`;

const MainDiv = styled.div`
  margin-top: 10.42vw;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 65.1vw;
  /* background: #d9d9d9; */
`;
