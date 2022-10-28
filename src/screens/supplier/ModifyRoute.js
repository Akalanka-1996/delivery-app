import {  FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Easing } from 'react-native'
import React, {useContext, useEffect, useState, useRef} from 'react'
import Header from '../../components/Header'
import {AuthContext} from '../../context/AuthContext'
import { BASE_URL } from '../../config';
import { Button, Input } from 'react-native-elements'
import axios from 'axios';

const ModifyRoute = ({route, navigation}) => {
    const { userInfo, isLoading, logout } = useContext(AuthContext);
    const [routes, setRoutes] = useState([])
    const [selectedRoute, setSelectedRoute] = useState('')

    const token = userInfo.token;


    const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
    useEffect(()=>{
      Animated.timing(translateX,{toValue:0,duration:2000,  useNativeDriver: true}).start();
    })

    const ItemView = ({ item }) => {

        return (
          // Single Comes here which will be repeatative for the FlatListItems
          <Animated.View style={{transform:[{translateY:translateX}]}} >
            <Text style={styles.item} onPress={() => getItem(item)}>
              {item.area}
            </Text>
          </Animated.View>
        );
      };
    
      const ItemSeparatorView = () => {
        return (
          //Item Separator
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
          />
        );
      };
    
      const getItem = (item) => {
        setSelectedRoute('route')
        console.log('status', selectedRoute)
        // alert('Id : ' + item._id + ' start point : ' + item.startPoint);
        navigation.navigate('AddLane' , {
          paramKey: item._id,
        })
      };


    useEffect(() => {
        getCompanyRoutes()
        console.log('first state', selectedRoute)
        }, [])
      
        const getCompanyRoutes = async () => {
          try {
            const config = {
              headers: { Authorization: `Bearer ${token}` }
          };
      
          const {data} = await axios.get(`${BASE_URL}/routes/${route.params.paramKey}`, config)
          
          setRoutes(data)
          console.log('company routes', routes);
        //   setCompany(data)
      
          } catch (error) {
            console.log(error)
          }
        }
  
  return (
    <View>
      <Header text="Select a route to modify" />
      {/* <Text>{route.params.paramKey}</Text> */}
      <View style={styles.container}>
      <FlatList
        data={routes}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    </View>
  )
}

export default ModifyRoute

const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
})