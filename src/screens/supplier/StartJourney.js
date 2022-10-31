import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
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

  useEffect(() => {
    console.log("paramKey", route.params.paramKey);
    getFollowerCount();
    getFollowers();
  }, [count]);

  return (
    <View>
      <Header text="Start Journey" />
      <ReloadIcon getFollowers={getFollowers} />
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
    </View>
  );
};

export default StartJourney;

const styles = StyleSheet.create({});
