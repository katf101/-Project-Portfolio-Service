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

  const onProfileClickHandler = useCallback(() => {
    setIsProfileHovered(!isProfileHovering);
  }, [isProfileHovering]);

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
        <LeftDiv>
          <div
            style={{ marginTop: "5px", cursor: "pointer" }}
            onClick={onMainPush}
          >
            <Image src={Our} width={150} height={25} />
          </div>
        </LeftDiv>
        <RightDiv>
          {me && (
            <PostDiv onClick={onPostPush} style={{ cursor: "pointer" }}>
              게시글
            </PostDiv>
          )}
          {me && (
            <ProfileImageButton onClick={onProfileClickHandler}>
              <Image
                src={UserButton}
                alt="user button"
                width={20}
                height={20}
              />
            </ProfileImageButton>
          )}
          {me && (
            <LogoutImageButton onClick={onLogout} loading={logoutLoading}>
              <Image src={Logout} alt="user button" width={20} height={20} />
            </LogoutImageButton>
          )}
          {!me && (
            <Link href="/log/login">
              <LoginButton>로그인</LoginButton>
            </Link>
          )}
        </RightDiv>
      </Header>
      {isProfileHovering && (
        <DropBoxDiv>
          <DropBox>
            <div>
              <Link href={`/mypage/profile/${me?.id}`}>프로필</Link>
            </div>
            <div>
              <Link href={`/mypage/resume/${me?.id}`}>내 이력서</Link>
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

const MainDiv = styled.div`
  width: 100%;
  height: 50px;
  height: 100%;
  /* display: flex; */
  /* flex-direction: column; */
`;

const DropBox = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 126px;
  height: 80px;

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
  z-index: 10;

  position: fixed;
  /* width: 126px; */
  width: 89%;
  height: 108px;

  display: flex;
  flex-direction: row-reverse;

  /* border: 1px solid #000000; */
`;

const LoginButton = styled.button`
  /* Rectangle 20 */
  margin-right: 100px;
  width: 60px;
  height: 30px;
  pointer-events: auto;
  background: #ffffff;
  border: 2px solid #1139c9;
  border-radius: 10px;

  &:hover {
    border: 1px solid #00f9ea;
  }
`;

const LogoutImageButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
`;

const ProfileImageButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
  cursor: pointer;
`;
const PostDiv = styled.div`
  width: 50px;
  height: 50px;
  line-height: 50px;
  pointer-events: auto;
`;

const RightDiv = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  justify-content: end;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  /* background: #ffffff; */
`;

const LeftDiv = styled.div`
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
  div {
    width: 150px;
    z-index: 10;
  }
  pointer-events: auto;
  border-bottom: 1px solid #e3e3e3;
  /* background: #ffffff; */
`;

const Header = styled.div`
  /* margin-top: -5px; */
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #e3e3e3;
  z-index: 0;
  pointer-events: none;

  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
`;

// const Header = styled.div`
//   position: fixed;
//   margin-top: -10px;
//   width: 100%;
//   height: 50px;

//   z-index: 20;

//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   background: #ffffff;
//   border-bottom: 1px solid #e3e3e3;
//   box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
//   div {
//     &:nth-child(1) {
//       width: 50%;
//       height: 37px;
//       line-height: 37px;
//       flex-direction: row;
//       /* background: #d9d9d9; */
//     }
//     &:nth-child(2) {
//       width: 45%;
//       /* width: 500px; */
//       height: 37px;
//       display: flex;
//       /* justify-content: flex-end; */
//       flex-direction: row-reverse;
//       /* background: #d9d9d9; */
//     }
//   }

//   /* @media (min-width: 320px) and (max-width: 500px) {
//     width: 500px;
//   } */
// `;
