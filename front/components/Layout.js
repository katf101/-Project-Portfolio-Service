import React from "react";
import Link from "next/link";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Header>
      <Link href="/">홈</Link>
      <Link href="/post/detail">상세게시글</Link>
      <Link href="/mypage/resume">이력서</Link>
      <Link href="/mypage/profile">프로필</Link>
      <Link href="/mypage/notification">알림</Link>
      <Link href="/mypage/message">메세지</Link>
      <Link href="/log/signin">로그인</Link>
      <Link href="/log/signup">회원가입</Link>
      {children}
    </Header>
  );
};

export default Layout;

const Header = styled.header`
  width: 100%;
  height: 37px;

  background: #ffffff;
  border-bottom: 1px solid #e3e3e3;

  @media (min-width: 320px) and (max-width: 500px) {
    width: 500px;
  }
`;
