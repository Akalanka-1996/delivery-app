import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native'

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen'
import SupplierRegistration from '../screens/SupplierRegistration'

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2C6BED"},
  headerTitleStyle: {color:"white"},
  headerTintColor: "white",
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={globalScreenOptions}>
      <Stack.Screen name='Login' component={LoginScreen} styles={styles.header} />
      <Stack.Screen name='Register' component={RegisterScreen} />
      <Stack.Screen name='Supplier' component={SupplierRegistration} />
      {/* <Stack.Screen name='Home' component={HomeScreen} /> */}
         
      </Stack.Navigator>
    
    </NavigationContainer>
    )

}

export default Navigation
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
