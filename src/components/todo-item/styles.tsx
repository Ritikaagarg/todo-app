import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Styles {
  remarkContainer: ViewStyle,
  remark: TextStyle,
  cutRemark: TextStyle,
  addContainer: ViewStyle,
  timestamp: TextStyle
}

const styles = StyleSheet.create<Styles>({
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
  }
});

export default styles;