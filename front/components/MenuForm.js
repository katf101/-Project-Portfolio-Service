import React from "react";
import styled from "styled-components";

const MenuForm = () => {
  return (
    <MainDiv>
      <MenuDiv>
        <div>JobHunt</div>
        <div>이력서</div>
        <div>프로필</div>
        <div>로그인</div>
        <div>로그아웃</div>
      </MenuDiv>
    </MainDiv>
  );
};

export default MenuForm;

const MenuDiv = styled.div`
  margin-left: 7.29vw;
  width: 41.67vw;
  display: flex;
  justify-content: center;
  div {
    margin-left: 2.08vw;
    display: flex;
    line-height: 2.34vw;
  }
`;

const MainDiv = styled.div`
  width: 100%;
  height: 2.34vw;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ece7e7;

  /* background: #eeeeee; */
  /* flex-direction: column; */
`;
