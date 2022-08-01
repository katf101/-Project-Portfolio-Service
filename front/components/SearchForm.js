import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import styled from "styled-components";

const SearchForm = () => {
  const [search, setSearch] = useState("");
  const onInputChange = (e) => {
    setSearch(e.target.value);
  };

  const onButtonHandler = () => {
    Router.push(`/jobhunt?search=${search}`);
  };

  return (
    <SearchMainDiv>
      <div>
        <input value={search} onChange={onInputChange} type="text" />
        <button onClick={onButtonHandler}></button>
      </div>
    </SearchMainDiv>
  );
};

export default SearchForm;

const SearchMainDiv = styled.div`
  /* padding-top: 40px; */
  margin-top: 40px;
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #79d2cd; */

  div {
    width: 100%;
    height: 125px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #4461ab;
  }

  input {
    padding: 5px;
    width: 330px;
    height: 35px;

    background: #d9f9f9;
    border-radius: 10px 0px 0px 10px;
  }

  button {
    width: 49px;
    height: 49px;

    background: #c99a9a;
    border-radius: 0px 10px 10px 0px;
  }
`;
