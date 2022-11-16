import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import Navigation from './src/components/Navigation';
import { AuthProvider } from './src/context/AuthContext';
import registerNNPushToken from 'native-notify';


export default function App() {
  registerNNPushToken(4837, 'iWKmkqlwMEPOULXMm88bsG');
  return (
    <AuthProvider>
      <Navigation />

    </AuthProvider>
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
