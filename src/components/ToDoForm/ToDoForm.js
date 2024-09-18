import { useDispatch, useSelector } from "react-redux";
import styles from "./ToDoForm.module.css";
import { createTodo } from "../../api";
import { useForm } from "react-hook-form";
import { setTodos } from "../../redux/reducers/todoReducer";

function ToDoForm() {
  const dispatch = useDispatch();
  const {handleSubmit, register, reset} = useForm();

  const onSubmit = async (data) => {
    data.completed = false;
    try {
      const result = await createTodo(data);
      if (result) {
        dispatch(setTodos(result)); 
        console.log("Todo created and dispatched", result);
      }
    } catch (error) {
      console.log("Error creating todo:", error);
    } finally {
      reset({
        text: ''
      });
    }
  };


  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="form-control mb-3"
          {...register("text", {required: true})}
        />
        <button className="btn btn-success float-end" type="submit">
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default ToDoForm;
