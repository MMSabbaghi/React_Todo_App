import { useState } from "react";
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
import types from "../../Provider/types/types";

//----------------------------------

const TodoList = () => {
  const todos = useTodos();
  const dispatch = useTodosActions();
  const currentTodo = useCurrentTodo();
  const setCurrentTodo = useSetCurrentTodo();
  const [filteredTodos, setFilteredTodos] = useState([]);

  const removeHandler = (id) => {
    dispatch({ type: types.DELETE_TASK, id: id });
    if (currentTodo?.id === id) {
      setCurrentTodo(null);
    }
    notification("info", "Successfully removed!");
  };

  const completeHandler = (id, isCompleted) => {
    dispatch({ type: types.UPDATE_TASK_STATUS, id: id });
    notification("info", `Successfully marked as ${isCompleted ? 'uncomplete' : 'completed'}!`);
  };

  if (filteredTodos.length === 0)
    return (
      <>
        <FilterTodos todos={todos} setFilteredTodos={setFilteredTodos} />
        <h4 className={styles.not_found}> No Todos were found! </h4>
      </>
    );

  return (
    <>
      <FilterTodos todos={todos} setFilteredTodos={setFilteredTodos} />
      <div className={styles.todo_list}>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => removeHandler(todo.id)}
            onEdit={() => setCurrentTodo(todo)}
            onComplete={() => completeHandler(todo.id, todo.completed)}
          />
        ))}
      </div>
    </>
  );
};

export default TodoList;
