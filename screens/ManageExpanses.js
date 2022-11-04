import { useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import { useContext } from "react";
import { ExpensesContext } from "../store/expanses-context";
import ExpenseForm from "../components/ExpenseForm";
import { storeExpense, updateExpense } from "../utils/http";
import Loading from "../components/Loading";
import Error from "../components/Error";

const ManageExpanses = ({ navigation, route }) => {
  const editingExpanseId = route.params?.expenseId;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState();

  const expensesCtx = useContext(ExpensesContext);

  const deleteExpense = async () => {
    setIsLoading(true);
    try {
      await deleteExpense(editingExpanseId);
      expensesCtx.deleteExpense(editingExpanseId);
      navigation.goBack();
    } catch (error) {
      setIsError("Could not delete expense,try again later!");
      setIsLoading(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    try {
      if (editingExpanseId) {
        expensesCtx.updateExpense(editingExpanseId, expenseData);
        await updateExpense(editingExpanseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }
      navigation.goBack();
    } catch (error) {
      setIsError("Could not save data,please try again later!");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError && !isLoading) {
    return <Error message={isError} onPress={() => setIsError(null)} />;
  }

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
