import React from "react";
import styled from "styled-components";

const Footer = ({ children }) => {
  return (
    <MainDiv>
      <ProjectDiv>
        <div>Project</div>
      </ProjectDiv>
      <MyDiv>
        <div>참여인원: 1명</div>
        <div>Front-End: 이한솔</div>
        <div>Back-End: 이한솔</div>
      </MyDiv>
      <UsingStackDiv>
        <div>Using Stack</div>
      </UsingStackDiv>
      <StacksDiv>
        <div>Next.js</div>
        <div>Styled-Components</div>
        <div>Redux-Toolkit</div>
        <div>React-Query</div>
      </StacksDiv>
      <StacksDiv2>
        <div>Node.js</div>
        <div>Express</div>
        <div>Mysql</div>
        <div>Sequelize</div>
      </StacksDiv2>
      {/* <div>email: vawav11@gmail.com</div>
      <div>blog: https://101devroom.tistory.com/</div>
      <div>github: https://github.com/katf101</div>
      <div>phone: 010-3825-8768</div> */}
    </MainDiv>
  );
};

export default Footer;

const StacksDiv2 = styled.div`
  width: 300px;
  height: 300px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
  div {
    margin-bottom: 15px;
  }

  font-size: 24px;
  color: #767474;

  /* background: #000000; */
`;
const StacksDiv = styled.div`
  width: 300px;
  height: 300px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
  div {
    margin-bottom: 15px;
  }

  font-size: 24px;
  color: #767474;

  /* background: #000000; */
`;
const UsingStackDiv = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 42px;
  color: #767474;
`;
const MyDiv = styled.div`
  width: 300px;
  height: 300px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
  div {
    margin-bottom: 15px;
  }

  font-size: 24px;
  color: #767474;
  /* background: #000000; */
`;
const ProjectDiv = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 42px;
  color: #767474;

  /* background: #000000; */
`;

const MainDiv = styled.footer`
  position: relative;
  /* top: 65vw; */
  /* top: -300px; */
  margin-top: 150px;
  margin-left: -9px;
  width: 99.2vw;
  height: 300px;

  z-index: 0;

  display: flex;
  flex-direction: row;

  background: #f8f8f8;
  border-top: 1px solid #ededed;
`;
