import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useContext,
    useRef,
  } from "react";
  import {
    FlatList,
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Animated,
    Easing,
    TouchableOpacity,
  } from "react-native";
import { Input, Button } from "react-native-elements";
  import { NavigationContainer } from "@react-navigation/native";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";
  import { AntDesign } from "@expo/vector-icons";
  import axios from "axios";
  import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
  import { AuthContext } from "../../context/AuthContext";
  import Header from '../../components/Header'
  import { BASE_URL } from '../../config';

const FollowRoute = ({route}) => {
    const { userInfo, isLoading, logout } = useContext(AuthContext);
    const [selectedRoute, setSelectedRoute] = useState({})
  
    const token = userInfo.token;

    const getRouteById = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
    
          const { data } = await axios.get(
            `${BASE_URL}/routes/get-route-by-id/${route.params.paramKey}`,
            config
          );
          console.log("single route", data);
          setSelectedRoute(data)
        //   setRoutes(data)
          // setCompany(data);
          console.log('selected route', selectedRoute)
        } catch (error) {
          console.log(error);
        }
      };

      const followSelectedRoute = async () => {
        try {
            const config = {
              headers: { Authorization: `Bearer ${token}` },
            };
      
            const { data } = await axios.put(
              `${BASE_URL}/routes/follow-route/${route.params.paramKey}`, {
                user: userInfo._id
              },
              config
            );
            alert("Route Followed")
          } catch (error) {
            console.log(error);
          }
      }

      useEffect(() => {
        getRouteById()
      }, [])
  return (
    <View>
      <Header text="Follow Route" />
      <Text>Start Point: {selectedRoute.startPoint}</Text>
      <Button title="Follow this Route" 
            containerStyle={styles.button} 
            onPress={followSelectedRoute} 
        />
    </View>
  )
}

export default FollowRoute

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginBottom: 10,
      },
})