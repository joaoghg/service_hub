import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../screens/Loading'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AppStack from './AppStack'

export default function Router(){

    const insets = useSafeAreaInsets()
    const [screen, setScreen] = useState(<Loading />)
    
    const verifyToken = async () => {
        const token =  await AsyncStorage.getItem('authToken')

        if(token === null){
            setTimeout(() => {
                setScreen(<AuthStack />)
            }, 2000)
        }
        else{
            setTimeout(() => {
                setScreen(<AppStack />)
            }, 2000)
        }
    }

    useEffect(() => {

        verifyToken()

    }, [])

    return (
        <View 
            style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingRight: insets.right,
                paddingLeft: insets.left
            }}
        >
            <NavigationContainer>
                {screen}
            </NavigationContainer>
        </View>
    )
}