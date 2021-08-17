import { useEffect, useRef } from "react";
import { useTodosActions } from "../../Provider/TodosProvider/TodosProvider";
import {
  useCurrentTodo,
  useSetCurrentTodo,
} from "../../Provider/TodosProvider/CurrentTodoProvider";
import styles from "./TodoForm.module.css";

const TodoForm = () => {
  const dispatch = useTodosActions();
  const inputRef = useRef();

  const currentTodo = useCurrentTodo();
  const setCurrentTodo = useSetCurrentTodo();

  useEffect(() => {
    inputRef.current.value = currentTodo ? currentTodo.title : "";
    inputRef.current.focus();
  });

  const saveHandler = () => {
    let inputValue = inputRef.current.value;
    if (inputValue.length > 2) {
      if (!currentTodo) {
        dispatch({ type: "addNewTodo", todo: { title: inputValue } });
      } else {
        dispatch({
          type: "updateTodo",
          todo: {
            title: inputValue,
            id: currentTodo.id,
            completed: currentTodo.completed,
          },
        });
        setCurrentTodo(null);
      }
      inputRef.current.value = "";
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
        onKeyPress={keyPressHandler}
      />
      <button type="button" onClick={saveHandler}>
        {currentTodo ? "Edit" : "Add"}
      </button>
    </div>
  );
};

export default TodoForm;
