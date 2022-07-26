import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, uploadImage } from "../actions/post";
import postSlice from "../reducers/post";

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

const ResumeForm = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);

  const { mainPosts, addPostLoading, addPostDone, addPostError } = useSelector(
    (state) => state.post
  );
  const { me } = useSelector((state) => state.user);

  const [active, setActive] = useState(false);

  //######################################################//
  // const imageInput = useRef();
  // const onClickImageUpload = useCallback(() => {
  //   imageInput.current.click();
  // }, [imageInput.current]);

  // const onChangeImages = useCallback((e) => {
  //   console.log("image", e.target.files);
  //   const imageFormData = new FormData(); // FormData를 사용하면 back 에서 muler로 처리 가능
  //   [].forEach.call(e.target.files, (image) => {
  //     imageFormData.append("image", image);
  //   });
  //   // imageFormData.append("image", e.target.files);
  //   console.log(imageFormData);
  //   for (var value of imageFormData) {
  //     console.log(value);
  //   }
  //   dispatch(uploadImage(imageFormData));
  // }, []);
  // const onRemoveImage = useCallback(
  //   (index) => () => {
  //     dispatch(postSlice.actions.removeImage(index));
  //   },
  //   []
  // );
  //#######################################################//
  const onActiveHandler = () => {
    setActive(!active);
  };

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
              //   job: values.user_job,
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
              placeholder="자기소개를 적어 주세요."
              required
            />
          </IntroDiv>
          <JobDiv>
            <Field
              type="text"
              id="user_position"
              name="user_position"
              placeholder="ex) 프론트 엔드"
            />
            <Field
              type="text"
              id="user_career"
              name="user_career"
              placeholder="ex) 2년, 신입일 경우 신입"
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
            <button>구직</button>
            <div>셀프 구직 활동 중입니다.</div>
          </ActivityDiv>
          <PortfolioDiv>
            <Field
              id="user_portfolio"
              name="user_portfolio"
              type="text"
              placeholder="포트폴리오"
              required
            />
            <Field
              id="user_github"
              name="user_github"
              type="text"
              placeholder="Github"
              required
            />
            <Field name="user_blog" type="text" placeholder="Blog" required />
            <button>수정</button>
            <button
              onClick={onActiveHandler}
              type="primary"
              htmltype="submit"
              loading={addPostLoading}
            >
              올리기
            </button>
            <button>내리기</button>
          </PortfolioDiv>
        </Form>
      </Formik>
    </MainDiv>
  );
};

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
