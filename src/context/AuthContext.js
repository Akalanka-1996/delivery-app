import AsyncStorage from '@react-native-async-storage/async-storage'
// import axios from '../utils/axios'
import axios from 'axios'
import { BASE_URL } from '../config'
import React, {createContext, useState, useEffect} from 'react'
import { registerIndieID } from 'native-notify';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [splashLoading, setSplashLoading] = useState(false)

    const register = (name, email, password, phone, area, lane, isSupplier) => {
        if (name === '' || email === '' || phone === '' || area === '' || lane === '' || password === '') {
            alert('Please fill all the fields')
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (reg.test(email) === false) {
            alert("Email is Not Correct");
          }
       setIsLoading(true)
       console.log('name', name)
       console.log('isSupplier', isSupplier)
       console.log('area', area)
       console.log('lane', lane)

       axios.post(`${BASE_URL}/users/`, {
        name,
        email,
        password,
        phone,
        area,
        lane,
        isSupplier
    })
       .then(res => {
            let userInfo = res.data
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsLoading(false)
            console.log(userInfo)
       })
       .catch(e => {
           console.log(`register error ${e}`)
           setIsLoading(false)
       })
    }

    const registerSupplier = (name, email, password, phone) => {
        if (name === '' || email === '' || phone === '' || password === '') {
            alert('Please fill all the fields')
        }

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (reg.test(email) === false) {
            alert("Email is Not Correct");
          }
        setIsLoading(true)
 
        axios.post(`${BASE_URL}/users/`, {
         name,
         email,
         password,
         phone,
         isSupplier: true
     })
        .then(res => {
             let userInfo = res.data
             setUserInfo(userInfo)
             AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
             setIsLoading(false)
             console.log(userInfo)

              // Native Notify Indie Push Registration Code
            registerIndieID(`${userInfo._id}`, 4837, 'iWKmkqlwMEPOULXMm88bsG');
            // End of Native Notify Code

            axios.post(`https://app.nativenotify.com/api/indie/notification`, {
            subID: `${userInfo._id}`,
            appId: 4837,
            appToken: 'iWKmkqlwMEPOULXMm88bsG',
            title: 'Door To Delivery',
            message: 'Successfully Registered!'
 });
        })

        
        .catch(e => {
            console.log(`register error ${e}`)
            setIsLoading(false)
        })
     }

    const login = ( email, password) => {
        setIsLoading(true)
        setIsLoading(true)
 
        axios.post(`${BASE_URL}/users/login`, {
            email,
            password
        })
        .then(res => {
             let userInfo = res.data
             console.log(userInfo)
             console.log(userInfo.name)

             setUserInfo(userInfo)
             AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
             setIsLoading(false)
             console.log(userInfo)

            // Native Notify Indie Push Registration Code
            registerIndieID(`${userInfo._id}`, 4837, 'iWKmkqlwMEPOULXMm88bsG');
            // End of Native Notify Code

            axios.post(`https://app.nativenotify.com/api/indie/notification`, {
            subID: `${userInfo._id}`,
            appId: 4837,
            appToken: 'iWKmkqlwMEPOULXMm88bsG',
            title: 'Door To Delivery',
            message: 'Successfully Logged In!'
 });
        })
        .catch(e => {
            console.log(`register error ${e}`)
            if (email === '' || password === '') {
                alert('Incorrect Credentials!')
            }
            setIsLoading(false)
        })
     }

     const logout = () => {
         setIsLoading(true)
         AsyncStorage.removeItem('userInfo')
         setUserInfo({})
         setIsLoading(false)
     }

    //  const isLoggedIn = async () => {
    //      try {
    //         setSplashLoading(true)

    //          let userInfo = await AsyncStorage.getItem('userInfo')
    //          userInfo = JSON.parse(userInfo)

    //          if(userInfo) {
    //              setUserInfo(userInfo)
    //          }

    //          setSplashLoading(false)
    //      } catch (error) {
    //          splashLoading(false)
    //          console.log(error)
    //      }
    //  }

    //  useEffect(() => {
    //    isLoggedIn() 
    //  }, [])



    return (
    <AuthContext.Provider 
        value={{
            isLoading,
            userInfo,
            // splashLoading,
            register,
            registerSupplier,
            login,
            logout
        }}
        >
        {children}
    </AuthContext.Provider>

    )
}