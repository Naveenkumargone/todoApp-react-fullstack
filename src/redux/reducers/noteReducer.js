import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam",
      createdOn: new Date().toDateString(),
    },
    {
      id: 2,
      text: "Aliquam erat volutpat. Ut tincidunt, velit vel aliquam commodo, tellus urna auctor tortor, non ultrices libero ante sed magna.",
      createdOn: new Date().toDateString(),
    },
  ],
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push({ id: state.notes.length + 1 , ...action.payload,});
    },
    deleteNote: (state, action) => {
      state.notes.splice(action.payload, 1);
    },
    editNote: (state, action) => {
      state.notes.filter((note) => {
        if (note.id === action.payload.id) {
          note.text = action.payload.text;
        }
        return note;
      });
    },
  },
});

export const { addNote, deleteNote, editNote } = noteSlice.actions;
export default noteSlice.reducer;