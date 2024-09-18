import { useSelector, useDispatch } from "react-redux";
import {
  setTodos,
  getTodos,
  updateTodo,
} from "../../redux/reducers/todoReducer";
import styles from "./ToDoList.module.css";
import { useEffect, useState } from "react";
import { deleteTodos, getAllTodos, toggleTodo } from "../../api";
import { Trash } from "iconsax-react";

function ToDoList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const todos = useSelector((state) => state?.todo?.todos || []);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const result = await getAllTodos();
        dispatch(getTodos(result));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, [dispatch]);

  const toggle = async (id) => {
    try {
      const result = await toggleTodo(id);
      if (result.message === "todo updated successfully") {
        dispatch(updateTodo(result.data));
      } else {
        console.log("Todo not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    console.log(id);
    try {
      const result = await deleteTodos(id);
      if (result.message === "todo deleted successfully") {
        dispatch(setTodos(todos.filter((todo) => todo._id !== id)));
      } else {
        console.log("todo not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading todos...</p>
      ) : todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li className={styles.item} key={todo._id}>
              <span className={styles.content}>{todo.text}</span>
              <span
                className={todo.completed ? styles.completed : styles.pending}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>
              <button
                className="btn btn-warning"
                onClick={() => {
                  toggle(todo._id);
                }}
              >
                Toggle
              </button>
              <Trash
                onClick={() => {
                  deleteTodo(todo._id);
                }}
                size="32"
                color="red"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos available.</p>
      )}
    </div>
  );
}

export default ToDoList;
