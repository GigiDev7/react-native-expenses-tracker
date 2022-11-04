import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload.reverse();

    case "ADD":
      return [action.payload, ...state];

    case "DELETE":
      return state.filter((el) => el.id !== action.payload);

    case "UPDATE":
      const expense = state.find((el) => el.id === action.payload.id);
      Object.assign(expense, action.payload.expenseData);
      return [...state];
    default:
      return state;
  }
};

export const ExpensesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const value = {
    expenses: state,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
