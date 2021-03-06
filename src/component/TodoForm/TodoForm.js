import { useEffect, useRef, useState } from "react";
import { useTodosActions } from "../../Provider/TodosProvider/TodosProvider";
import {
  useCurrentTodo,
  useSetCurrentTodo,
} from "../../Provider/TodosProvider/CurrentTodoProvider";
import styles from "./TodoForm.module.css";

import notification from "../../utils/NotificationManager";
import types from "../../Provider/types/types";

const TodoForm = () => {
  const dispatch = useTodosActions();
  const currentTodo = useCurrentTodo();
  const setCurrentTodo = useSetCurrentTodo();
  const [input, setInput] = useState("");
  const inputRef = useRef();

  //if the current todo changes , input value is set.
  useEffect(() => {
    setInput(currentTodo ? currentTodo.title : "");
    inputRef.current.focus();
  }, [currentTodo]);

  const updateTodo = () => {
    dispatch({
      type: types.EDIT_TASK,
      todo: {
        title: input,
        id: currentTodo.id,
      },
    });
    setCurrentTodo(null);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    if (input.length > 2) {
      //add or edit todo based on current todo
      if (!currentTodo) {
        dispatch({ type: types.ADD_TASK, todo: { title: input } });
        notification("success", "Successfully aded !");
      } else {
        updateTodo();
        notification("success", "Successfully edited !");
      }
      setInput("");
    } else {
      notification("error", "please enter a valid todo!");
    }
  };

  return (
    <form onSubmit={saveHandler} className={styles.todo_form}>
      <input
        type="text"
        placeholder="Write an activity..."
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">{currentTodo ? "Edit" : "Add"}</button>
    </form>
  );
};

export default TodoForm;
