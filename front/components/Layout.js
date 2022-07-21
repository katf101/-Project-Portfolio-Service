import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <div>
          <div>
            <Link href="/">홈</Link>
          </div>
        </div>
        <div>
          <Link href="/log/signin">
            <SigninButton>로그인</SigninButton>
          </Link>
        </div>
        {/* <Link href="/">홈</Link> */}
        {/* <Link href="/post/detail">상세게시글</Link> */}
        {/* <Link href="/mypage/resume">이력서</Link> */}
        {/* <Link href="/mypage/profile">프로필</Link> */}
        {/* <Link href="/mypage/notification">알림</Link> */}
        {/* <Link href="/mypage/message">메세지</Link> */}
        {/* <Link href="/log/signin">로그인</Link> */}
        {/* <Link href="/log/signup">회원가입</Link> */}
      </Header>
      {children}
    </>
  );
};

export default Layout;

const SigninButton = styled.button`
  margin-right: 15%;

  width: 55px;
  height: 30px;

  background: #ffffff;
  border: 1px solid #e0581d;
  border-radius: 10px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  line-height: 15px;

  &:hover {
    border: 1px solid #00f9ea;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 37px;

  display: flex;

  background: #ffffff;
  border-bottom: 1px solid #e3e3e3;
  div {
    &:nth-child(1) {
      width: 50%;
      height: 37px;

      flex-direction: row;
      /* background: #d9d9d9; */
    }
    &:nth-child(2) {
      width: 50%;
      height: 37px;
      display: flex;
      flex-direction: row-reverse;
      /* background: #d9d9d9; */
    }
  }

  @media (min-width: 320px) and (max-width: 500px) {
    width: 500px;
  }
`;
