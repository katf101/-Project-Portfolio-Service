import React, { useCallback, useState } from "react";
import { logout } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";

import SearchForm from "../components/SearchForm";

import styled from "styled-components";
import ProTypes from "prop-types";

import UserButton from "../public/images/UserButton.png";
import hoverUserButton from "../public/images/hoverUserButton.png";
import hoverLogout from "../public/images/hoverLogout.png";
import Logout from "../public/images/Logout.png";
import Foli from "../public/images/Foli.png";
import Our from "../public/images/Our.png";
import MenuForm from "./MenuForm";

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
      <HeaderDiv>
        <ContainerDiv>
          <LogoDiv>
            <div>
              <Image src={Foli} width={150} height={120} />
            </div>
          </LogoDiv>
          <Div />
          <SearchDiv>
            <SearchForm />
          </SearchDiv>
        </ContainerDiv>
        <MenuForm />
      </HeaderDiv>
      <LineDiv>이력서를 작성하고 유저들과 공유해 보아요🔥</LineDiv>
      {children}
    </MainDiv>
  );
};

Layout.propTypes = {
  children: ProTypes.node.isRequired,
};

export default Layout;

const LineDiv = styled.div`
  width: 100%;
  height: 2.08vw;
  line-height: 2.08vw;
  display: flex;
  justify-content: center;
  color: #ffffff;
  background: #414f54;

  position: absolute;
  top: 9.64vw;

  background: #414f54;
  border: 0.05vw solid #3b76cf;
`;

const SearchDiv = styled.div`
  width: 36.46vw;
  height: 6.25vw;

  display: flex;
  align-items: center;
  justify-content: center;

  /* background: #000000; */
`;

const Div = styled.div`
  width: 5.21vw;
  height: 6.25vw;
  /* background: #000000; */
`;

const LogoDiv = styled.div`
  width: 10.42vw;
  height: 5.21vw;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background: #000000; */
`;

const ContainerDiv = styled.div`
  width: 52.08vw;
  height: 7.81vw;

  position: sticky;
  left: 26.04vw;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* background: #eeeeee; */
`;

const HeaderDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 9.9vw;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  /* align-items: center; */
  z-index: 1;
  background: #ffffff;
`;

const MainDiv = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  /* position: fixed; */
  display: flex;
  flex-direction: column;
`;

// pointer-events: none;

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
