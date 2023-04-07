import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting",
    message: "클릭해서 시작하세요.",
    result: [],
  };

  timeOut;
  startTime;
  endTime;
  onClick = () => {
    const { state, message, result } = this.state;
    if (state === "waiting") {
      //--aqua
      //red
      this.setState({ state: "ready", message: "초록색 되면 클릭" });
      //green
      this.timeOut = setTimeout(() => {
        this.setState({ state: "now", message: "클릭하세요!!" });
        this.startTime = new Date();
      }, 1000 + Math.floor(Math.random() * 1000));
    } else if (state === "ready") {
      //--red
      clearTimeout(this.timeOut);
      //aqua
      this.setState({
        state: "waiting",
        message: "너무 빨리 클릭했어요. 초록색이 된 후 클릭하세요!",
      });
    } else if (state === "now") {
      //--green
      this.endTime = new Date();
      //aqua
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요.",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };
  onClickReset = () => {
    this.setState({ result: [] });
  };
  render() {
    return (
      <>
        <div id="screen" className={this.state.state} onClick={this.onClick}>
          {this.state.message}
        </div>
        {this.state.result.length === 0 ? null : (
          <>
            <div>
              평균 시간:
              {this.state.result.reduce((a, c) => a + c) /
                this.state.result.length}
              ms
            </div>
            <button onClick={this.onClickReset}>리셋</button>
          </>
        )}
      </>
    );
  }
}

export default ResponseCheck;
