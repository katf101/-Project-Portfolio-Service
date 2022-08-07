import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

const PostCard = ({ post, stack }) => {
  return (
    <MainDiv>
      <LeftDiv>
        <Link
          href={{
            pathname: "/post/detail",
            query: {
              postName: JSON.stringify(post.User.name),
              postIntro: JSON.stringify(post.introduce),
              postPosition: JSON.stringify(post.position),
              postJob: JSON.stringify(post.job),
              postCareer: JSON.stringify(post.career),
              postPofol: JSON.stringify(post.portfolio),
              postGit: JSON.stringify(post.github),
              postBlog: JSON.stringify(post.blog),
              postUserId: JSON.stringify(post.User.id),
            },
          }}
        >
          <NameDiv>{post.User.name}</NameDiv>
        </Link>
        <EmailDiv>Email: {post.User.email}</EmailDiv>
        <JobhuntDiv
          style={{ color: post.job === true ? "#52b63a" : "#AEB6AC" }}
        >
          {post.job === true ? "구직활동 중입니다!" : "활동중이 아닙니다."}
        </JobhuntDiv>
      </LeftDiv>
      <LineDiv>
        <Line />
      </LineDiv>
      <RightDiv>
        <CareerDiv>경력: {post.career}</CareerDiv>
        <PositionDiv>분야: {post.position}</PositionDiv>
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
  width: 170px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background: #8e3838; */
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
  margin-left: 15px;
  width: 240px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: baseline;

  /* background: #d9d9d9; */
`;

const MainDiv = styled.div`
  margin-top: 20px;

  width: 425px;
  height: 100px;

  display: flex;
  align-items: center;

  background: #ffffff;
  border: 1px solid #3b76cf;
  border-radius: 10px;
  z-index: 1;
`;
