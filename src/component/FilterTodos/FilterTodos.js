import styles from "./FilterTodos.module.css";
import Select from "react-select";

const FilterTodos = ({ onChange, value }) => {
  const filterOptions = [
    { value: "All", label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "UnCompleted", label: "UnCompleted" },
  ];

  return (
    <div className={styles.select_status}>
      <span> filter based on : </span>
      <Select
        value={value}
        options={filterOptions}
        onChange={onChange}
        className={styles.select_box}
      />
    </div>
  );
};

export default FilterTodos;
