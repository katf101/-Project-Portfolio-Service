import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeStack } from "../../actions/post";

const StackCard = ({ stack }) => {
  const { removeStackLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const onRemoveStack = () => {
    dispatch(
      removeStack({
        stackId: stack.id,
      })
    );
  };

  return (
    <Maindiv>
      <button
        htmltype="button"
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
  button {
    width: auto;
    height: auto;

    border: none;
    color: #ffffff;
    background: none;
  }
`;
