import { Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../screens/Loading'

export default function Router(){

    const insets = useSafeAreaInsets()

    let screen = <Loading />
    
    const verifyToken = async () => {
        const token =  await AsyncStorage.getItem('authToken')

        if(token === null){
            screen = 'AuthStack'
        }
        else{
            screen = 'AppStack'
        }
    }

    useEffect(() => {

        verifyToken()

    }, [])

    return (
        <View 
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingRight: insets.right,
                paddingLeft: insets.left
            }}
        >
            {screen}
        </View>
    )
}