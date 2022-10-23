import React, {useState, useLayoutEffect, useContext} from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'

const SupplierRegistration = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState()
    // const [isSupplier, setIsSupplier] = useState(false)

    const {registerSupplier, isLoading} = useContext(AuthContext)

    const supplierRegister = () => {
        // setIsSupplier(!isSupplier)
        // console.log(isSupplier)
        registerSupplier(name, email, password, phone)
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={styles.headerText}>
                Create a Supplier Account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name} 
                    onChangeText={(text) => setName(text)} 
                />
                <Input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                />
                <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)} secureTextEntry 
                />
                <Input 
                    type="phone" 
                    placeholder="Phone" 
                    value={phone} 
                    onChangeText={(text) => setPhone(text)}
                />
 
            </View>

            <Button 
                containerStyle={styles.button} 
                raised 
                title="Register" 
                onPress={supplierRegister} 
                />
            {/* <View style={{height:100}}></View> */}

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    button:{
        width:200
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:"#fff"

    },
    headerText:{
        marginBottom:50,
        textAlign:'center'
    },
    inputContainer:{
        width:350
    }
})

export default SupplierRegistration
