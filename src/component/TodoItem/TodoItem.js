import styles from "./TodoItem.module.css";
import { BiTrashAlt, BiEditAlt } from "react-icons/bi";
import checkImg from "../../assets/images/icon-check.svg";

const TodoItem = ({ todo, onDelete, onEdit, onComplete }) => {
  return (
    <div className={styles.todo_item}>
      <button
        className={`${styles.todo_status} ${
          todo.completed && styles.completed_todo
        }`}
        onClick={onComplete}
      >
        <img
          src={checkImg}
          alt="checked"
          style={{ opacity: todo.completed ? "1" : "0" }}
        />
      </button>
      <p className={todo.completed ? styles.completed_title : ""}>
        {todo.title}
      </p>
      <div className={styles.btns}>
        <button className={styles.deleteBtn} onClick={onDelete}>
          <BiTrashAlt />
        </button>
        <button className={styles.editBtn} onClick={onEdit}>
          <BiEditAlt />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
