import axios from "axios";

const URL =
  "https://react-native-project-355d7-default-rtdb.firebaseio.com/expenses.json";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(URL, expenseData);
  const id = response.data.name;
  return id;
};

export const getExpenses = async () => {
  const response = await axios.get(URL);

  const expenses = [];

  for (const key in response.data) {
    const expense = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expense);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(
    `https://react-native-project-355d7-default-rtdb.firebaseio.com/expenses/${id}.json`,
    expenseData
  );
};

export const deleteExpense = (id) => {
  return axios.delete(
    `https://react-native-project-355d7-default-rtdb.firebaseio.com/expenses/${id}.json`
  );
};
