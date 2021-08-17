import styles from "./TodoItem.module.css";
import { BiTrashAlt, BiEditAlt } from "react-icons/bi";

const TodoItem = ({ todo, todoIndex, onDelete, onEdit, onComplete }) => {
  return (
    <div className={styles.todo_item}>
      <span className={!todo.completed ? styles.todo_index : ""}>
        {todoIndex}
      </span>
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
        {!todo.completed && <button onClick={onComplete}>compoleted</button>}
      </div>
    </div>
  );
};

export default TodoItem;
