import { createContext, useReducer } from "react";

const initialState = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A shirt",
    amount: 29.99,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Food",
    amount: 5.99,
    date: new Date("2022-12-01"),
  },
  {
    id: "e4",
    description: "Book",
    amount: 7.5,
    date: new Date("2022-11-02"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];

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
  const [state, dispatch] = useReducer(reducer, initialState);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, expenseData } });
  };

  const value = {
    expenses: state,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
