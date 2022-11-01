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
  import moment from 'moment';
import { registerIndieID } from 'native-notify';
import ReloadIcon from "../../components/ReloadIcon";


const FollowRoute = ({route}) => {
    const { userInfo, isLoading, logout } = useContext(AuthContext);
    const [selectedRoute, setSelectedRoute] = useState({})
    const [currentDate, setCurrentDate] = useState('');
    const [currentHour, setCurrentHour] = useState()
    const [customRoute, setCustomRoute] = useState({})
  
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
          console.log("single route", data.lanes[0]);
          setSelectedRoute(data)
        //   setRoutes(data)
          // setCompany(data);
          console.log('selected route', selectedRoute)
        } catch (error) {
          console.log(error);
        }
      };

      const getCustomerLane = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
    
          const { data } = await axios.get(
            `${BASE_URL}/lanes/get-customer-lane/${route.params.paramKey}/${userInfo.lane}`,
            config
          );
          console.log("custom route", data);
          setCustomRoute(data)
          console.log("akalanka", customRoute)
        } catch (error) {
          console.log(error);
        }
      }

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

      const sendFiveMinNotification = () => {
       try {
        console.log('custom hour', customRoute.hour)
        console.log('custom route', typeof(customRoute.min))
        console.log('current hour', typeof(currentHour))

        if (currentHour === customRoute.hour) {
          let diff = 0;
          diff = customRoute.min - currentDate
          console.log('diff', diff)

          if (diff && diff < 5 && diff > 0) {
            axios.post(`https://app.nativenotify.com/api/indie/notification`, {
              subID: `${userInfo._id}`,
              appId: 4597,
              appToken: 'pvq8whlzHqDGFuqGdELoWs',
              title: 'Door To Delivery',
              message: 'Delivery Will Arrive in 5 mins'
   });
          }
        }

       } catch (error) {
        console.log(error)
       }
        
      }

      useEffect(() => {
        getRouteById()
        getCustomerLane()
      }, [])

      useEffect(() => {
        var date = moment().utcOffset('+05:30').minute();
        setCurrentDate(date);
      }, []);

      useEffect(() => {
        var hour = moment().utcOffset('+05:30').hour();
        setCurrentHour(hour);
      }, []);

      useEffect(() => {
        sendFiveMinNotification()
      }, [])
  return (
    <View>
      <Header text="Follow Route" />
      <ReloadIcon reloadFunction={sendFiveMinNotification} />
      <Text>Start Point: {selectedRoute.startPoint}</Text>
      <Text>{userInfo.lane}</Text>
      <Text>{currentHour}</Text>
      <Text>{currentDate}</Text>
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