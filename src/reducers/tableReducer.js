export const ACTIONS = {
  INIT: "INIT",
  UPDATE_CELL: "UPDATE_CELL",
  SET_VISIBLE_COLUMNS: "SET_VISIBLE_COLUMNS",
  CLEAR_VISIBLE_COLUMNS: "CLEAR_VISIBLE_COLUMNS",
};

export function tableReducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT: {
      const columns = action.payload?.columns || [];
      const data = action.payload?.data || [];

      const dataMap = Object.fromEntries(data.map(row => [row.id, row]));
      const rowIds = data.map(row => row.id);
      return {
        columns: columns || [], // all the columns
        dataMap: dataMap, // data of rows in a map, numOfRow: dataOfRow
        rowIds: rowIds, // for display in the right order "1, "2"...
        visibleColumns: columns?.map(c => c.id) || [], // visible columns
      };
    }

    case ACTIONS.UPDATE_CELL: {
      const { rowId, colId, value } = action.payload;
      const row = state.dataMap[rowId];
      if (!row || !colId) return state;      
      if (row[colId] === value) return state; 
      
      return {
        ...state,
        dataMap: {
          ...state.dataMap,
          [rowId]: {
            ...state.dataMap[rowId], 
            [colId]: value
          }
        }
      };
    }

    case ACTIONS.SET_VISIBLE_COLUMNS: {
      const { columnIds } = action.payload;
      return {
        ...state,
        visibleColumns: columnIds,
      };
    }

    case ACTIONS.CLEAR_VISIBLE_COLUMNS: {
      return {
        ...state,
        visibleColumns: state.columns.map((c) => c.id),
      };
    }

    default:
      return state;
  }
}
