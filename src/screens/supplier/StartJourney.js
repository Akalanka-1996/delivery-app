import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native'
import axios from "axios";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { Button, Input } from "react-native-elements";


const StartJourney = ({route}) => {

    const { userInfo, isLoading, logout } = useContext(AuthContext);
    const [vehilceType, setVehilceType] = useState('')
    const [vehicleNumber, setVehicleNumber] = useState('')
    const [count, setCount] = useState()

    const token = userInfo.token;

    const startJourney = async() => {
        try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
      
            const { data } = await axios.put(
              `${BASE_URL}/routes/start-journey/${route.params.paramKey}`,
              { vehilceType, vehicleNumber, isStarted: true},
              config
            );
            console.log("data", data);
            alert("Journey Started")
          } catch (error) {
            console.log(error);
          }
    }

    const getFollowerCount = async() => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
  
        const { data } = await axios.get(
          `${BASE_URL}/routes/follower-count/${route.params.paramKey}`,
          config
        );
        console.log("count", data);
        setCount(data)
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(() => {
      console.log('paramKey', route.params.paramKey)
      getFollowerCount()
    }, [])

  return (
    <View>
      <Header text="Start Journey" />
      <Text>Followers Count: {count}</Text>
      {/* <Text>{route.params.paramKey}</Text> */}
      <Input
          type="text"
          placeholder="Vehicle Type"
          value={vehilceType}
          onChangeText={(text) => setVehilceType(text)}
        />
        <Input
          type="text"
          placeholder="Vehicle Number"
          value={vehicleNumber}
          onChangeText={(text) => setVehicleNumber(text)}
        />
         <Button
        containerStyle={styles.button}
        raised
        title="Start Journey"
        onPress={startJourney}
      />

    </View>
  )
}

export default StartJourney

const styles = StyleSheet.create({})