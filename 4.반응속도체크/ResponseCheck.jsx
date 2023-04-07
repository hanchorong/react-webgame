import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요.");
  const [result, setResult] = useState([]);

  const timeOut = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  const onClick = () => {
    if (state === "waiting") {
      //--aqua
      //red
      setState("ready");
      setMessage("초록색 되면 클릭");
      //green
      timeOut.current = setTimeout(() => {
        setState("now");
        setMessage("클릭하세요!!");
        startTime.current = new Date();
        console.log("startTime", startTime);
      }, 1000 + Math.floor(Math.random() * 1000));
    } else if (state === "ready") {
      //--red
      clearTimeout(timeOut.current);
      //aqua
      setState("waiting");
      setMessage("너무 빨리 클릭했어요. 초록색이 된 후 클릭하세요!");
    } else if (state === "now") {
      //--green
      endTime.current = new Date();
      console.log("endTime", endTime);

      //aqua
      setState("waiting");
      setMessage("클릭해서 시작하세요.");
      setResult((prevResult) => [
        ...prevResult,
        endTime.current - startTime.current,
      ]);
      console.log(endTime - startTime);
    }
  };
  const onClickReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>
          평균 시간:
          {result.reduce((a, c) => a + c) / result.length}
          ms
        </div>
        <button onClick={onClickReset}>리셋</button>
      </>
    );
  };
  return (
    <>
      <div id="screen" className={state} onClick={onClick}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
