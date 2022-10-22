import AsyncStorage from '@react-native-async-storage/async-storage'
// import axios from '../utils/axios'
import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [splashLoading, setSplashLoading] = useState(false)

    const register = (name, email, password, phone, lane, area) => {
       setIsLoading(true)


       axios.post(`http://192.168.1.103:8080/api/users/`, {
        name,
        email,
        password,
        phone,
        area,
        lane
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

    // const login = ( email, password) => {
    //     setIsLoading(true)
 
    //     axios.post(`http://192.168.1.103:8080/api/users/login`, {
    //         email,
    //         password
    //     })
    //     .then(res => {
    //          let userInfo = res.data
    //          console.log(userInfo)
    //          setUserInfo(userInfo)
    //          AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
    //          setIsLoading(false)
    //          console.log(userInfo)
    //     })
    //     .catch(e => {
    //         console.log(`register error ${e}`)
    //         setIsLoading(false)
    //     })
    //  }

    //  const logout = () => {
    //      setIsLoading(true)
    //      AsyncStorage.removeItem('userInfo')
    //      setUserInfo({})
    //      setIsLoading(false)
    //  }

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
            // userInfo,
            // splashLoading,
            register,
            // login,
            // logout
        }}
        >
        {children}
    </AuthContext.Provider>

    )
}