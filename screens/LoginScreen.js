import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native";
import { Input, Button } from "react-native-elements";
import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { TouchableOpacity } from "react-native";


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(email)
    console.log(password)
  }, [])


  return (
    <KeyboardAvoidingView
      // behavior='padding'
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image
          source={{
            uri: "https://customsitesmedia.usc.edu/wp-content/uploads/sites/59/2015/10/16133208/delivery_WEB-824x549.jpg",
          }}
          style={styles.logo}
        />
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            autoFocus
            type="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            secureTextEntry
            type="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            // onSubmitEditing={signIn}
          />
        </View>

        <Button title="Login" 
            containerStyle={styles.button} 
            // onPress={signIn} 
        />
        <Button
          title="Register"
          containerStyle={styles.button}
          type="outline"
          onPress={() => navigation.navigate("Register")}
        />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Click </Text>
          <TouchableOpacity 
          onPress={() => navigation.navigate('Supplier')}
          >
            <Text style={styles.supplierText}>Here</Text>
          </TouchableOpacity>
          <Text> to become a supplier</Text>
        </View>
        {/* <View style={{height:100}}></View> */}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  button: {
    width: 200,
    marginBottom: 10,
  },
  supplierText: {
    color: '#2C6BED'
  }
});

export default LoginScreen;
