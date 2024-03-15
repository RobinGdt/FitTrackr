import { TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";

interface InputProps {
  value: string;
  onChangeText: (v?: any) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}

const BaseInput = ({
  value,
  placeholder,
  keyboardType,
  onChangeText,
}: InputProps): JSX.Element => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#ecf0f3",
    padding: 10,
    paddingLeft: 20,
    height: 50,
    fontSize: 14,
    borderRadius: 25,
    shadowColor: "white",
    shadowOffset: {
      width: -6,
      height: -6,
    },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
});

export default BaseInput;
