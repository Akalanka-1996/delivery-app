import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Alert, Modal, TouchableHighlight, TextInput } from "react-native";
import axios from "axios";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";
import { Button, Input } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import ReloadIcon from "../../components/ReloadIcon";

const StartJourney = ({ route }) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [vehilceType, setVehilceType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [count, setCount] = useState();
  const [followers, setFollowers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [delay, setDelay] = useState('')


  const isFocused = useIsFocused();

  const token = userInfo.token;

  const startJourney = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.put(
        `${BASE_URL}/routes/start-journey/${route.params.paramKey}`,
        { vehilceType, vehicleNumber, isStarted: true },
        config
      );
      console.log("data", data);
      alert("Journey Started");
      axios.post(`https://app.nativenotify.com/api/indie/group/notification`, {
        subIDs: followers,
        appId: 4597,
        appToken: "pvq8whlzHqDGFuqGdELoWs",
        title: "Door To Delivery",
        message: "Journey Started",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const endJourney = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.put(
        `${BASE_URL}/routes/end-journey/${route.params.paramKey}`,
        { isStarted: false },
        config
      );
      console.log("data", data);
      alert("Journey Finished");
      axios.post(`https://app.nativenotify.com/api/indie/group/notification`, {
        subIDs: followers,
        appId: 4597,
        appToken: "pvq8whlzHqDGFuqGdELoWs",
        title: "Door To Delivery",
        message: "Journey Finished",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowerCount = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get(
        `${BASE_URL}/routes/follower-count/${route.params.paramKey}`,
        config
      );
      console.log("count", data);
      setCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get(
        `${BASE_URL}/routes/get-followers/${route.params.paramKey}`,
        config
      );
      setFollowers(data);
      console.log("followers", followers);
    } catch (error) {
      console.log(error);
    }
  };

  const addDelay = async () => {
    try {
      await axios.post(`https://app.nativenotify.com/api/indie/group/notification`, {
        subIDs: followers,
        appId: 4597,
        appToken: "pvq8whlzHqDGFuqGdELoWs",
        title: "Door To Delivery",
        message: `Delay in ${delay}`,
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("paramKey", route.params.paramKey);
    getFollowerCount();
    getFollowers();
  }, [count]);

  return (
    <>
    <View>
      <Header text="Start Journey" />
      <ReloadIcon reloadFunction={getFollowers} />
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

      <Button
        containerStyle={styles.button}
        raised
        type="outline"
        title="End Journey"
        onPress={endJourney}
      />
       <Button
        containerStyle={styles.button}
        raised
        title="Add Delay"
        onPress={() => {
          setModalVisible(true);
        }}
        // onPress={startJourney}
      />
    </View>
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        //animationInTiming = {13900}
       // transparent={true}
        visible={modalVisible}
       // animationOut = "slide"
        swipeDirection = "down"
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
        type="text"
        placeholder="Delay Time"
        value={delay}
        onChangeText={(text) => setDelay(text)}
        
      />

<Button
        containerStyle={styles.button}
        raised
        type="outline"
        title="Add Delay"
        onPress={addDelay}
      />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

    </View>
    </>
    
  );
};

export default StartJourney;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
