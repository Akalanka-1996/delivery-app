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
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { AuthContext } from "../../context/AuthContext";
import Header from '../../components/Header'
import { BASE_URL } from '../../config';



const ViewCompany = ({route, navigation}) => {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [routes, setRoutes] = useState([])

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
      setRoutes(data)
      // setCompany(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompany()
  }, [])

  const translateX = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  useEffect(() => {
    Animated.timing(translateX, { toValue: 0, duration: 1000, useNativeDriver: true }).start();
  });

  const extractKey = ({lanes}) => lanes


  const ItemView =  renderItem = ({item}) => {
    let items = [];
    if( item.lanes) {
      items = item.lanes.map(row => {
        return <Text onPress={() => getItem(item)}>{row.lane}</Text>
      })
    } 

    return (
      <View>
        <Text style={styles.row} onPress={() => getItem(item)}>
          {item.title}
        </Text>
        {items}
      </View>
    )
  }
  const getItem = (item) => {
    navigation.navigate('FollowRoute', {
      paramKey: item._id,
    })
  };


  return (
    <View>
      <Header text="View Available Routes" />
             <FlatList
        data={routes}
        renderItem={ItemView}
        keyExtractor={extractKey}
      />
    </View>
  )
}

export default ViewCompany

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
    flexDirection: 'column'
  },
})