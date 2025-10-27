import { useReducer, useEffect, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { tableReducer, ACTIONS } from "../reducers/tableReducer";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import ColumnSelector from "./ColumnSelector";
import { tableData } from "../data/mockData";


export default function Table() {
  const parentRef = useRef();

  const [state, dispatch] = useReducer(tableReducer, {
    columns: [],     
    dataMap: {},      
    rowIds: [],       
    visibleColumns: [],
  });

  useEffect(() => {
    dispatch({ type: ACTIONS.INIT, payload: tableData });
  }, []);

  const visibleColsData = state.columns.filter((c) =>
    state.visibleColumns.includes(c.id)
  );
  const rowVirtualizer = useVirtualizer({
    count: state.rowIds.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 75, 
    overscan: 5,
  });

  useEffect(() => {
    rowVirtualizer.measure();
  }, [state.rowIds.length, rowVirtualizer]);

  return (
    <div className="table-container">
      <ColumnSelector
        columns={state.columns}
        visibleColumns={state.visibleColumns} // the cols themself
        dispatch={dispatch}
      />

        <div className="table-header-container">
          <TableHeader data={visibleColsData} visibleColumns={state.visibleColumns} />
        </div>
      <div ref={parentRef} className="table-scroll">
        <div
          className="table-virtual"
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const rowId = state.rowIds[virtualRow.index];
            const row = state.dataMap[rowId];
            return (
              <div
                key={row.id}
                ref={virtualRow.measureRef} 
                className="table-row-virtual"
                style={{ 
                  transform: `translateY(${virtualRow.start}px)`,
                  minHeight: `${virtualRow.size}px`, 
                }}
              >
                <TableRow
                  row={row}
                  colsData={visibleColsData}
                  visibleColumns={state.visibleColumns}
                  dispatch={dispatch}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
