import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext'
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import { BASE_URL } from '../config';

function HomeScreen() {
  const {userInfo, isLoading, logout } = useContext(AuthContext)
  const [company, setCompany] = useState([]);

  const token = userInfo.token
  const area = userInfo.area
  

  useEffect(() => {
    getCompany()
  }, [])

  const getCompany = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const {data} = await axios.get(`${BASE_URL}/company/company-area/${area}`, config)
    console.log('data', data);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={logout}>
      <AntDesign style={styles.logout} name="logout" size={24} color="black" />

      </TouchableOpacity>

      <Text>Home Screen</Text>
      <Text>{userInfo.name}</Text>
      <Text>{userInfo.area}</Text>

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