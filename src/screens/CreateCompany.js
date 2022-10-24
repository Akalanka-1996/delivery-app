import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, {useState, useLayoutEffect, useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import { AntDesign } from '@expo/vector-icons'; 
import Header from '../components/Header'


const CreateCompany = () => {
  const {userInfo, isLoading, logout } = useContext(AuthContext)

  return (
    <View>
     <Header text="Create Company" />
        
    </View>
  )
}

export default CreateCompany

const styles = StyleSheet.create({
  logout: {
    alignSelf: 'flex-end'
  }
})