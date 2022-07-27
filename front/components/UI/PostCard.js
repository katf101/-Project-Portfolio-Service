import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);

  return (
    <>
      <MainDiv>
        <MainTopDiv>
          <div></div>
          <div>{post.career}</div>
          <div>{post.position}</div>
          <div>{post.job === true ? "구직활동 중입니다!" : ""}</div>
        </MainTopDiv>
        <MainBottomDiv>
          <div>리액트</div>
          <div>리덕스</div>
          <div>노드</div>
        </MainBottomDiv>
      </MainDiv>
      {/* {children} */}
    </>
  );
};

export default PostCard;

const MainBottomDiv = styled.div`
  width: 400px;
  height: 33px;

  display: flex;
`;

const MainTopDiv = styled.div`
  width: 400px;
  height: 55px;

  display: flex;
  align-items: center;
  border-bottom: 1px solid #8d8d8d;

  /* background: #75e39a; */
  div {
    :nth-child(1) {
      width: 50px;
      height: 50px;

      background: #75e39a;
    }
    :nth-child(2) {
      width: 75px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      /* background: #fff; */
    }
    :nth-child(3) {
      width: 125px;
      height: 50px;
      line-height: 50px;
      text-align: start;
      /* background: #fff; */
    }
    :nth-child(4) {
      width: 150px;
      height: 50px;
      line-height: 50px;
      text-align: center;

      color: #52b63a;
    }
  }
`;

const MainDiv = styled.div`
  margin-top: 20px;

  width: 425px;
  height: 86px;

  display: flex;
  align-items: center;
  flex-direction: column;

  background: #ffffff;
  border: 1px solid #e0581d;
  border-radius: 15px;
  z-index: 1;
`;
