import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { Button, Input } from "react-native-elements";
import axios from "axios";
import Header from "../../components/Header";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../config";

const CreateCompany = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Vegetable", value: "veg" },
    { label: "Bakery", value: "bake" },
    { label: "Milk", value: "milk" },
    { label: "Ice Cream", value: "ice" },
  ]);
  const { userInfo, isLoading, logout } = useContext(AuthContext);

  const token = userInfo.token;

  const createCompany = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.post(
        `${BASE_URL}/company/create`,
        { title, description, area, category: value },
        config
      );
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Header text="Create Company" />
      <View style={styles.inputContainer}>
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <View style={styles.dropdownGender}>
          <DropDownPicker
            style={styles.dropdown}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <Input
          type="text"
          placeholder="Area"
          value={area}
          onChangeText={(text) => setArea(text)}
        />
      </View>
      <Button
        containerStyle={styles.button}
        raised
        title="Add Company"
        onPress={createCompany}
      />
      <Button
        containerStyle={styles.button}
        raised
        type="outline"
        title="My Companies"
        onPress={() => navigation.navigate("CompanyHome")}
      />
    </View>
  );
};

export default CreateCompany;

const styles = StyleSheet.create({
  logout: {
    alignSelf: "flex-end",
  },
  inputContainer: {
    width: 350,
  },
  dropdownGender: {
    marginHorizontal: 10,
    width: "50%",
    marginBottom: 15,
  },
  dropdown: {
    borderColor: "#B7B7B7",
    height: 50,
  },
  button: {
    width: 200,
    alignSelf: "center",
    marginBottom: 15,
  },
});
