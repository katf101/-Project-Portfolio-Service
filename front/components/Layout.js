import React, { useCallback, useState } from "react";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

import styled from "styled-components";
import ProTypes from "prop-types";

import userButton from "../public/assests/userButton.png";
import hoverButton from "../public/assests/hoverButton.png";
import hoverLogout from "../public/assests/hoverLogout.png";
import Logout from "../public/assests/Logout.png";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { me, logoutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const [isProfileHovering, setIsProfileHovered] = useState(false);
  const onMouseProfileEnter = useCallback(() => {
    setIsProfileHovered(true);
  }, []);
  const onMouseProfileLeave = useCallback(() => {
    setIsProfileHovered(false);
  }, []);

  const [isLogoutHovering, setIsLogoutHovered] = useState(false);
  const onMouseLogoutEnter = useCallback(() => {
    setIsLogoutHovered(true);
  }, []);
  const onMouseLogoutLeave = useCallback(() => {
    setIsLogoutHovered(false);
  }, []);

  return (
    <>
      <Header>
        <div>
          <div>
            <Link href="/">내포폴</Link>
          </div>
        </div>
        <div>
          {!me && (
            <Link href="/log/login">
              <SigninButton>로그인</SigninButton>
            </Link>
          )}
          {me && (
            <ImageMainDiv>
              <LoginImageButton
                onMouseEnter={onMouseProfileEnter}
                onMouseLeave={onMouseProfileLeave}
              >
                {isProfileHovering ? (
                  <Image src={hoverButton} alt="user button" />
                ) : (
                  <Image src={userButton} alt="user button" />
                )}
              </LoginImageButton>
              <LogoutImageButton
                onMouseEnter={onMouseLogoutEnter}
                onMouseLeave={onMouseLogoutLeave}
                onClick={onLogout}
                loading={logoutLoading}
                // loading={logoutLoading.toString()}
              >
                {isLogoutHovering ? (
                  <Image src={hoverLogout} alt="user button" />
                ) : (
                  <Image src={Logout} alt="user button" />
                )}
              </LogoutImageButton>
            </ImageMainDiv>
          )}
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

Layout.propTypes = {
  children: ProTypes.node.isRequired,
};

export default Layout;
const LogoutImageButton = styled.button`
  width: 35px;
  height: 35px;

  background: #ffffff;
  border: 0px solid #000000;
`;

const LoginImageButton = styled.button`
  width: 35px;
  height: 35px;

  background: #ffffff;
  border: 0px solid #000000;
`;

const ImageMainDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  /* background: #323233; */
`;

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
      width: 45%;
      /* width: 500px; */
      height: 37px;
      display: flex;
      /* justify-content: flex-end; */
      flex-direction: row-reverse;
      /* background: #d9d9d9; */
    }
  }

  /* @media (min-width: 320px) and (max-width: 500px) {
    width: 500px;
  } */
`;
