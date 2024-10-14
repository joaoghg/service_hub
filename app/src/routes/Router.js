import React, { useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../screens/Loading'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { AuthContext } from '../contexts/AuthContext'
import api from '../../config/axiosConfig'

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
        const token =  await AsyncStorage.getItem('accessToken')
        
        if(token === null){
            setAuth(false)
        }
        else{
            try{
                const response = await api.get('/verifytoken', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                
                api.defaults.headers.common['Authorization'] = response.data.accessToken
                setAuth(true)
            }catch(error){
                setAuth(false)
            }
        }
    }

    useEffect(() => {
        setTimeout(verifyToken, 2000)
    }, [])

    return screen
}