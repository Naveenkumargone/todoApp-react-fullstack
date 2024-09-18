import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNote, editNote } from "../../redux/reducers/noteReducer";
import styles from "./NoteForm.module.css";

function NoteForm({ data }) {
  const [noteText, setNoteText] = useState("");
  const [editText, setEditText] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setNoteText(data[0]?.text);
      setEditText(true);
    } else {
      setNoteText("");
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data) {
      dispatch(editNote({ text: noteText, id: data[0].id }));
    }else{
      dispatch(addNote({text: noteText, createdOn: new Date().toDateString()}));
    }
    setNoteText("");
    setEditText(false);
  };

  const resetForm = () => {
    setNoteText("");
    setEditText(false);
  };

  return (
    <div className={styles.noteContainer}>
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          className="form-control mb-3"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
        {data && (
          <button
            className="btn btn-success float-end mx-1"
            type="reset"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
        <button className="btn btn-success float-end mx-1" type="submit">
          {editText ? "Edit Note" : "Create Note"}
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
