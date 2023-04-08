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
  바위: 1,
  가위: 0,
  보: -1,
};

class RCP extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: "0", //이미지 좌표
  };

  interval;
  componentDidMount() {
    //컴포넌트가 첫 렌더링된 후, 여기에 비동기 요청을 많이함.
    this.interval = setInterval(() => {
      const { imgCoord } = this.state;
      if (imgCoord === rspCoords.바위) {
        this.setState({ imgCoord: rspCoords.가위 });
      } else if (imgCoord === rspCoords.가위) {
        this.setState({ imgCoord: rspCoords.보 });
      } else if (imgCoord === rspCoords.보) {
        this.setState({ imgCoord: rspCoords.바위 });
      }
    }, 500);
  }

  componentDidUpdate() {
    //리렌더링후
  }
  componentWillUnmount() {
    //컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이함.
  }

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
          <button id="rock" className="btn" onClick={() => onClickBtn("바위")}>
            바위
          </button>
          <button
            id="scissor"
            className="btn"
            onClick={() => onClickBtn("가위")}
          >
            가위
          </button>
          <button id="paper" className="btn" onClick={() => onClickBtn("보")}>
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
