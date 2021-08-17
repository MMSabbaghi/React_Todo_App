import TodoItem from "../TodoItem/TodoItem";
import {
  useTodos,
  useTodosActions,
} from "../../Provider/TodosProvider/TodosProvider";
import styles from "./TodoList.module.css";
import {
  useCurrentTodo,
  useSetCurrentTodo,
} from "../../Provider/TodosProvider/CurrentTodoProvider";
import { useState } from "react";
import Select from "react-select";

const TodoList = () => {
  const todos = useTodos();
  const dispatch = useTodosActions();

  const setCurrentTodo = useSetCurrentTodo();
  const currentTodo = useCurrentTodo();

  const removeHandler = (id) => {
    dispatch({ type: "removeTodo", id: id });
    if (currentTodo?.id === id) {
      setCurrentTodo(null);
    }
  };

  //---------------------------------
  //---------------------------------

  const [status, setStatus] = useState({ value: "All", label: "All" });

  const filterOptions = [
    { value: "All", label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "UnCompleted", label: "UnCompleted" },
  ];

  const getFilteredTodos = (status, todos) => {
    switch (status.value) {
      case "Completed":
        return todos.filter((t) => t.completed);
      case "UnCompleted":
        return todos.filter((t) => !t.completed);
      case "All":
        return todos;
      default:
        return todos;
    }
  };

  const changeHandler = (selectedValue) => {
    setStatus(selectedValue);
  };

  //---------------------------------
  //---------------------------------

  const renderFilterSelect = () => {
    return (
      <div className={styles.select_status}>
        <span> filter based on : </span>
        <Select
          value={status}
          options={filterOptions}
          onChange={changeHandler}
          className={styles.select_box}
        />
      </div>
    );
  };

  if (getFilteredTodos(status, todos).length === 0)
    return (
      <>
        {renderFilterSelect()}
        <h4 className={styles.not_found}> No Todos were found! </h4>
      </>
    );

  return (
    <>
      {renderFilterSelect()}
      <div className={styles.todo_list}>
        {getFilteredTodos(status, todos).map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todoIndex={index + 1}
            onDelete={() => removeHandler(todo.id)}
            onEdit={() => setCurrentTodo(todo)}
            onComplete={() =>
              dispatch({ type: "changeCompleteStatus", id: todo.id })
            }
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
