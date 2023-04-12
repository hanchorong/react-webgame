import React, { memo, useState, useCallback } from "react";

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(10);

  const onChangeRow = useCallback(
    (e) => {
      setRow(e.target.value);
    },
    [row]
  );
  const onChangeCell = useCallback(
    (e) => {
      setCell(e.target.value);
    },
    [cell]
  );
  const onChangeMine = useCallback(
    (e) => {
      setMine(e.target.value);
    },
    [mine]
  );

  const onClickBtn = useCallback(() => {}, []);
  return (
    <>
      <form>
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
      </form>
    </>
  );
});

export default Form;
