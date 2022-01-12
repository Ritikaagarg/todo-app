import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Styles {
  addContainer: ViewStyle,
  addTaskField: TextStyle,
  button: ViewStyle
}

const styles = StyleSheet.create<Styles>({
  addContainer: {
    flexDirection: 'row',
  },
  addTaskField: {
    marginLeft: 15,
    marginVertical: 15,
    flex: 1,
  },
  button: {
    justifyContent: 'center',
  },
});

export default styles;