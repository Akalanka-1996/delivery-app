import { StyleSheet, Text, View } from 'react-native'
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
} from "react";
import { AuthContext } from "../../context/AuthContext";
import Header from '../../components/Header'
import { BASE_URL } from '../../config';
import axios from 'axios';


const ViewCompany = ({route}) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);

  const token = userInfo.token;


  const getCompany = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get(
        `${BASE_URL}/routes/get-route-with-lanes/${route.params.paramKey}`,
        config
      );
      console.log("new sdata", data);
      // setCompany(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompany()
  }, [])

  return (
    <View>
      <Header text="View Available Routes" />
      <Text>{route.params.paramKey}</Text>
    </View>
  )
}

export default ViewCompany

const styles = StyleSheet.create({})