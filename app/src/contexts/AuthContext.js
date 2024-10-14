import { createContext, useState } from "react";
import { Alert } from "react-native";
import api from "../../config/axiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({})

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState('')
    const [loading, setLoading] = useState(false)

    const signIn = async (email, senha) => {
        try{
            setLoading(true)

            dados = {
                email,
                password: senha
            }

            const response = await api.post('/signin', dados)
            api.defaults.headers.common['Authorization'] = response.data.accessToken
            await AsyncStorage.setItem('accessToken', response.data.accessToken)

            setLoading(false)
            setAuth(true)
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

            const {nome, documento, celular, email, senha} = parametros

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
                cellphone: celular
            }

            await api.post('/signup', dados)

            setLoading(false)
            setAuth(true)
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

    const signOut = () => {
        AsyncStorage.removeItem('accessToken')
        setAuth(false)
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, signIn, signOut, signUp, loading }}>
            {children}
        </AuthContext.Provider>
    )
}