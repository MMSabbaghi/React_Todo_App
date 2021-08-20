import styles from "./FilterTodos.module.css";
import Select from "react-select";
import { useCallback, useEffect, useState } from "react";

const FilterTodos = ({ todos, setFilteredTodos }) => {
  const [status, setStatus] = useState("All");

  const filterOptions = [
    { value: "All", label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "UnCompleted", label: "UnCompleted" },
  ];

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
  }, [status, todos, setFilteredTodos]);

  useEffect(() => {
    filterTodos();
  }, [status, todos, filterTodos]);

  return (
    <div className={styles.select_status}>
      <span> filter based on : </span>
      <Select
        value={status}
        options={filterOptions}
        onChange={(selectedValue) => setStatus(selectedValue.value)}
        className={styles.select_box}
      />
    </div>
  );
};

export default FilterTodos;
