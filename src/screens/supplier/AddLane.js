import {  FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Easing } from 'react-native'
import React, {useContext, useEffect, useState, useRef} from 'react'
import Header from '../../components/Header'
import {AuthContext} from '../../context/AuthContext'
import { BASE_URL } from '../../config';
import { Button, Input } from 'react-native-elements'
import axios from 'axios';

const AddLane = ({route}) => {
    const [lane, setLane] = useState('')
    const [estimatedTime, setEstimatedTime] = useState()
    const [id, setId] = useState('')

    const {userInfo, isLoading, logout } = useContext(AuthContext)


    const token = userInfo.token;

    const addLane = async () => {
        try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
      
            const { data } = await axios.post(
              `${BASE_URL}/lanes/create`,
              { lane, estimatedTime, routeId: id },
              config
            );
            console.log("data", data);
            alert("Lane Added")
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        setId(route.params.paramKey)
    }, [id])
  return (
    <View>
        <Header text="Add Lanes with Estimated Time" />
        <Input
        type="text"
        placeholder="Lane"
        value={lane}
        onChangeText={(text) => setLane(text)}
      />
      <Input
        type="number"
        placeholder="Estimated Arrival Time"
        value={estimatedTime}
        onChangeText={(text) => setEstimatedTime(text)}
      />
      <View style={styles.btnContainer}>
      <Button
        containerStyle={styles.button}
        raised
        title="Add Route"
        onPress={addLane}
      />
      </View>
      
    </View>
  )
}

export default AddLane

const styles = StyleSheet.create({})