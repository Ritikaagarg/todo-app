import React from 'react';
import { View } from 'react-native';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const AuthScreen = () => {

  const onSignIn = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      console.log("token", idToken)
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("credential", googleCredential);
      console.log("sign in", auth().signInWithCredential(googleCredential))
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log("error", error);
    }
  }

  React.useEffect(()=> {
    GoogleSignin.configure({
      webClientId: "13142218364-mh8436k2e8raib8p636bklq1l7paemrg.apps.googleusercontent.com",
      offlineAccess: true,
    });
  },[])
  return(
    <View>
      <Button onPress={onSignIn} >Login with Google</Button>
    </View>
  )
}

export default AuthScreen;