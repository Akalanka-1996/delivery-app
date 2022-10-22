import React, {useState, useLayoutEffect, useContext} from 'react'
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { View, StyleSheet } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { AuthContext } from '../context/AuthContext'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState()
    const [area, setArea] = useState('')
    const [lane, setLane] = useState('')

    const {register, isLoading} = useContext(AuthContext)

    return (
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
            <Text h3 style={styles.headerText}>
                Create a New Account
            </Text>

            <View style={styles.inputContainer}>
                <Input type="text" placeholder="Full Name" autoFocus value={name} onChangeText={(text) => setName(text)} />
                <Input type="email" placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input type="password" placeholder="Password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
                <Input type="phone" placeholder="Phone" value={phone} onChangeText={(text) => setPhone(text)} />
                <Input type="text" placeholder="Area" value={area} onChangeText={(text) => setArea(text)} />
                <Input type="text" placeholder="Lane" value={lane} onChangeText={(text) => setLane(text)} 
                // onSubmitEditing={register} 

                />

            </View>

            <Button 
                containerStyle={styles.button} 
                raised 
                title="Register" 
                onPress={() => {register(name, email, password, phone, area, lane)}} 
                />

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

export default RegisterScreen
