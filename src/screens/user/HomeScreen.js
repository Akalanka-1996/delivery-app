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

function HomeScreen({navigation}) {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [company, setCompany] = useState([]);
  const [category, setCategory] = useState("");
  const token = userInfo.token;
  const area = userInfo.area;

  const handleIce = () => {
    setCategory("ice");
  };

  const handleBakery = () => {
    setCategory("bake");
  };

  const handleVeg = () => {
    setCategory("veg");
  };

  const handleMilk = () => {
    setCategory("milk");
  };

  useEffect(() => {
    if (category !== "") getCompany();
  }, [category]);

  const translateX = useRef(
    new Animated.Value(Dimensions.get("window").height)
  ).current;
  useEffect(() => {
    Animated.timing(translateX, { toValue: 0, duration: 1000, useNativeDriver: true }).start();
  });

  const ItemView = ({ item }) => {
    return (
      // Single Comes here which will be repeatative for the FlatListItems
      <Animated.View style={{ transform: [{ translateY: translateX }] }}>
        <Text style={styles.item} onPress={() => getItem(item)}>
          {item.title}
        </Text>
      </Animated.View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#C8C8C8" }}
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    // alert("Area : " + item.area + " Value : " + item.category + "ID: " + item._id);
    navigation.navigate('ViewCompany', {
      paramKey: item._id,
    })
  };

  const getCompany = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get(
        `${BASE_URL}/company/company-from-user/${area}/${category}`,
        config
      );
      console.log("data", data);
      setCompany(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Header text="Home Screen" />
      <Text>Hi {userInfo.name}</Text>
      <View>
        {category === "" ? (
          <>
            <Text>What are you looking for?</Text>
            <View style={styles.categoryContainer}>
              <TouchableOpacity onPress={handleIce}>
                <MaterialIcons name="icecream" size={72} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBakery}>
                <FontAwesome5 name="hamburger" size={72} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleVeg}>
                <FontAwesome5 name="pepper-hot" size={72} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMilk}>
                <MaterialIcons name="local-drink" size={72} color="black" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.container}>
            <Text>Available companies in your area</Text>
            <FlatList
              data={company}
              //data defined in constructor
              ItemSeparatorComponent={ItemSeparatorView}
              //Item Separator View
              renderItem={ItemView}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logout: {
    // alignContent: 'flex-end',
    alignItems: "flex-end",
    marginLeft: 20,
  },
  categoryContainer: {
    // alignContent: 'flex'
    flexDirection: "row",
    alignContent: "space-between",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HomeScreen;
