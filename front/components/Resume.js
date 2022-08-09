import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import basic from "../public/images/basic.png";
import axios from "axios";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadStack } from "../actions/post";

const Resume = ({ postInfo, testId }) => {
  const singleStack = useSelector((state) => state.post.singleStack);
  const [imageData, setImageData] = useState("");
  const [idNum, setIdNum] = useState(0);
  const dispatch = useDispatch();
  const post = postInfo?.filter((v) => v.id === +testId);
  // const imageSrc = post.pop();

  const image = imageData;

  useEffect(() => {
    dispatch(loadStack({ userId: post?.[0]?.UserId }));
  }, [post?.[0]?.UserId]);

  useEffect(() => {
    async function getImage() {
      try {
        const { data } = await axios.get(`/image?info=${post[0].UserId}`);
        return setImageData(data);
      } catch (error) {
        console.error(error);
      }
    }
    getImage();
    setImageData((prev) => {
      if (prev?.UserId !== testId) null;
    });
    console.log(testId);
    console.log("여기", imageData);
    // console.log("imageData", imageData);
  }, [testId]);

  const myLoader = ({ src }) => {
    return `http://localhost:3060/${imageData.src}`;
  };

  return (
    <>
      {!post?.[0]?.User?.name && (
        <DefaultDiv>
          <DefaultBox>👉이름을 클릭해 주세요!</DefaultBox>
        </DefaultDiv>
      )}
      {post?.[0]?.User?.name && (
        <ResumeDiv>
          <NameDiv>
            <NameBox>{post?.[0]?.User?.name}님의 이력서📝</NameBox>
          </NameDiv>
          <ImageDiv>
            {image?.src ? (
              <Image
                loader={myLoader}
                // src={`http://localhost:3060/${image}`}
                src={`http://localhost:3060/${imageData.src}`}
                width={120}
                height={120}
              />
            ) : (
              <Image src={basic} width={120} height={120} />
            )}
          </ImageDiv>
          <IntroDiv>
            <IntroBox>{post?.[0]?.introduce}</IntroBox>
          </IntroDiv>
          <></>
          <JobDiv>
            <div>
              <div>구직 활동 여부:</div>
              <div
                style={{
                  color: post?.[0]?.job === true ? "#C75959" : "#000000",
                }}
              >
                {post?.[0]?.job === true
                  ? "활동중입니다."
                  : "활동중이 아닙니다."}
              </div>
            </div>
          </JobDiv>
          <PositionDiv>
            <div>
              <div>저의 활동분야는</div>
              <div>#{post?.[0]?.position}</div>
              <div>입니다.</div>
            </div>
          </PositionDiv>
          <CareerDiv>
            <div>
              <div>저의 경력은</div>
              <div>#{post?.[0]?.career}</div>
              <div>입니다.</div>
            </div>
          </CareerDiv>
          <StackDiv>
            <div>
              <div>제가 사용하는 </div>
              <div>#기술 스택</div>
              <div>입니다.</div>
            </div>
            <div>
              {singleStack && singleStack.map((v) => <div>{v.stack}</div>)}
            </div>
          </StackDiv>
          <PortfolioDiv>
            <div>포트폴리오</div>
            <div>{post?.[0]?.portfolio}</div>
          </PortfolioDiv>
          <GithubDiv>
            <div>Github</div>
            <div>{post?.[0]?.github}</div>
          </GithubDiv>
          <BlogDiv>
            <div>Blog</div>
            <div>{post?.[0]?.blog}</div>
          </BlogDiv>
        </ResumeDiv>
      )}
    </>
  );
};

export default Resume;

const DefaultBox = styled.div`
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 25px;
  color: #ffffff;

  background: #3a3845;
`;

const DefaultDiv = styled.div`
  width: 650px;
  height: 500px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 10px solid #3a3845;

  background: #b8aca2;
`;

const StackDiv = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  div {
    width: 90%;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    /* background: #3173d7; */
    :nth-child(1) {
      div {
        margin-right: 1px;
        width: auto;
        :nth-child(2) {
          width: auto;
          height: 30px;
          background: #ffcaca;
          border-radius: 5px;
          color: #485af4;
        }
      }
    }
    :nth-child(2) {
      div {
        width: auto;
        height: 300px;
        margin-right: 15px;
        display: flex;
        justify-content: center;
        :nth-child(n) {
          padding-left: 10px;
          padding-right: 10px;
          height: 36px;
          background: #db7e57;
          border-radius: 15px;
          color: #ffffff;
        }
      }
    }
  }
  /* background: #3173d7; */
`;

const BlogDiv = styled.div`
  margin-bottom: 30px;
  margin-left: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  div {
    :nth-child(2) {
      font-size: 16px;
    }
  }
  /* background: #000000; */
`;

const GithubDiv = styled.div`
  margin-bottom: 30px;
  margin-left: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  div {
    :nth-child(2) {
      font-size: 16px;
    }
  }

  /* background: #000000; */
`;

const PortfolioDiv = styled.div`
  margin-bottom: 30px;
  margin-left: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  div {
    :nth-child(2) {
      font-size: 16px;
    }
  }
`;

const JobDiv = styled.div`
  width: 90%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  div {
    display: flex;
    /* background: #5dcef2; */
    div {
      width: auto;
    }
  }

  /* background: #000000; */
`;

const CareerDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  div {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: #5dcef2; */
    div {
      width: auto;
      margin-right: 1px;
      :nth-child(2) {
        width: auto;
        height: 25px;
        background: #a7dfff;
        border-radius: 5px;
        color: #485af4;
      }
    }
  }
`;

const PositionDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 24px;
  div {
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: #5dcef2; */
    div {
      width: auto;
      margin-right: 1px;
      :nth-child(2) {
        width: auto;
        height: 25px;
        background: #aaf5bf;
        border-radius: 5px;
        color: #485af4;
      }
    }
  }

  /* background: #000000; */
`;

const IntroBox = styled.div`
  padding-left: 15px;
  padding-right: 15px;
  width: 400px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 16px;
  color: #ffffff;

  background: #3a3845;
`;
const IntroDiv = styled.div`
  width: auto;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  /* background: #000000; */
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* background: #000000; */
`;

const NameBox = styled.div`
  width: 400px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 25px;
  color: #ffffff;

  background: #3a3845;
`;

const NameDiv = styled.div`
  width: 100%;
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #000000; */
`;

const ResumeDiv = styled.div`
  width: 650px;
  height: 1000px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 10px solid #3a3845;

  background: #b8aca2;
`;
