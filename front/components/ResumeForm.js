import React from "react";
import styled from "styled-components";
import UserImage from "../public/assests/UserImage.png";
import Image from "next/image";

const ResumeForm = () => {
  return (
    <MainDiv>
      <ImageDiv>
        <div>
          <Image
            style={{ cursor: "pointer" }}
            src={UserImage}
            alt="user image"
          />
        </div>
      </ImageDiv>
      <UserNameDiv>
        <input type="text" placeholder="이름" />
      </UserNameDiv>
      <IntroDiv>
        <textarea placeholder="자기소개를 적어 주세요." />
      </IntroDiv>
      <JobDiv>
        <input type="text" placeholder="ex) 프론트 엔드" />
        <input type="text" placeholder="ex) 2년, 신입일 경우 신입" />
      </JobDiv>
      <StackDiv>
        <div>
          <input type="text" /> <button>기술 스택</button>
        </div>
        <div>
          <div>React</div>
          <div>Redux</div>
          <div>Node.js</div>
        </div>
      </StackDiv>
      <ActivityDiv>
        <button>구직</button>
        <div>셀프 구직 활동 중입니다.</div>
      </ActivityDiv>
      <PortfolioDiv>
        <input type="text" placeholder="포트폴리오" />
        <input type="text" placeholder="Github" />
        <input type="text" placeholder="Blog" />
        <button>저장</button>
      </PortfolioDiv>
    </MainDiv>
  );
};

export default ResumeForm;

const PortfolioDiv = styled.div`
  width: 100%;
  height: 332px;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* background: #334eab; */
  input {
    margin-top: 20px;

    width: 386px;
    height: 40px;

    background: #ffffff;
    border: 1px solid #e0581d;
    border-radius: 15px;

    font-family: "Inter";
    font-size: 20px;
    line-height: 24px;

    color: #000000;
  }
  button {
    margin-top: 58px;

    width: 97px;
    height: 39px;

    background: #0a5ab9;
    border: none;
    border-radius: 15px;
    :hover {
      background: #084995;
    }

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    /* identical to box height */

    color: #ffffff;
  }
`;

const ActivityDiv = styled.div`
  width: 100%;
  height: 98px;

  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #17234f; */
  button {
    width: 90px;
    height: 41px;
    background: #44c82f;
    border: none;
    border-radius: 15px;

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;

    color: #000000;
  }
  div {
    text-align: center;

    width: 280px;
    height: 41px;
    line-height: 41px;
    background: #ffffff;
    border-bottom: 1px solid #d6d5d5;
  }
`;

const StackDiv = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  /* justify-content: center; */
  /* background: #d34b4b; */
  div {
    justify-content: center;
    width: 100%;
    &:nth-child(1) {
      height: 72px;
      display: flex;
      /* justify-content: center; */
      /* align-items: center; */
      /* background: #3050c2; */
    }
    &:nth-child(2) {
      height: 99px;
      display: flex;
      flex-direction: row;
      /* background: #8da1e8; */
      div {
        width: 58px;
        height: 28px;

        background: #db7e57;
        border-radius: 15px;
        text-align: left;

        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ffffff;
      }
    }
  }
  input {
    :focus {
      outline: none;
    }
    width: 286px;
    height: 39px;
    border: none;
    /* background: #ffffff; */
    border-bottom: 1px solid #d6d5d5;
  }
  button {
    width: 97px;
    height: 39px;

    background: #0a5ab9;
    border: none;
    border-radius: 15px;
    :hover {
      background: #084995;
    }

    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 24px;

    color: #ffffff;
  }
`;

const JobDiv = styled.div`
  width: 100%;
  height: 168px;

  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #ec8f8f; */
  input {
    margin-top: 25px;
    width: 386px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #e0581d;
    border-radius: 15px;
  }
`;

const IntroDiv = styled.div`
  width: 100%;
  height: 184px;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background: #952e2e; */
  textarea {
    width: 383px;
    height: 150px;

    resize: none;

    background: #ffffff;
    border: 1px solid #e0581d;
    border-radius: 15px;
  }
`;

const UserNameDiv = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* background: #e05555; */
  input {
    width: 385px;
    height: 39px;
    background: #ffffff;
    border: 1px solid #e0581d;
    border-radius: 15px;
  }
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 200px;
  /* background: #8e2c2c; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainDiv = styled.div`
  margin-left: 5%;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  height: 1250px;

  /* background: #d9d9d9; */
`;
