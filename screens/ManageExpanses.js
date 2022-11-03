import { useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";

const ManageExpanses = ({ navigation, route }) => {
  const editingExpanseId = route.params?.expenseId;

  const deleteExpense = () => {
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
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
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {editingExpanseId ? "Update" : "Add"}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ManageExpanses;
