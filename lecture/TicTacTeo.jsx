import React, { useEffect, useReducer, useCallback } from "react";
import Table from "./Table";

const initialState = {
  //state를 묶어준다.
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
  draw: false,
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_TABLE_DATA = "RESET_TABLE_DATA";

const reducer = (state, action) => {
  //setState와 같은 역할
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로 가독성해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    }
    case RESET_TABLE_DATA: {
      return {
        ...state,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TicTacTeo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState("");
  // const [turn, setTurn] = useState("0");
  // const [tableData, setTableData] = useState([
  //   ["", "", ""],
  //   ["", "", ""],
  //   ["", "", ""],
  // ]);

  const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER, winner: "0" });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    let win = false;
    if (row < 0) return;

    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    if (win) {
      //승리
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_TABLE_DATA });
    } else {
      //무승부검사
      let all = true; //all이 true면 무승부
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_TABLE_DATA });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);
  //테이블 데이터가 바뀔때마다 실행하라.
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {/* {winner && <div>{winner}님의 승리</div>} */}
      {winner && <div>{winner}님의 승리</div>}
    </>
  );
};

export default TicTacTeo;
