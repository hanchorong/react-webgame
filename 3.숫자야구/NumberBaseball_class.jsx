import React, { Component } from "react";
import Try from "../lecture/Try";
//숫자 네개를 겹치지 않고 랜덤하게 뽑는 함수
function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [],
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState((prevState) => {
        return {
          result: "홈런",
          tries: [
            ...prevState.tries,
            { try: this.state.value, result: "홈런" },
          ],
        };
      });
      alert("게임을 다시 시작합니다.");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      //틀린 답
      const answerArr = this.state.value.split("").map((v) => parseInt(v));
      console.log(answerArr);
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}였습니다.`,
        });
        alert("게임을 다시 시작합니다.");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArr[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArr[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [
              ...prevState.tries,
              {
                try: this.state.value,
                result: `${strike} 스트라이크 ${ball} 볼`,
              },
            ],
            value: "",
          };
        });
      }
    }
  };
  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };
  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.onChangeInput}
          ></input>
          <button>입력!</button>
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((v, i) => {
            return <Try key={i + 1} tryInfo={v} />;
          })}
        </ul>
      </>
    );
  }
}
export default NumberBaseball;
