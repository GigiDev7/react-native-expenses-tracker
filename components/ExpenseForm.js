import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Pressable,
  Keyboard,
} from "react-native";
import { ExpensesContext } from "../store/expanses-context";
import Button from "./Button";
import Input from "./Input";
import { getFormattedDate } from "../utils/date";
import { GlobalStyles } from "../constants/styles";

const ExpenseForm = ({ onConfirm, onCancel, editingExpanseId }) => {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    amountValid: true,
    dateValid: true,
    descriptionValid: true,
  });
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
        amountValid: true,
        dateValid: true,
        descriptionValid: true,
      });
    }
  }, []);

  const handleChange = (enteredValue, type) => {
    if (type === "date") {
      if (
        enteredValue.length > form.date.length &&
        (enteredValue.length === 4 || enteredValue.length === 7)
      ) {
        setForm((prev) => {
          return { ...prev, date: `${enteredValue}-` };
        });
      } else {
        setForm((prev) => {
          return { ...prev, date: enteredValue };
        });
      }
    } else {
      setForm((prev) => {
        return { ...prev, [type]: enteredValue };
      });
    }
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +form.amount,
      date: new Date(form.date),
      description: form.description,
    };

    const amountValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionValid = expenseData.description.trim().length > 0;

    if (amountValid && dateValid && descriptionValid) {
      onConfirm(expenseData);
    } else {
      //Alert.alert("Invalid input", "Please enter valid input values");
      setForm((prev) => {
        return { ...prev, amountValid, dateValid, descriptionValid };
      });
    }
  };

  return (
    <Pressable onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
          <Input
            isValid={form.amountValid}
            style={{ flex: 1 }}
            label="Amount"
            inputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: (text) => handleChange(text, "amount"),
              value: form.amount,
            }}
          />
          <Input
            isValid={form.dateValid}
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
          isValid={form.descriptionValid}
          label="Description"
          inputConfig={{
            multiline: true,
            onChangeText: (text) => handleChange(text, "description"),
            value: form.description,
          }}
        />
        {(!form.amountValid || !form.dateValid || !form.descriptionValid) && (
          <Text style={styles.errorText}>Invalid input values!</Text>
        )}
        <View style={styles.buttonContainer}>
          <Button style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </Button>
          <Button style={styles.button} onPress={submitHandler}>
            {editingExpanseId ? "Update" : "Add"}
          </Button>
        </View>
      </View>
    </Pressable>
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
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ExpenseForm;
