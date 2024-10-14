import { createContext, useState } from "react";
import { Alert } from "react-native";
import api from "../../config/axiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState('')

    const signIn = async (email, senha) => {
        try{
            dados = {
                email,
                password: senha
            }

            const response = await api.post('/signin', dados)
            api.defaults.headers.common['Authorization'] = response.data.accessToken
            await AsyncStorage.setItem('accessToken', response.data.accessToken)

            setAuth(true)
        }catch(erro){
            if(erro.response){
                Alert.alert('Atenção', erro.response.data.message)
            }
            else{
                Alert.alert('Erro', 'Não foi possível fazer login')
            }
        }
    }

    const signOut = () => {
        AsyncStorage.removeItem('accessToken')
        setAuth(false)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}