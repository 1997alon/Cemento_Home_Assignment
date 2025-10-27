import React, { useState, useEffect } from "react";
import { renderByType } from "../utils/renderHandlers";
import { ACTIONS } from "../reducers/tableReducer";

// React will skip re-rendering this cell unless its props change
const TableCell = React.memo(function TableCell({ rowId, colData, value, dispatch, width }) {
  const [editing, setEditing] = useState(false); // whether this cell is in edit mode
  const [tempValue, setTempValue] = useState(value); // temporary copy of the value while editing
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const save = () => {
     if (tempValue === "" || tempValue == null) {
      setTempValue(value); // reset to previous value
      setEditing(false);
      return; 
    } 
    dispatch({
      type: ACTIONS.UPDATE_CELL,
      payload: { rowId, colId: colData.id, value: tempValue },
    });
    setEditing(false);
  };

  const cancel = () => {
    setTempValue(value);
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") save();
    if (e.key === "Escape") cancel();
  };

  const handleChange = (newValue) => {
    setTempValue(newValue);
  };

  return (
    <div
      className="table-cell"
      style={{ width: `${width}px`, flex: '0 0 auto' }} 
      onClick={() => !editing && setEditing(true)} // if the use click on the cell
    >
      {editing ? (
        renderByType(colData.type, tempValue, handleChange, colData.options, {
          onBlur: cancel, // cancel editing when focus is lost
          onKeyDown: handleKeyDown, // for keyboard shortcuts
          autoFocus: true, // focus the input automatically
        })
      ) : (
        <span>{colData.type === "boolean" ? (value ? "✔️" : "❌") : value?.toString()}</span>
      )}
    </div>
  );
});

export default TableCell;
