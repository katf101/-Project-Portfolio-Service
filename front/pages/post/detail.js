import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import basic from "../../public/images/basic.png";

import axios from "axios";
import { loadMyInfo, loadUser, userInfo } from "../../actions/user";
import { loadPosts, loadPost, loadStack } from "../../actions/post";
import wrapper from "../../store/configureStore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Detail = () => {
  const dispatch = useDispatch();
  const { singleStack } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const route = useRouter();
  const [imageData, setImageData] = useState("");
  const userInfo = new Object();
  // userInfo = route.query["postInfo"];
  let fruitKeys = Object.keys(route.query);

  const stack = singleStack;

  async function getImage() {
    try {
      const { data } = await axios.get(`/image?info=${route.query.postUserId}`);
      return setImageData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("자소", route.query.postIntro.slice(1, -1).split("\\n"));
    // console.log("스택", stack && stack[0].User.name);
    console.log("이미지", getImage());
    console.log("이미지2", imageData);
  }, [route, singleStack]);

  useEffect(() => {
    dispatch(
      loadStack({
        userId: +route.query.postUserId,
        // UserId: route.query.postUserId,
      })
    );
  }, []);

  const myLoader = ({ src }) => {
    return `http://localhost:3060/${imageData.src}`;
  };

  return (
    <MainDiv>
      <ImageDiv>
        {imageData.src ? (
          <Image
            loader={myLoader}
            src={`http://localhost:3060/${imageData.src}`}
            width={150}
            height={150}
            style={{ zIndex: "1" }}
          />
        ) : (
          <Image src={basic} width={150} height={150} style={{ zIndex: "1" }} />
        )}
      </ImageDiv>
      {/* <div></div> */}
      <NameDiv>{route.query.postName.slice(1, -1)}</NameDiv>
      <IntroDiv>
        {route.query.postIntro
          .slice(1, -1)
          .split("\\n")
          .map((v) => (
            <div>
              {v}
              <br />
            </div>
          ))}
      </IntroDiv>
      <Line1Div>
        <div></div>
      </Line1Div>
      <JobMainDiv>
        <JobMiddleDiv>
          <JobDiv>
            <div>
              <div>구직 활동 여부:</div>
              <div
                style={{
                  color: route.query.postJob === "true" ? "#C75959" : "#000000",
                }}
              >
                {route.query.postJob === "true"
                  ? "활동중입니다."
                  : "활동중이 아닙니다."}
              </div>
            </div>
          </JobDiv>
          <PositionDiv>
            <div>
              <div>저의 활동분야는</div>
              <div>#{route.query.postPosition.slice(1, -1)}</div>
              <div>입니다.</div>
            </div>
          </PositionDiv>
          <CareerDiv>
            <div>
              <div>저의 경력은</div>
              <div>#{route.query.postCareer.slice(1, -1)}</div>
              <div>입니다.</div>
            </div>
          </CareerDiv>
          <StackDiv>
            <div>
              <div>제가 사용하는 </div>
              <div>#기술 스택</div>
              <div>입니다.</div>
            </div>
            <div>{stack && stack.map((v) => <div>{v.stack}</div>)}</div>
          </StackDiv>
        </JobMiddleDiv>
      </JobMainDiv>
      <Line2Div>
        <div></div>
      </Line2Div>
      <AddressMainDiv>
        <AddressMiddleDiv>
          <PofolDiv>
            <div>포트폴리오</div>
            <div>{route.query.postPofol.slice(1, -1)}</div>
          </PofolDiv>
          <BlogDiv>
            <div>Blog</div>
            <div>{route.query.postBlog.slice(1, -1)}</div>
          </BlogDiv>
          <GitDiv>
            <div>Github</div>
            <div>{route.query.postGit.slice(1, -1)}</div>
          </GitDiv>
        </AddressMiddleDiv>
      </AddressMainDiv>
      <ButtonDiv>
        {/* <MessageButton>메시지</MessageButton> */}
        <BackButton>뒤로가기</BackButton>
      </ButtonDiv>
      {/* </Layout> */}
    </MainDiv>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    // 쿠키가 브라우저에 있는경우만 넣어서 실행
    // (주의, 아래 조건이 없다면 다른 사람으로 로그인 될 수도 있음)
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    // await context.store.dispatch(loadPost({ postId }));
    // await context.store.dispatch(loadStack({ userId: context.params.id }));
    await context.store.dispatch(loadMyInfo());

    return {
      props: {},
    };
  }
);

export default Detail;

const JobMiddleDiv = styled.div`
  width: 467px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background: #0a5ab9; */
`;

const JobMainDiv = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
`;

const BackButton = styled.button`
  margin-bottom: 30px;
  width: 97px;
  height: 39px;

  background: #0a5ab9;
  border-radius: 15px;

  font-size: 20px;
  color: #ffffff;
`;

const ButtonDiv = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* background: #f44dbc; */
`;

const GitDiv = styled.div`
  margin-bottom: 30px;
  margin-left: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  div {
    :nth-child(2) {
      font-size: 16px;
    }
  }
  /* background: #b051eb; */
`;

const BlogDiv = styled.div`
  margin-bottom: 30px;
  margin-left: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  div {
    :nth-child(2) {
      font-size: 16px;
    }
  }
  /* background: #b051eb; */
`;

const PofolDiv = styled.div`
  margin-bottom: 30px;
  margin-left: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 24px;
  div {
    :nth-child(2) {
      font-size: 16px;
    }
  }

  /* background: #b051eb; */
`;

const AddressMiddleDiv = styled.div`
  width: 467px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background: #0a5ab9; */
`;

const AddressMainDiv = styled.div`
  width: 100%;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #b051eb; */
`;

const Line2Div = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #5f74e1; */
  div {
    width: 90%;
    height: 0px;
    border: 1px solid #e8e8e8;
  }
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

const CareerDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  div {
    width: 90%;
    display: flex;
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
  /* background: #1781a3; */
`;

const PositionDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  font-size: 24px;
  div {
    width: 90%;
    display: flex;
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
  /* background: #5dcef2; */
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
  /* background: #90fad3; */
`;

const Line1Div = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #5f74e1; */
  div {
    width: 90%;
    height: 0px;
    border: 1px solid #e8e8e8;
  }
`;

const IntroDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: #acebf3; */
`;

const NameDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  /* background: #b6a7a7; */
`;

const ImageDiv = styled.div`
  width: 100%;
  height: 147px;
  display: flex;
  justify-content: center;
  z-index: 1;
  /* background: #f48989; */
`;

const MainDiv = styled.div`
  margin-top: 50px;
  width: 100%;
  /* height: 1319px; */

  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f3f9fa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
