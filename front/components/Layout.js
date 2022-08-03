import React, { useCallback, useState } from "react";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";

import styled from "styled-components";
import ProTypes from "prop-types";

import UserButton from "../public/images/UserButton.png";
import hoverUserButton from "../public/images/hoverUserButton.png";
import hoverLogout from "../public/images/hoverLogout.png";
import Logout from "../public/images/Logout.png";
import Our from "../public/images/Our.png";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const { me, logoutLoading } = useSelector((state) => state.user);
  // const { id } = useSelector((state) => state.user.me);

  const onLogout = useCallback(() => {
    dispatch(logout());
    // Router.push("/");
    Router.replace("/");
  }, [dispatch]);

  const [isProfileHovering, setIsProfileHovered] = useState(false);
  const onMouseProfileEnter = useCallback(() => {
    setIsProfileHovered(true);
  }, []);
  const onMouseProfileLeave = useCallback(() => {
    setIsProfileHovered(false);
  }, []);

  const onProfileClickHandler = useCallback(() => {
    setIsProfileHovered(!isProfileHovering);
  });

  const [isLogoutHovering, setIsLogoutHovered] = useState(false);
  const onMouseLogoutEnter = useCallback(() => {
    setIsLogoutHovered(true);
  }, []);
  const onMouseLogoutLeave = useCallback(() => {
    setIsLogoutHovered(false);
  }, []);
  const onMainPush = () => {
    Router.replace("/");
  };
  const onPostPush = () => {
    Router.replace("/jobhunt");
  };

  return (
    <MainDiv>
      <Header>
        <div>
          <div>
            <div>
              <div
                style={{ marginTop: "5px", cursor: "pointer" }}
                onClick={onMainPush}
              >
                <Image src={Our} />
              </div>
            </div>
          </div>
        </div>

        <div>
          {me && (
            <ImageMainDiv>
              <div onClick={onPostPush} style={{ cursor: "pointer" }}>
                게시글
              </div>

              <ProfileImageButton onClick={onProfileClickHandler}>
                {isProfileHovering ? (
                  <Image src={hoverUserButton} alt="user button" />
                ) : (
                  <Image src={UserButton} alt="user button" />
                )}
              </ProfileImageButton>
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
          {!me && (
            <Link href="/log/login">
              <SigninButton>로그인</SigninButton>
            </Link>
          )}
        </div>
        {/* <Link href="/">홈</Link> */}
        {/* <Link href="/post/detail">상세게시글</Link> */}
        {/* <Link href="/mypage/message">메세지</Link> */}
      </Header>
      {isProfileHovering && (
        <DropBoxDiv>
          <DropBox>
            <div>
              <Link href="/mypage/profile">프로필</Link>
            </div>
            <div>
              <Link href={`/mypage/resume/${me?.id}`}>내 이력서</Link>
            </div>
            <div>
              <Link href="/mypage/notification">알림</Link>
            </div>
          </DropBox>
        </DropBoxDiv>
      )}

      {children}
    </MainDiv>
  );
};

Layout.propTypes = {
  children: ProTypes.node.isRequired,
};

export default Layout;

const PostsLink = styled(Link)`
  text-decoration: none;
`;

const MainDiv = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const DropBox = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 126px;
  height: 108px;

  z-index: 10;

  background: #ffffff;
  border: 1px solid #a9a9a9;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    display: block;
    width: 97px;
    height: 36px;
    line-height: 36px;
    text-align: left;
  }
`;

const DropBoxDiv = styled.div`
  margin-top: 40px;
  margin-left: 5%;

  position: fixed;
  /* width: 126px; */
  width: 89%;
  height: 108px;

  display: flex;
  flex-direction: row-reverse;

  z-index: 10;

  /* border: 1px solid #000000; */
`;

const LogoutImageButton = styled.button`
  width: 35px;
  height: 35px;

  background: #ffffff;
  border: 0px solid #000000;
`;

const ProfileImageButton = styled.button`
  margin-right: 10px;
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
  position: fixed;
  margin-top: -10px;
  width: 100%;
  height: 50px;

  z-index: 20;

  display: flex;
  flex-direction: row;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e3e3e3;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  div {
    &:nth-child(1) {
      width: 50%;
      height: 37px;
      line-height: 37px;
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
