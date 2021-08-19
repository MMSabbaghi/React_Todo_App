import { useEffect, useRef, useState } from "react";
import { useTodosActions } from "../../Provider/TodosProvider/TodosProvider";
import {
  useCurrentTodo,
  useSetCurrentTodo,
} from "../../Provider/TodosProvider/CurrentTodoProvider";
import styles from "./TodoForm.module.css";

import notification from "../../utils/NotificationManager";

const TodoForm = () => {
  const dispatch = useTodosActions();
  const currentTodo = useCurrentTodo();
  const setCurrentTodo = useSetCurrentTodo();
  const [input, setInput] = useState("");
  const inputRef = useRef();

  //if the current todo changes input value is set.
  useEffect(() => {
    setInput(currentTodo ? currentTodo.title : "");
    inputRef.current.focus();
  }, [currentTodo]);

  const updateTodo = () => {
    dispatch({
      type: "updateTodo",
      todo: {
        title: input,
        id: currentTodo.id,
        completed: currentTodo.completed,
      },
    });
    setCurrentTodo(null);
  };

  const saveHandler = () => {
    if (input.length > 2) {
      //add or edit todo based on current todo
      if (!currentTodo) {
        dispatch({ type: "addNewTodo", todo: { title: input } });
        notification("success", "Successfully aded !");
      } else {
        updateTodo();
        notification("success", "Successfully edited !");
      }
      setInput("");
    } else {
      notification("error", "please enter a valisd todo!");
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === "Enter") {
      saveHandler();
    }
  };

  return (
    <div className={styles.todo_form}>
      <input
        type="text"
        placeholder="Write an activity..."
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={keyPressHandler}
      />
      <button type="button" onClick={saveHandler}>
        {currentTodo ? "Edit" : "Add"}
      </button>
    </div>
  );
};

export default TodoForm;
