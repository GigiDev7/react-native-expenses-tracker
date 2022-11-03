import { FlatList, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const ExpansesOutput = ({ expenses, period, fallbackText }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} period={period} />
      {expenses.length ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.fallbackText}>{fallbackText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  fallbackText: {
    color: "white",
    fontSize: 16,
    marginTop: 32,
    textAlign: "center",
  },
});

export default ExpansesOutput;
