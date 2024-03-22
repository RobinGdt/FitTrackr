import { StyleProp, StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const BaseButton = ({ title, onPress }: ButtonProps): JSX.Element => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8ec7f3",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 15,
    minWidth: 100,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
});

export default BaseButton;
