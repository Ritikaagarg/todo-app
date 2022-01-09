import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import RootNavigator from './navigation/rootNavigator';

const Root = () => {
  const { colors } = useTheme();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [authState, setAuthState] = useState<'LoggedIn' | 'LogOut'>('LogOut');;

  // Handle user state changes
  const onAuthStateChanged = (user: any) => {
    if (user !== null) {
      setAuthState('LoggedIn')
    }
    else {
      setAuthState('LogOut');
    }
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.WEB_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.primary} />
      {initializing ? <ActivityIndicator /> : <RootNavigator authState={authState} />}
    </View>
  )
}

export default Root;

