import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, uploadImage, loadPost } from "../actions/post";
import { loadMyInfo } from "../actions/user";
import wrapper from "../store/configureStore";
import postSlice from "../reducers/post";
import Router from "next/router";

import { imageUrl } from "../config/config";
import styled from "styled-components";
import UserImage from "../public/images/UserImage.png";
import Image from "next/image";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const PostSchema = Yup.object().shape({
  content: Yup.string().min(2, "게시글은 2자 이상 입력하여 주십시오."),
  // .required("게시글은 필수 입력 항목 입니다."),
});

const ResumeForm = ({ post }) => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const [job, setJob] = useState(false);
  const onJobHandler = () => {
    setJob(!job);
  };

  const { singlePost, mainPosts, addPostLoading, addPostDone, addPostError } =
    useSelector((state) => state.post);
  const { me, addPostToMe } = useSelector((state) => state.user);

  const [active, setActive] = useState(false);

  const onActiveHandler = () => {
    setActive(!active);
    Router.replace(`/mypage/resume/${me.id}`);
  };

  const userPostInfo = mainPosts.filter((v, i) => v.UserId === me?.id);

  useEffect(() => {
    console.log("미", me?.id);
    console.log("렌더배열", mainPosts);
    console.log("렌더배열1", post);
    console.log("렌더배열2", userPostInfo);
    console.log("렌더배열3", me);
    // console.log("렌더배열3", userPostInfo[0].introduce);
  }, [mainPosts, me, userPostInfo, singlePost, addPostToMe]);

  // (me.id ? me.id : null)
  useEffect(() => {
    if (action) {
      if (addPostDone) {
        console.log("이력서 올리기 성공");
        console.log("배열", mainPosts);
        // message.success("이력서가 등록되었습니다.").then();
      }
      if (addPostError) {
        console.log("에러");
        // message.error(JSON.stringify(addPostError, null, 4)).then();
      }
      action.setSubmitting(false);
      action.resetForm();
      setAction(null);
    }
  }, [addPostDone, addPostError, mainPosts]);

  return (
    <MainDiv>
      <Formik
        initialValues={{
          // user_image: "",
          //   user_name: "",
          user_intro: "",
          user_position: "",
          user_career: "",
          user_job: "",
          user_portfolio: "",
          user_github: "",
          user_blog: "",
        }}
        validationSchema={PostSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(
            addPost({
              introduce: values.user_intro,
              position: values.user_position,
              career: values.user_career,
              job,
              // job: values.user_job,
              portfolio: values.user_portfolio,
              github: values.user_github,
              blog: values.user_blog,
            })
          );
          setAction({ setSubmitting, resetForm });
        }}
      >
        <Form encType="multipart/form-data">
          <UserNameDiv>
            <input
              type="text"
              name="user_name"
              placeholder={me ? me.name : ""}
            />
          </UserNameDiv>
          <IntroDiv>
            <Field
              as="textarea"
              id="user_intro"
              name="user_intro"
              // placeholder={JSON.stringify(
              //   mainPosts.filter((v) => v.UserId === me.id)[0].introduce
              // )}
              placeholder={post ? post.introduce : "자기소개를 적어 주세요."}
              required
            />
          </IntroDiv>
          <JobDiv>
            <Field
              type="text"
              id="user_position"
              name="user_position"
              placeholder={post ? post.position : "ex) 프론트 엔드"}
            />
            <Field
              type="text"
              id="user_career"
              name="user_career"
              placeholder={post ? post.career : "ex) 2년, 신입일 경우 신입"}
              required
            />
          </JobDiv>
          <StackDiv>
            <div>
              <input type="text" id="user_stack" name="user_stack" />
              <button>기술 스택</button>
            </div>
            <div>
              <div>React</div>
              <div>Redux</div>
              <div>Node.js</div>
            </div>
          </StackDiv>
          <ActivityDiv>
            <Field
              onClick={onJobHandler}
              as="button"
              type="button"
              id="user_job"
              name="user_job"
            >
              구직
            </Field>
            {job === true ? (
              <div>셀프 구직 활동 중입니다.</div>
            ) : (
              <div>구직 활동중이 아닙니다.</div>
            )}
          </ActivityDiv>
          <PortfolioDiv>
            <Field
              id="user_portfolio"
              name="user_portfolio"
              type="text"
              placeholder={post ? post.portfolio : "포트폴리오"}
              required
            />
            <Field
              id="user_github"
              name="user_github"
              type="text"
              placeholder={post ? post.github : "Github"}
              required
            />
            <Field
              name="user_blog"
              type="text"
              placeholder={post ? post.blog : "Blog"}
              required
            />
            <button>수정</button>
            {!post ? (
              <button
                onClick={onActiveHandler}
                type="primary"
                htmltype="submit"
                loading={addPostLoading}
              >
                올리기
              </button>
            ) : (
              <button>내리기</button>
            )}
          </PortfolioDiv>
        </Form>
      </Formik>
    </MainDiv>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";

    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadPost({ postId: context.params.id }));
    await context.store.dispatch(loadPosts());
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default ResumeForm;

// ############################## //

const Imageinput = styled.input`
  width: 100px;
  height: 100px;
  /* display: none; */
  /* z-index: 100; */
  /* background-image: url("../public/images/UserImage.png"); */
  /* background-size: 100% 100%; */
`;

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

const ActivityDiv = styled.div`
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
  /* align-items: center; */
  flex-direction: column;
  /* justify-content: center; */
  /* background: #d34b4b; */
  div {
    justify-content: center;
    width: 100%;
    &:nth-child(1) {
      height: 72px;
      display: flex;
      /* justify-content: center; */
      /* align-items: center; */
      /* background: #3050c2; */
    }
    &:nth-child(2) {
      height: 99px;
      display: flex;
      flex-direction: row;
      /* background: #8da1e8; */
      div {
        width: 58px;
        height: 28px;

        background: #db7e57;
        border-radius: 15px;
        text-align: left;

        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
      }
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

const ImageDiv = styled.div`
  width: 100%;
  height: 200px;
  /* background: #8e2c2c; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainDiv = styled.div`
  margin-left: 5%;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  height: 1250px;

  /* background: #d9d9d9; */
`;
