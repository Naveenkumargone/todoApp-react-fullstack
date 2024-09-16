import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../../redux/reducers/todoReducer";
import styles from "./ToDoList.module.css";
import { useEffect, useState } from "react";
import { store } from "../../redux/store";

function ToDoList() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const todos = useSelector((state) => state?.todo?.todos || []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:4100/api/todos");
      const parsedJson = await response.json();

      dispatch(setTodos(parsedJson));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const toggle = (index) => {
    const newtodos = todos.map((todo, i) => 
      i === index ? {...todo, completed: !todo.completed} : todo
    )
    dispatch(setTodos(newtodos));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading todos...</p>
      ) : todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li className={styles.item} key={index}>
              <span className={styles.content}>{todo.text}</span>
              <span
                className={todo.completed ? styles.completed : styles.pending}
              >
                {todo.completed ? "Completed" : "Pending"}
              </span>
              <button
                className="btn btn-warning"
                onClick={() => {
                  toggle(index);
                }}
              >
                Toggle
              </button>
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
