import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const StackCard = ({ stack }) => {
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <Maindiv stackdiv>
      <button>{stack.stack}</button>
    </Maindiv>
  );
};

export default StackCard;

const Maindiv = styled.div`
  margin-top: 10px;
  margin-right: 5px;
  padding-left: 10px;
  padding-right: 10px;

  width: auto;
  height: 28px;

  background: #db7e57;
  border-radius: 15px;
  button {
    width: auto;
    height: auto;

    border: none;
    color: #ffffff;
    background: none;
  }
`;
