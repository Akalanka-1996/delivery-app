import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from 'react-native'
import axios from "axios";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { Button, Input } from "react-native-elements";


const AddRoute = ({route, navigation}) => {
    
    const [title, setTitle] = useState("");
    const [startPoint, setStartPoint] = useState("")
    const [startTime, setStartTime] = useState()
    const [id, setId] = useState()

    const { userInfo, isLoading, logout } = useContext(AuthContext);

    const token = userInfo.token;

    const createRoute = async () => {
        try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };

            if (title === '' || startPoint === '' || startTime==='') {
              alert('Please fill all the fields!')
          }

          let startNumber = Number(startTime)

          console.log(typeof(startNumber))

          if (startNumber > 24) {
            alert("Invalid start time!")
          } else {
            const { data } = await axios.post(
              `${BASE_URL}/routes/create`,
              { title, startPoint, startTime, company: id },
              config
            );
            console.log("data", data);
            alert("Route created")
          }

      
          
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        setId(route.params.paramKey)
        console.log('id', id);
    }, [id])

    const modifyRoute = () => {
        navigation.navigate('ModifyRoute' , {
            paramKey: id,
          })
    }


  return (
    <View>
      {/* <Text>AddRoute</Text> */}
      <Header text="Add a route to your company" />
      <Input
          type="text"
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Input
          type="text"
          placeholder="Start Point"
          value={startPoint}
          onChangeText={(text) => setStartPoint(text)}
        />
        <Input
          type="number"
          placeholder="Start Time (1-24 HR)"
          value={startTime}
          onChangeText={(text) => setStartTime(text)}
        />
        <Button
        containerStyle={styles.button}
        raised
        title="Add Route"
        onPress={createRoute}
      />
       <Button
        containerStyle={styles.button}
        raised
        type="outline"
        title="Modify Route"
        onPress={modifyRoute}
      />


    </View>
  )
}

export default AddRoute

const styles = StyleSheet.create({
    button: {
        width: 200,
        alignSelf: "center",
        marginBottom: 15,
      },
})