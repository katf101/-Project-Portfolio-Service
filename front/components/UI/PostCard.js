import React from "react";
import styled from "styled-components";

const PostCard = () => {
  return (
    <>
      <MainDiv>
        <div>
          <ul>
            <li>사진</li>
            <li>이름</li>
            <li>신입</li>
            <li>프론트엔드</li>
            <li>구직활동 중입니다!</li>
          </ul>
        </div>
        <div>
          <ul>
            <li>리액트</li>
            <li>리덕스</li>
            <li>노드</li>
          </ul>
        </div>
      </MainDiv>
    </>
  );
};

export default PostCard;

const MainDiv = styled.div`
  margin-top: 10px;

  width: 386px;
  height: 86px;

  display: flex;
  flex-direction: column;

  background: #ffffff;
  border: 1px solid #e0581d;
  border-radius: 15px;
  div {
    &:nth-child(1) {
      width: 385px;
      height: 43px;

      /* background: #33bfb7; */
      ul {
        list-style: none;
        display: flex;
        justify-content: flex-start;
      }
    }
  }
  div {
    &:nth-child(2) {
      width: 385px;
      height: 43px;

      /* background: #4c34dd; */
      ul {
        list-style: none;
        display: flex;
        justify-content: flex-start;
      }
    }
  }
`;
