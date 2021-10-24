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
import { TransitionGroup, CSSTransition } from "react-transition-group";
import notification from "../../utils/NotificationManager";

//----------------------------------

const TodoList = () => {
  const todos = useTodos();
  const dispatch = useTodosActions();
  const currentTodo = useCurrentTodo();
  const setCurrentTodo = useSetCurrentTodo();
  const [filteredTodos, setFilteredTodos] = useState([]);

  const removeHandler = (id) => {
    dispatch({ type: "removeTodo", id: id });
    if (currentTodo?.id === id) {
      setCurrentTodo(null);
    }
    notification("info", "Successfully removed!");
  };

  const completeHandler = (id) => {
    dispatch({ type: "changeCompleteStatus", id: id });
    notification("info", "Successfully marked as completed!");
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
      <TransitionGroup className={styles.todo_list}>
        {filteredTodos.map((todo) => (
          <CSSTransition key={todo.id} timeout={500} classNames="fade">
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={() => removeHandler(todo.id)}
              onEdit={() => setCurrentTodo(todo)}
              onComplete={() => completeHandler(todo.id)}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

export default TodoList;
