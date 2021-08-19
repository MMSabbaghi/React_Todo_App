import { useCallback, useEffect, useState } from "react";
import TodoItem from "../TodoItem/TodoItem";
import FilterTodos from "../FilterTodos/FilterTodos";
import {
  useTodos,
  useTodosActions,
} from "../../Provider/TodosProvider/TodosProvider";
import styles from "./TodoList.module.css";
import {
  useCurrentTodo,
  useSetCurrentTodo,
} from "../../Provider/TodosProvider/CurrentTodoProvider";

import notification from "../../utils/NotificationManager";

//----------------------------------

const TodoList = () => {
  const todos = useTodos();
  const dispatch = useTodosActions();
  const currentTodo = useCurrentTodo();
  const setCurrentTodo = useSetCurrentTodo();
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [status, setStatus] = useState("All");

  const removeHandler = (id) => {
    dispatch({ type: "removeTodo", id: id });
    if (currentTodo?.id === id) {
      setCurrentTodo(null);
    }
    notification("info", "Successfully removed!");
  };

  const completeHandler = (id) => {
    dispatch({ type: "changeCompleteStatus", id: id });
    notification("info", "Successfully mark as completed!");
  };
  const filterTodos = useCallback(() => {
    switch (status) {
      case "Completed":
        setFilteredTodos(todos.filter((t) => t.completed));
        break;
      case "UnCompleted":
        setFilteredTodos(todos.filter((t) => !t.completed));
        break;
      case "All":
        setFilteredTodos(todos);
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [status, todos]);

  useEffect(() => {
    filterTodos();
  }, [status, todos, filterTodos]);

  if (filteredTodos.length === 0)
    return (
      <>
        <FilterTodos
          onChange={(selectedValue) => setStatus(selectedValue.value)}
          value={status}
        />
        <h4 className={styles.not_found}> No Todos were found! </h4>
      </>
    );

  return (
    <>
      <FilterTodos
        onChange={(selectedValue) => setStatus(selectedValue.value)}
        value={status}
      />

      <div className={styles.todo_list}>
        {filteredTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            todoIndex={index + 1}
            onDelete={() => removeHandler(todo.id)}
            onEdit={() => setCurrentTodo(todo)}
            onComplete={() => completeHandler(todo.id)}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
