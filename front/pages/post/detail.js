import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Router, { useRouter } from "next/router";

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
  const userInfo = new Object();
  // userInfo = route.query["postInfo"];
  let fruitKeys = Object.keys(route.query);

  const stack = singleStack;

  useEffect(() => {
    // console.log("스택", stack && stack[0].User.name);
    console.log("스택", stack);
    console.log("싱글스택", singleStack);
    console.log("라우터", route);
    console.log("라우터쿼리", route.query);
    console.log("유저아디", route.query.postUserId);
    console.log("네임", route.query.postName.slice(1, -1));
    console.log("인트로", route.query.postIntro.slice(1, -1));
    console.log("좝", route.query.postJob);
    console.log("포지션", route.query.postPosition.slice(1, -1));
    console.log("유저", route.query.postCareer.slice(1, -1));
    // console.log("유저", route.query.postName.slice(1, -1));
    console.log("포폴", route.query.postPofol.slice(1, -1));
    console.log("블로그", route.query.postBlog.slice(1, -1));
    console.log("깃", route.query.postGit.slice(1, -1));
    // console.log("유저인포", userInfo["id"]);
  }, [route, singleStack]);

  useEffect(() => {
    dispatch(
      loadStack({
        userId: +route.query.postUserId,
        // UserId: route.query.postUserId,
      })
    );
  }, []);

  return (
    // <Layout>
    <MainDiv>
      <ImageDiv></ImageDiv>
      {/* <div></div> */}
      <NameDiv>{route.query.postName.slice(1, -1)}</NameDiv>
      <IntroDiv>{route.query.postIntro.slice(1, -1)}</IntroDiv>
      <Line1Div>
        <div></div>
      </Line1Div>
      <JobDiv>
        <div>
          구직 활동 여부:
          {route.query.postJob === "true"
            ? "활동중입니다."
            : "활동중이 아닙니다."}
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
      <Line2Div>
        <div></div>
      </Line2Div>
      <AddressMainDiv>
        <AddressDiv>
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
        </AddressDiv>
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

const BackButton = styled.button`
  margin-bottom: 30px;
  width: 97px;
  height: 39px;

  background: #0a5ab9;
  border-radius: 15px;

  font-size: 20px;
  color: #ffffff;
`;
const MessageButton = styled.button`
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
  /* background: #b051eb; */
`;

const BlogDiv = styled.div`
  margin-bottom: 30px;
  /* background: #b051eb; */
`;

const PofolDiv = styled.div`
  margin-bottom: 30px;
  /* background: #b051eb; */
`;

const AddressDiv = styled.div`
  width: 90%;
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* background: #b051eb; */
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
          height: 25px;
          background: #ffcaca;
          border-radius: 5px;
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
          height: 28px;
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
      }
    }
  }
  /* background: #5dcef2; */
`;

const JobDiv = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    width: 90%;
    line-height: 50px;
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
  /* background: #f48989; */
`;

const MainDiv = styled.div`
  width: 100%;
  /* height: 1319px; */

  display: flex;
  flex-direction: column;
  align-items: center;

  background: #f3f9fa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
