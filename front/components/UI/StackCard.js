import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeStack } from "../../actions/post";
import Router from "next/router";

const StackCard = ({ stack }) => {
  const { removeStackLoading } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    stack;
  });

  const onRemoveStack = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    dispatch(
      removeStack({
        stackId: stack.id,
      })
    );
    alert("스택을 삭제하였습니다.");
    Router.replace(`/mypage/resume/${me.id}`).then(() =>
      window.scrollTo(scrollX, scrollY)
    );
  }, [stack.id]);

  return (
    <Maindiv>
      <button
        htmltype="button"
        // type="button"
        type="primary"
        onClick={onRemoveStack}
        loading={removeStackLoading}
      >
        {stack.stack}
      </button>
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
  :hover {
    cursor: pointer;
  }
  button {
    width: auto;
    height: auto;
    border: none;
    color: #ffffff;
    background: none;
    :hover {
      cursor: pointer;
    }
  }
`;
