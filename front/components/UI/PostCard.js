import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { loadPost } from "../../actions/post";
import { useDispatch, useSelector } from "react-redux";

const PostCard = ({ post, id, setTestId }) => {
  const dispatch = useDispatch();

  //########//

  //########//

  const onNameClick = (e) => {
    setTestId(e.target.id);
    dispatch(
      loadPost({
        postId: e.target.id,
      })
    );
  };
  return (
    <MainDiv>
      <LeftDiv>
        <NameDiv id={id} onClick={onNameClick} name={post?.User?.name}>
          Name: {post?.User?.name}
        </NameDiv>
        {/* </Link> */}
        <EmailDiv>Email: {post?.User?.email}</EmailDiv>
        <JobhuntDiv
          style={{ color: post?.job === true ? "#52b63a" : "#AEB6AC" }}
        >
          {post?.job === true ? "구직활동 중입니다!😄" : "활동중이 아닙니다.☹"}
        </JobhuntDiv>
      </LeftDiv>
      <RightDiv>
        <CareerDiv>경력: {post.career}</CareerDiv>
        <PositionDiv>포지션: {post.position}</PositionDiv>
      </RightDiv>
    </MainDiv>
  );
};

export default PostCard;

const PositionDiv = styled.div`
  width: 9.27vw;
  height: 1.72vw;
  line-height: 1.72vw;

  /* background: #8e3838; */
`;

const CareerDiv = styled.div`
  width: 9.27vw;
  height: 1.72vw;
  line-height: 1.72vw;

  /* background: #8e3838; */
`;

const RightDiv = styled.div`
  padding-left: 0.78vw;
  width: 10.42vw;
  height: 6.25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 0.26vw;
  background: #fff4cf;
`;

const JobhuntDiv = styled.div`
  width: 11.98vw;
  height: 1.72vw;
  line-height: 1.72vw;
  font-weight: bold;

  /* background: #8e3838; */
`;

const EmailDiv = styled.div`
  width: 11.98vw;
  height: 1.72vw;
  line-height: 1.72vw;
  font-size: 14px;
  /* background: #8e3838; */
`;

const NameDiv = styled.div`
  width: auto;
  height: 1.72vw;
  line-height: 1.72vw;

  cursor: pointer;
  :hover {
    color: #485af4;
  }
  /* background: #8e3838; */
`;

const LeftDiv = styled.div`
  padding-left: 0.78vw;
  width: 11.46vw;
  height: 6.25vw;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  border-radius: 0.26vw;
  background: #d9d8d5;
`;

const MainDiv = styled.div`
  margin-bottom: 2.08vw;

  width: 26.04vw;
  height: 7.29vw;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0vw 0.21vw 0.21vw rgba(0, 0, 0, 0.25);
  background: #3a3845;
`;
