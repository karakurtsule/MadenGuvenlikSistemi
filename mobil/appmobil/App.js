import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as firebase from "firebase";

import { NavigationContainer , StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from './screens/Welcome';
import Home from './screens/Home';
import ReportTabs from './screens/ReportTabs';
import Physical from './screens/Physical';
import ForgotPassword from './screens/ForgotPassword';

const Stack = createStackNavigator();
const signOutNow = () => {
  firebase.auth().signOut().then( () => {
    navigation.dispatch(StackActions.popToTop());
  
  }).catch((err) => {
 console.log(err);
  })
}
export default function App() {

  var firebaseConfig = {
    apiKey: "AIzaSyAAuBm6tSbI4fhqOFbjA-i9ADEXRRZvokA",
    authDomain: "appmobil-6c630.firebaseapp.com",
    projectId: "appmobil-6c630",
    storageBucket: "appmobil-6c630.appspot.com",
    messagingSenderId: "654625011727",
    appId: "1:654625011727:web:d067aeded2240146034b7a",
    databaseURL: "https://appmobil-6c630-default-rtdb.firebaseio.com/"
  };
  firebase.initializeApp(firebaseConfig);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Anasayfa" component={Home} 
        options={{
          headerRight: () => (
            <MaterialCommunityIcons name="logout" size={24} color="black" onPress={() => signOutNow()} style={{paddingRight:15}} />
          )
      }}/>
        <Stack.Screen name="Raporlar" component={ReportTabs}
        options={{
          headerRight: () => (
            <MaterialCommunityIcons name="logout" size={24} color="black" onPress={() => signOutNow()} style={{paddingRight:15}} />
          )
      }} />
        <Stack.Screen name="Physical" component={Physical}
        options={{
          headerRight: () => (
            <MaterialCommunityIcons name="logout" size={24} color="black" onPress={() => signOutNow()} style={{paddingRight:15}} />
          )
      }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

