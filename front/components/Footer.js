import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <MainDiv>
      <div>email: vawav11@gmail.com</div>
      <div>blog: https://101devroom.tistory.com/</div>
      <div>github: https://github.com/katf101</div>
      <div>phone: 010-3825-8768</div>
    </MainDiv>
  );
};

export default Footer;

const MainDiv = styled.div`
  width: 100%;
  height: 150px;

  background: #f8f8f8;
  border-top: 1px solid #ededed;
`;
