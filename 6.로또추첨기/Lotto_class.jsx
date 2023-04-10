import React, { Component } from "react";
import Ball from "../lecture/Ball";

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

class Lotto extends Component {
  state = {
    winNums: getNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = [];

  runTimeout = () => {
    const { winNums } = this.state;
    for (let i = 0; i < this.state.winNums.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNums[i]],
          };
        });
      }, (i + 1) * 500);
    }
    this.timeouts[6] = setTimeout(() => {
      this.setState({ bonus: winNums[6], redo: true });
    }, 3500);
  };

  componentDidMount() {
    //맨 처음 화면
    this.runTimeout();
  }

  componentDidUpdate() {
    //redo 눌렀을때 <- 리 랜더링
    if (this.state.winBalls.length === 0) {
      //초기화되어서 아무것도 없을떄
      this.runTimeout();
    }
  }

  componentWillUnmount() {
    this.timeouts.forEach((v) => clearTimeout(v));
    //배열에 넣어준 setTimeout 들을 clearTimeout 해줘라.
  }

  onClickRedo = () => {
    this.setState({
      winNums: getNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };
  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한 번 더!</button>}
      </>
    );
  }
}
export default Lotto;
