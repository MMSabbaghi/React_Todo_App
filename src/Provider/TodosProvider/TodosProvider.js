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

    case "updateTodoTitle": {
      let newState = [...state];
      let todoIndex = newState.findIndex((t) => t.id === action.todo.id);
      let selectedTodo = { ...newState[todoIndex] };
      selectedTodo.title = action.todo.title;
      newState[todoIndex] = selectedTodo;
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

const initialTodos = [{ completed: false, id: 1, title: "test" }];

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

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
