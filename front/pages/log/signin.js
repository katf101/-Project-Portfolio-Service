import React from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import Link from "next/link";

const signin = () => {
  return (
    <Layout>
      <MainDiv>
        <input type="text" placeholder="이메일" />
        <input type="text" placeholder="비밀번호" />
        <button>로그인</button>
        <div>
          <Link href="/log/signup">회원가입</Link>
        </div>
      </MainDiv>
    </Layout>
  );
};

export default signin;

const MainDiv = styled.div`
  margin-left: 10%;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 80%;
  height: 960px;
  left: 276px;
  top: 86px;

  /* background: #d9d9d9; */

  input {
    margin-top: 30px;

    width: 331px;
    height: 40px;

    background: #ffffff;
    border: 1px solid #e0581d;
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
    /* Rectangle 23 */

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
