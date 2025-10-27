import TableCell from "./TableCell";
import React from "react";

// memo on TableRow would prevent all rows from re-rendering unnecessarily
// when toggling visible columns a minor extra optimization
const TableRow = React.memo(function TableRow({ row, colsData, visibleColumns, dispatch }) {
  const displayedCols = colsData.filter((col) => visibleColumns.includes(col.id));
  return (
    <div className="table-row" style={{ display: "flex", width: "100%" }}>
      {displayedCols.map((col) => (
        <TableCell
          key={col.id}
          rowId={row.id}
          colData={col}
          value={row[col.id]}
          dispatch={dispatch}
          width={col.width} 
        />
      ))}
    </div>
  );
});

export default TableRow;
