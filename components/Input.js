import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";

const Input = ({ label, inputConfig, style, isValid }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, !isValid ? styles.invalidLabel : null]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          inputConfig?.multiline ? styles.inputMulti : null,
          !isValid ? styles.invalidInput : null,
        ]}
        {...inputConfig}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 12,
  },
  label: {
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
    fontSize: 12,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },
  inputMulti: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

export default Input;
