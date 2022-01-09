import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthStyles as styles } from '../styles';

const AuthScreen = () => {

  const onLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <View style={styles.container}>
      <Button onPress={onLogin} mode='contained' >Login with Google</Button>
    </View>
  )
}

export default AuthScreen;