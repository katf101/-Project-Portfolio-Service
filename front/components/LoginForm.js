import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/user";
import Router from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "./UI/TextField";

import styled from "styled-components";
import Link from "next/link";

const LoginFormSchema = Yup.object().shape({
  user_email: Yup.string()
    .email("올바르지 않은 이메일 형식 입니다.")
    .required("이메일은 필수 입력 항목 입니다."),
  user_password: Yup.string().required("비밀번호는 필수 입력 항목 입니다."),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const [action, setAction] = useState(null);
  const { loginLoading, loginError, loginDone } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (loginError) {
      alert(loginError);
    }
  }, [loginError]);

  useEffect(() => {
    if (loginDone === true) {
      Router.push("/");
    }
  }, [loginDone]);

  return (
    <MainDiv>
      <Formik
        initialValues={{
          user_email: "",
          user_password: "",
        }}
        validationSchema={LoginFormSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(
            login({
              email: values.user_email,
              password: values.user_password,
            })
          );
          setAction({ setSubmitting, resetForm });
        }}
      >
        <Form_styled>
          <TextField
            label="Email"
            name="user_email"
            type="email"
            placeholder="Email"
          />
          <TextField
            label="Password"
            name="user_password"
            type="password"
            placeholder="Password"
          />
          {/* <Field
            label="Email"
            name="user_email"
            type="email"
            placeholder="이메일"
            required
          />
          <Field
            name="user_password"
            type="password"
            placeholder="비밀번호"
            required
          /> */}
          <button
            type="primary"
            htmltype="submit"
            loading={loginLoading}
            style={{ zIndex: "1" }}
            // loading={loginLoading.toString()}
          >
            로그인
          </button>
          <div style={{ marginTop: "0.78" }}>
            <Link href="/log/signup">
              <a>회원가입</a>
            </Link>
          </div>
        </Form_styled>
      </Formik>
    </MainDiv>
  );
};

export default LoginForm;

const Form_styled = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainDiv = styled.div`
  margin-top: 15.63vw;
  margin-left: 10%;

  width: 80%;
  height: 50vw;

  /* background: #d9d9d9; */
  a:visited {
    color: black;
  }
  a:hover {
    color: black;
  }
  a:active {
    color: #eeeeee;
  }

  input {
    margin-top: 1.56vw;

    width: 17.24vw;
    height: 2.08vw;

    background: #ffffff;
    border: 0.16vw solid #414f54;
    border-radius: 0.78vw;
  }
  div {
    &:nth-child(3) {
      margin-top: 0.78vw;

      width: 5.83vw;
      height: 1.72vw;

      text-align: center;

      /* background: #964545; */
    }
  }
  button {
    margin-top: 1.04vw;

    width: 7.5vw;
    height: 1.77vw;

    background: #b9dfeb;
    border-radius: 0.78vw;
    border: 0vw;
    &:hover {
      background: #5ec7e9;
    }
  }
`;
