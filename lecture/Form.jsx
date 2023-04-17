import React, { memo, useState, useCallback, useContext } from "react";
import { TableContext, START_GAME } from "./MineSearch";

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(10);

  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);
  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);
  return (
    <>
      <div>
        <input
          onChange={onChangeRow}
          value={row}
          placeholder="열"
          type="number"
        />
        <input
          onChange={onChangeCell}
          value={cell}
          placeholder="칸"
          type="number"
        />
        <input
          onChange={onChangeMine}
          value={mine}
          placeholder="지뢰"
          type="number"
        />
        <button onClick={onClickBtn}>시작</button>
      </div>
    </>
  );
});

export default Form;
