import React, { useEffect, useState, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../screens/Loading'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { AuthContext } from '../contexts/AuthContext'

export default function Router(){

    const { auth, setAuth } = useContext(AuthContext)
    let screen 

    if(auth === true){
        screen = <AppStack />
    }
    else if(auth === false){
        screen = <AuthStack />
    }
    else{
        screen = <Loading />
    }

    const verifyToken = async () => {
        const token =  await AsyncStorage.getItem('authToken')

        if(token === null){
            setAuth(false)
        }
        else{
            setAuth(true)
        }
    }

    useEffect(() => {
        setTimeout(verifyToken, 2000)
    }, [])

    return (
        <NavigationContainer>
            {screen}
        </NavigationContainer>
    )
}