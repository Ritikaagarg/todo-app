import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Styles {
  separator: ViewStyle,
  emptyList: ViewStyle,
  emptyListText: TextStyle,
  list: ViewStyle,
  addContainer: ViewStyle;
  headerText: TextStyle
}

const TodoStyles = StyleSheet.create<Styles>({
  separator: {
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 0.4
  },
  emptyList: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyListText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
  list: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  addContainer: {
    flexDirection: 'row',
  },
  headerText: {
    marginHorizontal: 15,
    marginTop: 15,
    fontWeight: 'bold'
  }
});

export default TodoStyles;