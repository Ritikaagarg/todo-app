import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthScreen, HomeScreen } from '../screens';

const Stack = createStackNavigator();

const RootNavigator = ({ authState }: any) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {authState === 'LoggedIn' ?
          (
            <Stack.Screen name="Home" component={HomeScreen} />
          )
          : (
            <Stack.Screen name="Auth" component={AuthScreen} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigator;