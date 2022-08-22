import React, { useCallback } from "react";
import Router from "next/router";
import Image from "next/image";
import SearchForm from "../components/SearchForm";
import styled from "styled-components";
import ProTypes from "prop-types";
import Foli from "../public/images/Foli.png";
import MenuForm from "./MenuForm";

const Layout = ({ children }) => {
  const onMainPush = useCallback(() => {
    Router.replace("/");
  }, [Router]);

  return (
    <>
      {/* <MainDiv> */}
      <HeaderDiv>
        <ContainerDiv>
          <LogoDiv onClick={onMainPush}>
            <div>
              <Image src={Foli} width={250} height={120} />
            </div>
          </LogoDiv>
          <Div />
          <SearchDiv>
            <SearchForm />
          </SearchDiv>
          <MyChanner>
            <div></div>
            <div>
              ☺ My Github: <a href="https://github.com/katf101">Click Me!</a>
            </div>
            <div>
              ☺ My Blog: <a href="https://101devroom.tistory.com">Click Me!</a>
            </div>
            <div></div>
          </MyChanner>
        </ContainerDiv>

        <MenuForm />
      </HeaderDiv>
      {children}
      {/* </MainDiv> */}
    </>
  );
};

Layout.propTypes = {
  children: ProTypes.node.isRequired,
};

export default Layout;

const MyChanner = styled.div`
  margin-bottom: -0vw;
  margin-right: 4vw;
  width: 14.63vw;
  height: 6.25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #3a3845;
  border-radius: 0.52vw;
  font-size: 0.94vw;
  color: #ffffff;
  div {
    margin-left: 0.78vw;
  }
  a:visited {
    color: #ffffff;
  }
  a:hover {
    color: red;
  }
  a:active {
    color: green;
  }
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
  margin-left: 15.63vw;
  width: 10.42vw;
  height: 5.21vw;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  /* background: #000000; */
`;

const ContainerDiv = styled.div`
  /* width: 52.08vw; */
  height: 7.81vw;

  /* position: sticky; */
  /* left: 26.04vw; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  /* background: #eeeeee; */
`;

const HeaderDiv = styled.header`
  position: fixed;
  width: 100%;
  /* width: 99.06vw; */
  height: 9.9vw;
  right: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #928f7e;

  /* align-items: center; */
  z-index: 10;
  background: #d0cebe;
`;

// const MainDiv = styled.div`
//   /* width: 100%; */
//   /* height: 100%; */
//   /* position: fixed; */
//   display: flex;
//   flex-direction: column;
// `;

// pointer-events: none;

// const Header = styled.div`
//   position: fixed;
//   margin-top: -0.52vw;
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
