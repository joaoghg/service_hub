import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../utils/Colors'
import { TextInput } from '@react-native-material/core'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import { cpf, cnpj } from 'cpf-cnpj-validator'

export default function Register({ navigation }) {

    const insets = useSafeAreaInsets()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const [nome, setNome] = useState('')
    const [documento, setDocumento] = useState('')
    const [celular, setCelular] = useState('')

    const [verSenha, setVerSenha] = useState(false)
    const [verConfirmSenha, setVerConfirmSenha] = useState(false)

    const handleDocumento = (text) => {
        let value = text.replace(/\D/g, '');

        // Aplica máscara de CPF (11 dígitos)
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } 
        // Aplica máscara de CNPJ (14 dígitos)
        else if (value.length <= 14) {
            value = value.replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
        }

        setDocumento(value);
    }

    const handleFone = (text) => {
        text = text.replace(/\D/g, '')

        if(text.length > 10){
            text = text.replace(/^(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")
        }
        else{
            text = text.replace(/(\d{2})(\d)/, '($1)$2')
                .replace(/(\d{4})(\d{1,4})/, '$1-$2')
        }

        setCelular(text)
    }

    return (
        <ScrollView
            style={{ width: '100%', backgroundColor: colors.WHITE, paddingTop: insets.top }}
            contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
            <Image 
                source={require('../../assets/logo.png')}
                resizeMode='contain'
                style={styles.logo}
            />

            <Text style={styles.textEntrar}>Crie sua conta</Text>

            <View style={styles.inputsContainer}>

                <TextInput 
                    style={styles.input}
                    variant='outlined'
                    label={'Nome completo'}
                    value={nome}
                    onChangeText={setNome}
                    color={colors.PRIMARY}
                    leading={() => <Feather name="user" size={20} color={colors.PRIMARY} />}
                />

                <TextInput 
                    style={styles.input}
                    variant='outlined'
                    label={'Documento'}
                    value={documento}
                    onChangeText={handleDocumento}
                    color={colors.PRIMARY}
                    leading={() => <AntDesign name="idcard" size={20} color={colors.PRIMARY} />}
                    maxLength={18}
                />

                <TextInput 
                    style={styles.input}
                    variant='outlined'
                    label={'Nº Celular'}
                    value={celular}
                    onChangeText={handleFone}
                    color={colors.PRIMARY}
                    leading={() => <Feather name="phone" size={20} color={colors.PRIMARY} />}
                    maxLength={14}
                />

                <TextInput 
                    style={styles.input}
                    variant='outlined'
                    label={'Email'}
                    value={email}
                    onChangeText={setEmail}
                    color={colors.PRIMARY}
                    leading={() => <Feather name="mail" size={20} color={colors.PRIMARY} />}
                    inputMode='email'
                />

                <TextInput 
                    style={styles.input}
                    variant='outlined'
                    label={'Senha'}
                    value={senha}
                    onChangeText={setSenha}
                    color={colors.PRIMARY}
                    leading={() => <Feather name="unlock" size={20} color={colors.PRIMARY} />}
                    trailing={() => {
                        return verSenha ? 
                        <Feather name="eye" size={24} color={colors.PRIMARY} onPress={() => setVerSenha(!verSenha)} /> :
                        <Feather name="eye-off" size={24} color={colors.PRIMARY} onPress={() => setVerSenha(!verSenha)} /> 
                    }}
                    secureTextEntry={!verSenha}
                />

                <TextInput 
                    style={styles.input}
                    variant='outlined'
                    label={'Confirme a senha'}
                    value={confirmSenha}
                    onChangeText={setConfirmSenha}
                    color={colors.PRIMARY}
                    leading={() => <Feather name="unlock" size={20} color={colors.PRIMARY} />}
                    trailing={() => {
                        return verConfirmSenha ? 
                        <Feather name="eye" size={24} color={colors.PRIMARY} onPress={() => setVerSenha(!verConfirmSenha)} /> :
                        <Feather name="eye-off" size={24} color={colors.PRIMARY} onPress={() => setVerSenha(!verConfirmSenha)} /> 
                    }}
                    secureTextEntry={!verSenha}
                />
            </View>

            <TouchableOpacity
                style={styles.btnEntrar}
                activeOpacity={0.8}
            >
                <Text style={{ color: colors.SECONDARY, fontWeight: 'bold', fontSize: 16 }}>Continuar</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 20, gap: 5, marginBottom: 150 }}>
                <Text>Já possui conta?</Text>
                <Pressable
                    onPress={() => navigation.popToTop()}
                >
                    <Text style={{ fontWeight: 'bold' }}>Entrar</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE
    },
    logo: {
        width: '20%',
        height: '10%',
        marginTop: 30
    },
    textEntrar: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    inputsContainer: {
        width: '100%',
        marginTop: 30,
        alignItems: 'center',
        gap: 15
    },
    input: {
        width: '90%',
        backgroundColor: colors.WHITE
    },
    btnEntrar: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    }
})