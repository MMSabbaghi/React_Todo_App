import styles from "./FilterTodos.module.css";
import { useCallback, useEffect, useState } from "react";

const FilterTodos = ({ todos, setFilteredTodos }) => {
  const [status, setStatus] = useState({ value: "All", label: "All" });

  const filterOptions = [
    { value: "All", label: "All" },
    { value: "UnCompleted", label: "Active" },
    { value: "Completed", label: "Completed" },
  ];

  const filterTodos = useCallback(() => {
    switch (status.value) {
      case "Completed":
        setFilteredTodos(todos.filter((t) => t.completed));
        break;
      case "UnCompleted":
        setFilteredTodos(todos.filter((t) => !t.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  }, [status, todos, setFilteredTodos]);

  useEffect(() => {
    filterTodos();
  }, [status, todos, filterTodos]);

  return (
    <div className={styles.select_status}>
      {filterOptions.map((option, index) => (
        <span
          key={index}
          style={{
            color:
              status.value === option.value ? "var(--blue_color)" : "inherit",
          }}
          onClick={() => setStatus(option)}
        >
          {option.label}
        </span>
      ))}
    </div>
  );
};

export default FilterTodos;
