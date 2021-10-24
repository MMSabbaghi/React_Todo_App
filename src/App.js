import { useState } from "react";
import Header from "./component/Header/Header";
import TodoApp from "./component/TodoApp/TodoApp";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleMode = () => setDarkMode(!darkMode);
  return (
    <div className="app" data-theme={darkMode ? "dark" : "light"}>
      <div className="container">
        <Header darkMode={darkMode} onModeChange={toggleMode} />
        <TodoApp />
      </div>
    </div>
  );
};

export default App;
