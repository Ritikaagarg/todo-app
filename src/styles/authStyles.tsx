import { StyleSheet, ViewStyle, TextStyle } from "react-native";

interface Styles {
  container: ViewStyle
}

const AuthStyles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AuthStyles;