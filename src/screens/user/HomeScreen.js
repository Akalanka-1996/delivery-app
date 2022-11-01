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
import Header from "../../components/Header";
import { BASE_URL } from "../../config";

function HomeScreen({ navigation }) {
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
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
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
    navigation.navigate("ViewCompany", {
      paramKey: item._id,
    });
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

      <View>
        {category === "" ? (
          <>
            <View style={styles.name}>
              <Text style={styles.nameText}>Hi {userInfo.name}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.infoText}>What are you looking for?</Text>
            </View>
            <View style={styles.categoryContainer}>
              <TouchableOpacity onPress={handleIce}>
                <MaterialIcons name="icecream" size={86} color="black" />
                <Text style={styles.iconText}>Ice Cream</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleBakery}>
                <FontAwesome5 name="hamburger" size={86} color="black" />
                <Text style={styles.iconText}>Bakery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoryContainer}>
              <TouchableOpacity onPress={handleVeg}>
                <FontAwesome5 name="pepper-hot" size={86} color="black" />
                <Text style={styles.iconText}>Vegetables</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMilk}>
                <MaterialIcons name="local-drink" size={86} color="black" />
                <Text style={styles.iconText}>Milk</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.container}>
            <Text style={styles.companyText}>Available companies in your area</Text>
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
    justifyContent: "space-between",
    padding: 40,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  name: {
    marginLeft: 80,
    fontStyle: "bold",
    fontSize: 24,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "400",
  },
  info: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
  },
  iconText: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 5,
  },
  companyText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10
  }
});

export default HomeScreen;
