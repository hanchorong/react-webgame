import React, { useState, useRef, useEffect, useCallback } from "react";
import Ball from "./Ball";

function getNumbers() {
  console.log("getNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNum = shuffle[shuffle.length - 1];

  const winNums = shuffle.slice(0, 6).sort((p, c) => p - c);

  return [...winNums, bonusNum];
}

const Lotto = () => {
  const [winNums, setWinNum] = useState(getNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  const runTimeout = () => {
    for (let i = 0; i < winNums.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevWinBalls) => [...prevWinBalls, winNums[i]]);
      }, (i + 1) * 500);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNums[6]);
      setRedo(true);
    }, 3500);
  };

  useEffect(() => {
    console.log("useEffect");
    runTimeout();
    return () => {
      timeouts.current.forEach((v) => clearTimeout(v));
    };
  }, [timeouts.current]);
  //빈배열이면 componentDidMount와 동일. 즉 첫 랜더링 될 때 한번 실행이 되고
  //배열안의 써준 내용이 바뀔때 또 실행된다.
  //배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행

  const onClickRedo = useCallback(() => {
    console.log("onClickRedo");
    setWinNum(getNumbers);
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNums]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v, i) => (
          <Ball key={v + i} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};
export default Lotto;
