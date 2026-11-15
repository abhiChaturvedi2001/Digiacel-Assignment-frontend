import { createSlice } from '@reduxjs/toolkit';

// UI state only: which sheet is open and which toast is showing.
// Keep it serializable: the toast holds the deleted task (data), not a callback.
//   sheet: null | { type: 'form', id?, date? } | { type: 'detail', id }
//   toast: null | { id, message, undoTask? }

let timer;

const slice = createSlice({
  name: 'ui',
  initialState: { sheet: null, toast: null },
  reducers: {
    openSheet: (s, a) => {
      s.sheet = a.payload;
    },
    closeSheet: (s) => {
      s.sheet = null;
    },
    setToast: (s, a) => {
      s.toast = a.payload;
    },
    clearToast: (s) => {
      s.toast = null;
    },
  },
});

export const { openSheet, closeSheet, setToast, clearToast } = slice.actions;

/** Show a toast for 4.5 seconds. notify('Task deleted', { undoTask }) */
export const notify = (message, { undoTask } = {}) => (dispatch) => {
  clearTimeout(timer);
  dispatch(setToast({ id: Date.now(), message, undoTask }));
  timer = setTimeout(() => dispatch(clearToast()), 4500);
};

export const dismissToast = () => (dispatch) => {
  clearTimeout(timer);
  dispatch(clearToast());
};

export default slice.reducer;
