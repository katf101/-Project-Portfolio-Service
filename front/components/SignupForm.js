import React, { useCallback, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import { signup } from "../actions/user";
import { TextField } from "./UI/TextField";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import Link from "next/link";

const SignupSchema = Yup.object().shape({
  user_email: Yup.string()
    .email("올바르지 않은 이메일 형식 입니다.")
    .required("이메일은 필수 입력 항목 입니다."),
  user_name: Yup.string().required("닉네임은 필수 입력 항목 입니다."),
  user_password: Yup.string().required("비밀번호는 필수 입력 항목 입니다."),
  user_password_check: Yup.string()
    .oneOf([Yup.ref("user_password")], "비밀번호가 일치 하지 않습니다.")
    .required("비밀번호 체크는 필수 입력 항목 입니다."),
});

const SignupForm = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { me, signupLoading, signupDone, signupError } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (me && me.id) {
      alert("로그인 한 사용자는 가입하실 수 없습니다.");
      Router.push("/").then();
    }
  }, [me && me.id]);

  useEffect(() => {
    if (action) {
      if (signupDone) {
        alert("회원가입 성공");
        Router.push("/log/login").then();
      }
      if (signupError) {
        console.log("error");
        alert("에러");
      }
      action.setSubmitting(false);
      setAction(null);
    }
  }, [signupDone, signupError]);

  return (
    <MainDiv>
      <Formik
        initialValues={{
          user_email: "",
          user_name: "",
          user_password: "",
          user_password_check: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("asdf");
          dispatch(
            signup({
              email: values.user_email,
              name: values.user_name,
              password: values.user_password,
            })
          );
          setAction({ setSubmitting, resetForm });
        }}
      >
        <Form_styled>
          <TextField
            name="user_email"
            type="email"
            placeholder="Email"
            required
          />
          <TextField name="user_name" type="text" placeholder="Name" required />
          <br />
          <TextField
            name="user_password"
            type="password"
            placeholder="password"
            required
          />
          <TextField
            name="user_password_check"
            type="password"
            placeholder="Password Check"
            required
          />
          <br />
          <button
            type="primary"
            htmltype="submit"
            loading={signupLoading}
            // loading={signupLoading.toString()}
          >
            회원가입
          </button>
          <div style={{ marginTop: "15px" }}>
            <Link href="/log/login">로그인</Link>
          </div>
        </Form_styled>
      </Formik>
    </MainDiv>
  );
};

export default SignupForm;

const Form_styled = styled(Form)`
  width: 26.04vw;
  height: 41.67vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
`;

const MainDiv = styled.div`
  margin-top: 13.02vw;
  margin-left: 10%;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80%;
  height: 50vw;

  /* background: #d9d9d9; */

  input {
    margin-top: 0.78vw;

    width: 17.24vw;
    height: 2.08vw;

    background: #ffffff;
    border: 3px solid #414f54;
    border-radius: 0.78vw;
  }
  div {
    &:nth-child(3) {
      margin-top: 0.78vw;

      width: 5.83vw;
      height: 1.72vw;

      /* text-align: center; */

      /* background: #964545; */
    }
  }
  button {
    margin-top: 1.04vw;

    width: 7.5vw;
    height: 1.77vw;

    background: #b9dfeb;
    border-radius: 0.78vw;
    border: 0px;
    &:hover {
      background: #5ec7e9;
    }
  }
`;
