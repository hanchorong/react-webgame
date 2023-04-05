const React = require("react");
const { Component } = React;

class Gugudan extends Component {
  state = {
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (parseInt(this.state.value) === this.state.first * this.state.second) {
      // this.setState({
      //   result: this.state.value + "정답",
      //   first: Math.ceil(Math.random() * 9),
      //   second: Math.ceil(Math.random() * 9),
      //   value: "",
      // }); //또는 prevState를 return 하자
      this.setState((prevState) => {
        return {
          result: prevState.value + "정답",
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: "",
        };
        this.input.focus();
      });
    } else {
      this.setState({
        result: `${this.state.first * this.state.second}(이)가 정답입니다.`,
        value: "",
      });
      this.input.focus();
    }
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  input;

  render() {
    return (
      <div>
        <div>
          {this.state.first} 곱하기 {this.state.second}는?
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={(c) => {
              this.input = c;
            }}
            type="number"
            value={this.state.value}
            onChange={this.onChange}
          ></input>
          <button>입력!!!</button>
        </form>
        <div>{this.state.result}</div>
      </div>
    );
  }
}

module.exports = Gugudan;
