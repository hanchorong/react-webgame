import React, { memo } from "react";

const Try = memo(({ tryInfo }) => {
  //부모에게서 받은 props는 자식이 바꾸면 안된다. 대신 state로 만들어준다.
  return (
    <>
      <li>{tryInfo.try}</li>
      <li>{tryInfo.result}</li>
    </>
  );
});
Try.displayName = "Try";

export default Try;
