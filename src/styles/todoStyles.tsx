import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Styles {
  separator: ViewStyle,
  emptyList: ViewStyle,
  emptyListText: TextStyle,
  addTaskField: TextStyle,
  list: ViewStyle,
  button: ViewStyle,
  remarkContainer: ViewStyle,
  remark: TextStyle,
  cutRemark: TextStyle,
  addContainer: ViewStyle,
  timestamp: TextStyle,
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
  addTaskField: {
    marginLeft: 15,
    marginVertical: 15,
    flex: 1,
  },
  list: {
    marginTop: 15,
    marginHorizontal: 15,
  },
  button: {
    justifyContent: 'center',
  },
  remarkContainer: {
    flex: 1,
  },
  remark: {
    fontWeight: 'bold',
  },
  cutRemark: {
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  addContainer: {
    flexDirection: 'row',
  },
  timestamp: {
    color: 'gray',
  },
});

export default TodoStyles;