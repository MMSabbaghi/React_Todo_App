import { createContext, useContext, useState } from "react";

const currentTodoContext = createContext();
const currentTodoContextDispatcher = createContext();

const CurrentTodoProvider = ({ children }) => {
  const [currentTodo, setCurrentTodo] = useState();
  return (
    <currentTodoContext.Provider value={currentTodo}>
      <currentTodoContextDispatcher.Provider value={setCurrentTodo}>
        {children}
      </currentTodoContextDispatcher.Provider>
    </currentTodoContext.Provider>
  );
};

export const useCurrentTodo = () => useContext(currentTodoContext);
export const useSetCurrentTodo = () => useContext(currentTodoContextDispatcher);

export default CurrentTodoProvider;
