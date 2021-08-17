import React, { useContext, useReducer } from "react";

const TodosContext = React.createContext();
const TodosContextDispatcher = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "addNewTodo": {
      action.todo.id = Math.floor(Math.random() * 10000);
      action.todo.completed = false;
      return [...state, action.todo];
    }
    case "removeTodo": {
      return state.filter((t) => t.id !== action.id);
    }

    case "updateTodo": {
      let newState = [...state];
      let todoIndex = newState.findIndex((t) => t.id === action.todo.id);
      newState[todoIndex] = action.todo;
      return newState;
    }

    case "changeCompleteStatus": {
      let newState = [...state];
      let todoIndex = newState.findIndex((t) => t.id === action.id);
      let selectedTodo = { ...newState[todoIndex] };
      selectedTodo.completed = !selectedTodo.completed;
      newState[todoIndex] = selectedTodo;
      return newState;
    }

    default:
      return state;
  }
};

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, []);

  return (
    <TodosContext.Provider value={todos}>
      <TodosContextDispatcher.Provider value={dispatch}>
        {children}
      </TodosContextDispatcher.Provider>
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
export const useTodosActions = () => useContext(TodosContextDispatcher);
export default TodosProvider;
