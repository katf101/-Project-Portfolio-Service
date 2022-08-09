import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { loadPost } from "../../actions/post";
import Resume from "../Resume";
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
  width: 178px;
  height: 33px;
  line-height: 33px;

  /* background: #8e3838; */
`;

const CareerDiv = styled.div`
  width: 178px;
  height: 33px;
  line-height: 33px;

  /* background: #8e3838; */
`;

const RightDiv = styled.div`
  padding-left: 15px;
  width: 200px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  background: #fff4cf;
`;

const Line = styled.div`
  width: 0px;
  height: 80px;

  border: 1px solid #338496;
`;

const LineDiv = styled.div`
  width: 7px;
  height: 100px;
  display: flex;
  align-items: center;
  /* background: #3e58b7; */
`;

const JobhuntDiv = styled.div`
  width: 230px;
  height: 33px;
  line-height: 33px;
  font-weight: bold;

  /* background: #8e3838; */
`;

const EmailDiv = styled.div`
  width: 230px;
  height: 33px;
  line-height: 33px;

  /* background: #8e3838; */
`;

const NameDiv = styled.div`
  width: auto;
  height: 33px;
  line-height: 33px;

  cursor: pointer;
  :hover {
    color: #485af4;
  }
  /* background: #8e3838; */
`;

const LeftDiv = styled.div`
  padding-left: 15px;
  width: 220px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  border-radius: 5px;
  background: #d9d8d5;
`;

const MainDiv = styled.div`
  margin-bottom: 40px;

  width: 500px;
  height: 140px;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background: #3a3845;
`;
