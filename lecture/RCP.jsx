import React, { Component } from "react";

//라이프사이클(클래스의경우)
//constructor -> render -> ref -> componentDidMount
//(setState/props 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate
//부모가 나를 없앴을때 -> componentWillUnmount -> 소멸
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

class RCP extends Component {
  state = {
    result: "",
    imgCoord: rspCoords.바위, //이미지 좌표
    score: 0,
  };

  interval;

  componentDidMount() {
    //컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이함.
    this.interval = setInterval(this.changeHand, 100);
  }

  // componentDidUpdate() {
  //   //리 렌더링 후
  // }
  componentWillUnmount() {
    //컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이함.
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    if (imgCoord === rspCoords.바위) {
      this.setState({ imgCoord: rspCoords.가위 });
    } else if (imgCoord === rspCoords.가위) {
      this.setState({ imgCoord: rspCoords.보 });
    } else if (imgCoord === rspCoords.보) {
      this.setState({ imgCoord: rspCoords.바위 });
    }
  };

  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({ result: "비겼어요" });
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: "이겼어요!",
          score: prevState.score + 1,
        };
      });
    } else {
      this.setState((prevState) => {
        return {
          result: "졌어요..",
          score: prevState.score - 1,
        };
      });
    }
    setTimeout(() => {
      //가위바위보 하고 나서 1초 정도 기다린 후 다시 시작.
      this.interval = setInterval(this.changeHand, 100);
    }, 1000);
  };
  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
          }}
        ></div>
        <div>
          <button id="rock" className="btn" onClick={this.onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={this.onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn("보")}>
            보
          </button>
        </div>
        <div>{result}</div>
        <div>현재 {score}</div>
      </>
    );
  }
}
export default RCP;
