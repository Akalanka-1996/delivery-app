import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogBox } from "react-native";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SupplierRegistration from "../screens/SupplierRegistration";
import HomeScreen from "../screens/user/HomeScreen";
import ViewCompany from "../screens/user/ViewCompany";
import CreateCompany from "../screens/supplier/CreateCompany";
import CompanyHome from "../screens/supplier/CompanyHome";
import AddRoute from "../screens/supplier/AddRoute";
import ModifyRoute from "../screens/supplier/ModifyRoute";
import AddLane from "../screens/supplier/AddLane";
import StartJourney from "../screens/supplier/StartJourney";

LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

const Navigation = () => {
  const { userInfo } = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={globalScreenOptions}
      >
        {userInfo.token ? (
          [
            userInfo.isSupplier === false ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ViewCompany" component={ViewCompany} />
              </>
            ) : (
              <>
                <Stack.Screen name="Company" component={CreateCompany} />
                <Stack.Screen name="CompanyHome" component={CompanyHome} />
                <Stack.Screen name="AddRoute" component={AddRoute} />
                <Stack.Screen name="ModifyRoute" component={ModifyRoute} />
                <Stack.Screen name="AddLane" component={AddLane} />
                <Stack.Screen name="StartJourney" component={StartJourney} />
              </>
            ),
          ]
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              styles={styles.header}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Supplier" component={SupplierRegistration} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    textAlign: "center",
  },
});
