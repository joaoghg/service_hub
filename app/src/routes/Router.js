import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../screens/Loading'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AppStack from './AppStack'

export default function Router(){

    const [screen, setScreen] = useState(<Loading />)
    
    const verifyToken = async () => {
        const token =  await AsyncStorage.getItem('authToken')

        if(token === null){
            setScreen(<AuthStack />)
        }
        else{
            setScreen(<AppStack />)
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