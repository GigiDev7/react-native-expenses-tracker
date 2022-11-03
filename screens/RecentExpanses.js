import { useContext } from "react";
import { View, Text } from "react-native";
import ExpansesOutput from "../components/ExpansesOutput";
import { ExpensesContext } from "../store/expanses-context";
import { getDateMinusDays } from "../utils/date";

const RecentExpanses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const expenses = expensesCtx.expenses.filter((el) => {
    const today = new Date();
    const res = getDateMinusDays(today, 7);

    return el.date > res;
  });

  return <ExpansesOutput expenses={expenses} period="Last 7 Days" />;
};

export default RecentExpanses;
