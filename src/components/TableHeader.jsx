import React from "react";

// useCallback and React.memo are unnecessary here 
// because the number of columns is small and re-renders are trivial
function TableHeader({ data, visibleColumns }) {
  const displayedCols = data.filter((col) => visibleColumns.includes(col.id));
  return (
    <div className="table-row table-header">
      {displayedCols.map((col) => (
        <div
          key={col.id}
          className="table-cell"
          style={{ width: `${col.width}px`, flex: '0 0 auto' }}
        >
          {col.title}
        </div>
      ))}
    </div>
  );
}

export default TableHeader;
