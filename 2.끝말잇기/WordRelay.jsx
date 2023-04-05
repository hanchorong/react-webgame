const React = require("react");
const { useState, useRef } = React;
const WordRelay = () => {
  const [word, setWord] = React.useState("한초롱");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const onRefInput = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult("정답");
      setValue("");
      onRefInput.current.focus();
    } else {
      setResult("땡");
      setValue("");
      onRefInput.current.focus();
    }
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요:</label>
        <input type="text" ref={onRefInput} onChange={onChange} value={value} />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
