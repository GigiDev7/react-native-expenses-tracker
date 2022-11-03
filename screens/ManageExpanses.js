import { useLayoutEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { ExpensesContext } from "../store/expanses-context";
import ExpenseForm from "../components/ExpenseForm";

const ManageExpanses = ({ navigation, route }) => {
  const editingExpanseId = route.params?.expenseId;

  const expensesCtx = useContext(ExpensesContext);

  const deleteExpense = () => {
    expensesCtx.deleteExpense(editingExpanseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    if (editingExpanseId) {
      expensesCtx.updateExpense(editingExpanseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  useLayoutEffect(() => {
    if (editingExpanseId) {
      navigation.setOptions({ title: "Edit Expense" });
    } else {
      navigation.setOptions({ title: "Add Expense" });
    }
  }, []);

  return (
    <View style={styles.container}>
      <ExpenseForm
        onConfirm={confirmHandler}
        onCancel={cancelHandler}
        editingExpanseId={editingExpanseId}
      />
      {editingExpanseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpense}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export default ManageExpanses;
