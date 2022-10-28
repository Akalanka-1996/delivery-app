import React, {useContext} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { AntDesign } from '@expo/vector-icons'; 
import { AuthContext } from "../context/AuthContext";

const Header = ({ text }) => {
  const {userInfo, isLoading, logout } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{text}</Text>
      </View>
      <TouchableOpacity onPress={logout}>
      <AntDesign style={styles.logout} name="logout" size={24} color="black" />

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: Constants.statusBarHeight,
    marginBottom: 25,
  },
  backArrow: {
    marginLeft: 10,
  },
  title: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: {alignItems: 'center', fontSize: 22 },
  logout: {
    marginRight: 20
  }
});

export default Header;
