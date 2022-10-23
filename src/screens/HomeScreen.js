import React, {useState, useLayoutEffect, useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext'
import { AntDesign } from '@expo/vector-icons'; 

function HomeScreen() {
  const {userInfo, isLoading, logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={logout}>
      <AntDesign style={styles.logout} name="logout" size={24} color="black" />

      </TouchableOpacity>

      <Text>Home Screen</Text>
      <Text>{userInfo.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logout: {
    // alignContent: 'flex-end',
    alignItems:'flex-end',
    marginLeft: 20
  }
})


export default HomeScreen;