import { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import ExpansesOutput from "../components/ExpansesOutput";
import { ExpensesContext } from "../store/expanses-context";
import { getDateMinusDays } from "../utils/date";
import { getExpenses } from "../utils/http";
import Loading from "../components/Loading";
import Error from "../components/Error";

const RecentExpanses = () => {
  const expensesCtx = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  const recentExpenses = expensesCtx.expenses.filter((el) => {
    const today = new Date();
    const res = getDateMinusDays(today, 7);

    return el.date >= res;
  });

  useEffect(() => {
    async function fetchExpenses() {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setIsError("Error getting expenses");
      }

      setIsLoading(false);
    }

    fetchExpenses();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError && !isLoading) {
    return <Error message={isError} onPress={() => setIsError(null)} />;
  }

  return (
    <ExpansesOutput
      fallbackText="No expenses for the last 7 days."
      expenses={recentExpenses}
      period="Last 7 Days"
    />
  );
};

export default RecentExpanses;
