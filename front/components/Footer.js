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
    </MainDiv>
  );
};

export default Footer;

const StacksDiv2 = styled.div`
  width: 15.63vw;
  height: 15.63vw;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
  div {
    margin-bottom: 0.78vw;
  }

  font-size: 1.25vw;
  color: #767474;

  /* background: #000000; */
`;
const StacksDiv = styled.div`
  width: 15.63vw;
  height: 15.63vw;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
  div {
    margin-bottom: 0.78vw;
  }

  font-size: 1.25vw;
  color: #767474;

  /* background: #000000; */
`;
const UsingStackDiv = styled.div`
  width: 15.63vw;
  height: 15.63vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 2.19vw;
  color: #767474;
`;
const MyDiv = styled.div`
  width: 15.63vw;
  height: 15.63vw;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: baseline;
  div {
    margin-bottom: 0.78vw;
  }

  font-size: 1.25vw;
  color: #767474;
  /* background: #000000; */
`;
const ProjectDiv = styled.div`
  width: 15.63vw;
  height: 15.63vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 2.19vw;
  color: #767474;

  /* background: #000000; */
`;

const MainDiv = styled.footer`
  position: relative;
  /* top: 65vw; */
  /* top: -300px; */
  margin-top: 7.81vw;
  margin-left: -0.47vw;
  width: 99.2vw;
  height: 15.63vw;

  z-index: 0;

  display: flex;
  flex-direction: row;

  background: #f8f8f8;
  border-top: 1px solid #ededed;
`;
