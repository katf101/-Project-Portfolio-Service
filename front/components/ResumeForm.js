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
          defaultValue={post?.position}
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
  height: 332px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #334eab; */
  input {
    margin-top: 20px;
    width: 386px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #e0581d;
    border-radius: 15px;
    font-family: "Inter";
    font-size: 20px;
    line-height: 24px;
    color: #000000;
  }
  button {
    margin-top: 58px;
    width: 97px;
    height: 39px;
    background: #0a5ab9;
    border: none;
    border-radius: 15px;
    :hover {
      background: #084995;
    }
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height */
    color: #ffffff;
  }
`;

const JobHuntDiv = styled.div`
  width: 100%;
  height: 98px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #17234f; */
  button {
    width: 90px;
    height: 41px;
    background: #44c82f;
    border: none;
    border-radius: 15px;
    :hover {
      background: #2a8c1a;
    }
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
  }
  div {
    text-align: center;
    width: 280px;
    height: 41px;
    line-height: 41px;
    background: #ffffff;
    border-bottom: 1px solid #d6d5d5;
  }
`;

const StackDiv = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
  /* background: #d34b4b; */
  div {
    :nth-child(2) {
      width: 100%;
      height: 100px;
      background: #d34b4b;
    }
  }
  input {
    :focus {
      outline: none;
    }
    width: 286px;
    height: 39px;
    border: none;
    /* background: #ffffff; */
    border-bottom: 1px solid #d6d5d5;
  }
  button {
    width: 97px;
    height: 39px;
    background: #0a5ab9;
    border: none;
    border-radius: 15px;
    :hover {
      background: #084995;
    }
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;
    color: #ffffff;
  }
`;

const JobDiv = styled.div`
  width: 100%;
  height: 168px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #ec8f8f; */
  input {
    margin-top: 25px;
    width: 386px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #e0581d;
    border-radius: 15px;
  }
`;

const IntroDiv = styled.div`
  width: 100%;
  height: 184px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #952e2e; */
  textarea {
    width: 383px;
    height: 150px;
    resize: none;
    background: #ffffff;
    border: 1px solid #e0581d;
    border-radius: 15px;
  }
`;

const UserNameDiv = styled.div`
  margin-top: 100px;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #e05555; */
  input {
    width: 385px;
    height: 39px;
    background: #ffffff;
    border: 1px solid #e0581d;
    border-radius: 15px;
  }
`;

const MainDiv = styled.div`
  margin-top: 200px;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: 1250px;
  /* background: #d9d9d9; */
`;
