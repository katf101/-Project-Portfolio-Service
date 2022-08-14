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
  const { loginLoading, loginError } = useSelector((state) => state.user);

  useEffect(() => {
    if (action) {
      if (loginError) {
        console.log("에러");
        // message.error(JSON.stringify(loginError, null, 4)).then();
      }
      action.setSubmitting(false);
      setAction(null);
    }
  }, [loginError]);

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

          alert(loginError);
          if (loginError) {
            alert("아이디 또는 비밀번호가 맞지 않습니다.");
            return;
          }
          Router.push("/");
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
          <div style={{ marginTop: "15px" }}>
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
  margin-top: 300px;
  margin-left: 10%;

  width: 80%;
  height: 960px;

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
    margin-top: 30px;

    width: 331px;
    height: 40px;

    background: #ffffff;
    border: 3px solid #414f54;
    border-radius: 15px;
  }
  div {
    &:nth-child(3) {
      margin-top: 15px;

      width: 112px;
      height: 33px;

      text-align: center;

      /* background: #964545; */
    }
  }
  button {
    margin-top: 20px;

    width: 144px;
    height: 34px;

    background: #b9dfeb;
    border-radius: 15px;
    border: 0px;
    &:hover {
      background: #5ec7e9;
    }
  }
`;
