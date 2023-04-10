import React, { useState, useRef, useEffect } from "react";
import useInterval from "./useInterval"; //커스텀훅

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RCP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  // const interval = useRef();

  // useEffect(() => {
  //   //componentDidMount, componentDidUpdate 역할(1 대 1 대응은 아님)
  //   interval.current = setInterval(changeHand, 100);

  //   return () => {
  //     //componentWillUnmount 역할
  //     clearInterval(interval.current);
  //   };
  // }, [imgCoord]); //useEffect를 실행하고 싶은 state를 []안에 넣어준다. 본 예제에서는 changeHand의 imgCoord가 바뀔때 실행되므로 imgCoord를 넣어줌.

  //위의 주석부분 커스텀훅으로 우아하게 바꾸기
  const [isRunning, setIsRunning] = useState(true);

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else if (imgCoord === rspCoords.보) {
      setImgCoord(rspCoords.바위);
    }
  };

  useInterval(changeHand, isRunning ? 100 : null);

  const onClickBtn = (choice) => () => {
    if (isRunning) {
      setIsRunning(false);

      const myScore = scores[choice];
      const cpuScore = scores[computerChoice(imgCoord)];
      const diff = myScore - cpuScore;
      if (diff === 0) {
        setResult("비겼어요");
      } else if ([-1, 2].includes(diff)) {
        setResult("이겼어요");
        setScore((prevScore) => prevScore + 1);
      } else {
        setResult("졌어요..");
        setScore((prevScore) => prevScore - 1);
      }
      setTimeout(() => {
        //가위바위보 하고 나서 1초 정도 기다린 후 다시 시작.
        // interval.current = setInterval(changeHand, 100);
        setIsRunning(true);
      }, 1000);
    }
  };
  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      ></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}</div>
    </>
  );
};
export default RCP;
