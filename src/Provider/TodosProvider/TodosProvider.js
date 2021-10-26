import React, { useContext, useReducer } from 'react';

import getRandomID from '../../utils/getRandomID';
import types from '../types/types';

const TodosContext = React.createContext();
const TodosContextDispatcher = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_TASK: {
      action.todo.id = getRandomID();
      action.todo.completed = false;
      return [...state, action.todo];
    }
    case types.DELETE_TASK: {
      return state.filter(t => t.id !== action.id);
    }

    case types.EDIT_TASK: {
      let newState = [...state];
      let todoIndex = newState.findIndex(t => t.id === action.todo.id);
      let selectedTodo = { ...newState[todoIndex] };
      selectedTodo.title = action.todo.title;
      newState[todoIndex] = selectedTodo;
      return newState;
    }

    case types.UPDATE_TASK_STATUS: {
      let newState = [...state];
      let todoIndex = newState.findIndex(t => t.id === action.id);
      let selectedTodo = { ...newState[todoIndex] };
      selectedTodo.completed = !selectedTodo.completed;
      newState[todoIndex] = selectedTodo;
      return newState;
    }

    default:
      return state;
  }
};

const initialTodos = [{ completed: false, id: 1, title: 'test' }];

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
