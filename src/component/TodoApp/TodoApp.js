import styles from "./TodoApp.module.css";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";

import TodosProvider from "../../Provider/TodosProvider/TodosProvider";
import CurrentTodoProvider from "../../Provider/TodosProvider/CurrentTodoProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoApp = () => {
  return (
    <div className={styles.container}>
      <TodosProvider>
        <CurrentTodoProvider>
          <TodoForm />
          <TodoList />
          <ToastContainer />
        </CurrentTodoProvider>
      </TodosProvider>
    </div>
  );
};

export default TodoApp;
