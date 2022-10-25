import React, {useState, useEffect, useLayoutEffect, useContext} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext'
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import { BASE_URL } from '../config';
import Header from '../components/Header';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

function HomeScreen() {
  const {userInfo, isLoading, logout } = useContext(AuthContext)
  const [company, setCompany] = useState([]);
  const [category, setCategory] = useState('')
  const token = userInfo.token
  const area = userInfo.area
  
  const addCategory = () => {
    setCategory('ice')
  }

  useEffect(() => {
    getCompany()
  }, [])

  const getCompany = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const {data} = await axios.get(`${BASE_URL}/company/company-area/${area}/${category}`, config)
    console.log('data', data);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      {/* <TouchableOpacity onPress={logout}>
      <AntDesign style={styles.logout} name="logout" size={24} color="black" />

      </TouchableOpacity> */}

      <Header text="Home Screen" />
      <Text>Hi {userInfo.name}</Text>
      <Text>What are you looking for?</Text>
      <TouchableOpacity onPress={addCategory}>
      <MaterialIcons name="icecream" size={24} color="black" />

      </TouchableOpacity>
      <TouchableOpacity>
      <FontAwesome5 name="hamburger" size={24} color="black" />

      </TouchableOpacity>
      <TouchableOpacity>
      <FontAwesome5 name="pepper-hot" size={24} color="black" />

      </TouchableOpacity>
      <TouchableOpacity>
      <MaterialIcons name="local-drink" size={24} color="black" />

      </TouchableOpacity>


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