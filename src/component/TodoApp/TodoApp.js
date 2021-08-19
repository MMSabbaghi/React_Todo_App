import styles from "./TodoApp.module.css";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";

import TodosProvider from "../../Provider/TodosProvider/TodosProvider";
import CurrentTodoProvider from "../../Provider/TodosProvider/CurrentTodoProvider";

import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

const TodoApp = () => {
  return (
    <div className={styles.container}>
      <TodosProvider>
        <CurrentTodoProvider>
          <TodoForm />
          <TodoList />
          <NotificationContainer />
        </CurrentTodoProvider>
      </TodosProvider>
    </div>
  );
};

export default TodoApp;
