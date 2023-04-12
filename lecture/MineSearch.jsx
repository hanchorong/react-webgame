import React, { useReducer, useState, useRef } from "react";
import Table from "./Table";
import Form from "./Form";

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Form />
      <div>{state.time}초</div>
      <Table />
      <div>{state.result}</div>
    </>
  );
};

export default MineSearch;
