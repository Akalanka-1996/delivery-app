import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState, useLayoutEffect, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import { AntDesign } from '@expo/vector-icons'; 



const CreateCompany = () => {
  const {userInfo, isLoading, logout } = useContext(AuthContext)

  return (
    <View>
      <Text>CreateCompany</Text>
      <TouchableOpacity onPress={logout}>
      <AntDesign style={styles.logout} name="logout" size={24} color="black" />

      </TouchableOpacity>
    </View>
  )
}

export default CreateCompany

const styles = StyleSheet.create({})