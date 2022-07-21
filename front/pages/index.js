import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import PostCard from "../components/UI/PostCard";

const Home = () => {
  return (
    <Layout>
      <MainDiv>
        <div>d</div>
        <div></div>
        <PostCard></PostCard>
      </MainDiv>
    </Layout>
  );
};

export default Home;

const MainDiv = styled.div`
  margin-left: 5%;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 90%;
  height: 960px;
  background: #d9d9d9;
  div {
    &:nth-child(1) {
      width: 100%;
      height: 110px;

      background: #e87777;
    }
  }
`;
