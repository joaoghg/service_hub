import { createContext, useState } from "react";
import { Alert } from "react-native";
import api from "../../config/axiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const navigation = useNavigation()

    const [auth, setAuth] = useState('')
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})

    const signIn = async (email, senha) => {
        try{
            setLoading(true)

            dados = {
                email,
                password: senha
            }

            const response = await api.post('/signin', dados)

            if(response.data.verified){
                api.defaults.headers.common['Authorization'] = response.data.accessToken
                await AsyncStorage.setItem('accessToken', response.data.accessToken)
                setAuth(true)
            }
            else{
                setAuth(false)
                navigation.navigate('VerifyEmail', { email: response.data.email, verificationToken: response.data.verificationToken })
            }
            setLoading(false)
        }catch(erro){
            setLoading(false)
            if(erro.response){
                Alert.alert('Atenção', erro.response.data.message)
            }
            else{
                Alert.alert('Erro', 'Não foi possível fazer login')
            }
        }
    }

    const signUp = async (parametros) => {
        try{
            setLoading(true)

            const {nome, documento, celular, genero, email, senha, type} = parametros

            let cpf, cnpj 
            if(documento.length === 11){
                cpf = documento
                cnpj = null
            }
            else{
                cpf = null
                cnpj = documento
            }

            const dados = {
                name: nome,
                cpf,
                cnpj,
                email,
                password: senha,
                cellphone: celular,
                gender: genero,
                type
            }

            const response = await api.post('/signup', dados)

            setLoading(false)
            navigation.navigate('VerifyEmail', { email, verificationToken: response.data.verificationToken })
        }catch(erro){
            setLoading(false)
            if(erro.response){
                Alert.alert('Atenção', erro.response.data.message)
            }
            else{
                Alert.alert('Erro', 'Não foi possível fazer o cadastro')
            }
        }
    }

    const signOut = async () => {
        await AsyncStorage.removeItem('accessToken')
        setAuth(false)
    }

    const verifyToken = async () => {
        
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, signIn, signOut, signUp, loading, verifyToken, userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    )
}