import { FlatList, Text } from "react-native";
import ExpanseItem from "./ExpanseItem";

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ExpanseItem expanse={item} />}
    />
  );
};

export default ExpensesList;
