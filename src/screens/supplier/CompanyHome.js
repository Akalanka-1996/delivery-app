import {  FlatList, View, Text, SafeAreaView, StyleSheet, Dimensions, Animated, Easing } from 'react-native'
import React, {useContext, useEffect, useState, useRef} from 'react'
import Header from '../../components/Header'
import {AuthContext} from '../../context/AuthContext'
import { BASE_URL } from '../../config';
import { Button, Input } from 'react-native-elements'
import axios from 'axios';

const CompanyHome = ({ navigation }) => {
    const [company, setCompany] = useState([])
    const {userInfo, isLoading, logout } = useContext(AuthContext)

    const translateX = useRef(new Animated.Value(Dimensions.get("window").height)).current 
    useEffect(()=>{
      Animated.timing(translateX,{toValue:0,duration:2000,  useNativeDriver: true}).start();
    })

    const ItemView = ({ item }) => {

        return (
          // Single Comes here which will be repeatative for the FlatListItems
          <Animated.View style={{transform:[{translateY:translateX}]}} >
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
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
          />
        );
      };
    
      const getItem = (item) => {
        //Function for click on an item
        // alert('Id : ' + item._id + ' Value : ' + item.category);
        navigation.navigate('AddRoute' , {
          paramKey: item._id,
        })
      };
    

    useEffect(() => {
      getCompanies()
      }, [])
    
      const getCompanies = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
    
        const {data} = await axios.get(`${BASE_URL}/company/get-my-company`, config)
        console.log('data', data);
        setCompany(data)
    
        } catch (error) {
          console.log(error)
        }
      }

    
 
  const token = userInfo.token
  return (

    <SafeAreaView style={{ flex: 1 }}>
        <Header  text="Your Companies"/>
    <View style={styles.container}>
      <FlatList
        data={company}
        //data defined in constructor
        ItemSeparatorComponent={ItemSeparatorView}
        //Item Separator View
        renderItem={ItemView}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
    <View style={styles.btnContainer}>
    {/* <Button
          title="Add Company"
          containerStyle={styles.button}
          onPress={() => navigation.navigate("Company")}
        /> */}
     <View style={styles.container}>
    </View>
   
     
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 30,
        
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      title: {
        fontSize: 32,
      },
    inputContainer: {
      width: 300,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 10,
      borderRadius: 5
    },
    button: {
      width: 200,
      marginBottom: 10,
    },
    supplierText: {
      color: '#2C6BED'
    },
    btnContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
  });

export default CompanyHome