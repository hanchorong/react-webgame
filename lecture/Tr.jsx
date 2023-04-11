import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, i) => (
          <Td
            key={i}
            cellIndex={i}
            rowIndex={rowIndex}
            cellData={rowData[i]}
            dispatch={dispatch}
          >
            {""}
          </Td>
        ))}
    </tr>
  );
});

export default Tr;
