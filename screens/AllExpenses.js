import { useContext } from "react";
import { Text, View } from "react-native";
import ExpansesOutput from "../components/ExpansesOutput";
import { ExpensesContext } from "../store/expanses-context";

const AllExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpansesOutput
      fallbackText="No expenses!"
      expenses={expensesCtx.expenses}
      period="Total"
    />
  );
};

export default AllExpenses;
