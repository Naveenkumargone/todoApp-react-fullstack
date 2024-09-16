import { useSelector, useDispatch } from "react-redux";
import styles from "./NoteList.module.css";
import { deleteNote } from "../../redux/reducers/noteReducer";

function NoteList({ setData }) {
  const notes = useSelector((state) => state.note.notes || []);
  const dispatch = useDispatch();

  const deleteNotes = (index) => {
    dispatch(deleteNote(index));
  };

  const editNotes = (index) => {
    const findNote = notes.filter((note, i) => i === index);
    setData(findNote);
  };

  return (
    <div className="container">
      <ul>
        {notes.map((note, index) => (
          <li className={styles.item} key={note.id}>
            {note && <p>{new Date(note.createdOn).toLocaleDateString()}</p>}
            <p className={styles.notecontent}>{note.text}</p>
            <button
              className={"btn btn-primary " + styles.button}
              onClick={() => editNotes(index)}
            >
              Edit
            </button>
            <button
              className={"btn btn-danger " + styles.button}
              onClick={() => deleteNotes(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
