import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ExpensesContext } from "../store/expanses-context";
import Button from "./Button";
import Input from "./Input";
import { getFormattedDate } from "../utils/date";

const ExpenseForm = ({ onConfirm, onCancel, editingExpanseId }) => {
  const [form, setForm] = useState({ amount: "", date: "", description: "" });
  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    if (editingExpanseId) {
      const expense = expenseCtx.expenses.find(
        (el) => el.id === editingExpanseId
      );

      setForm({
        amount: expense.amount.toString(),
        date: getFormattedDate(expense.date),
        description: expense.description,
      });
    }
  }, []);

  const handleChange = (enteredValue, type) => {
    setForm((prev) => {
      return { ...prev, [type]: enteredValue };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +form.amount,
      date: new Date(form.date),
      description: form.description,
    };

    onConfirm(expenseData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          style={{ flex: 1 }}
          label="Amount"
          inputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => handleChange(text, "amount"),
            value: form.amount,
          }}
        />
        <Input
          style={{ flex: 1 }}
          label="Date"
          inputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (text) => handleChange(text, "date"),
            value: form.date,
          }}
        />
      </View>
      <Input
        label="Description"
        inputConfig={{
          multiline: true,
          onChangeText: (text) => handleChange(text, "description"),
          value: form.description,
        }}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {editingExpanseId ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

export default ExpenseForm;
