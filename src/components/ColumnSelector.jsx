import React from "react";
import { ACTIONS } from "../reducers/tableReducer";

// useCallback and React.memo are unnecessary here 
// because the number of checkboxes is small and re-renders are trivial
function CheckboxItem({ id, title, checked, onToggle }) {
  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)} 
      />
      {title}
    </label>
  );
}

export default function ColumnSelector({ columns, visibleColumns, dispatch }) {
  const handleToggle = (colId) => {
    const updated = visibleColumns.includes(colId)
      ? visibleColumns.filter((id) => id !== colId)
      : [...visibleColumns, colId];

    dispatch({ type: ACTIONS.SET_VISIBLE_COLUMNS, payload: { columnIds: updated } });
  };

  const reset = () => {
    dispatch({ type: ACTIONS.CLEAR_VISIBLE_COLUMNS });
  };

  return (
    <div className="col-selector">
      <strong>Show/Hide Columns:</strong>
      <div className="col-selector-inside">
        {columns.map((col) => (
          <CheckboxItem
            key={col.id}
            id={col.id}
            title={col.title}
            checked={visibleColumns.includes(col.id)}
            onToggle={handleToggle}
          />
        ))}
        <button className="selector-button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
