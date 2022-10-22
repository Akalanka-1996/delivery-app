import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native'

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen'
import SupplierRegistration from './src/screens/SupplierRegistration'
import Navigation from './src/components/Navigation';

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2C6BED"},
  headerTitleStyle: {color:"white"},
  headerTintColor: "white",
}

export default function App() {
  return (
    <Navigation />
    )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    textAlign:'center'
  }
});
