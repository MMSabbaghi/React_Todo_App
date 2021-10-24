import moonImg from "../../assets/images/icon-moon.svg";
import sunImg from "../../assets/images/icon-sun.svg";
import styles from "./Header.module.css";

const Header = ({ darkMode, onModeChange }) => {
  return (
    <div className={styles.header}>
      <h1> TODO </h1>
      <img
        src={darkMode ? moonImg : sunImg}
        alt="read mode"
        onClick={onModeChange}
      />
    </div>
  );
};

export default Header;
