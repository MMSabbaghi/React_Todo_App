import { BiMoon, BiSun } from "react-icons/bi";
import styles from "./Header.module.css";

const Header = ({ darkMode, onModeChange }) => {
  return (
    <div className={styles.header}>
      <h1> TODO </h1>
      <button onClick={onModeChange} className={styles.mode_icon}>
        {darkMode ? <BiMoon /> : <BiSun />}
      </button>
    </div>
  );
};

export default Header;
