import { useLayoutEffect } from "react";
import { Text, View } from "react-native";

const ManageExpanses = ({ navigation, route }) => {
  const editingExpanseId = route.params?.expenseId;

  useLayoutEffect(() => {
    if (editingExpanseId) {
      navigation.setOptions({ title: "Edit Expense" });
    } else {
      navigation.setOptions({ title: "Add Expense" });
    }
  }, []);

  return (
    <View>
      <Text>manage</Text>
    </View>
  );
};

export default ManageExpanses;
