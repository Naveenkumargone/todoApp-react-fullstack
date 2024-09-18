import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id
          ? { ...todo, completed: action.payload.completed }
          : todo
      );
      console.log(state.todos)
    },
  },
});

export const { setTodos, getTodos, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
