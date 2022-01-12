import * as React from 'react';
import { Appearance } from 'react-native';
import { DefaultTheme, Provider as PaperProvider, DarkTheme } from 'react-native-paper';
import Root from './src';

// Change theme 
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'tomato',
    text: 'tomato'
  }
}

const colorScheme = Appearance.getColorScheme();
const theme = colorScheme === 'dark' ? customDarkTheme : customTheme;

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Root />
    </PaperProvider>
  );
}

