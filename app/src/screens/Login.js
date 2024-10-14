import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../utils/Colors'
import { TextInput } from '@react-native-material/core'
import Feather from '@expo/vector-icons/Feather';

export default function Login({ navigation }) {

    const insets = useSafeAreaInsets()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [verSenha, setVerSenha] = useState(false)

    return (
        <View
            style={[styles.container, {
                paddingTop: insets.top
            }]}
        >
            <Image 
                source={require('../../assets/logo.png')}
                resizeMode='contain'
                style={styles.logo}
            />

            <Text style={styles.textEntrar}>Entre na sua conta</Text>

            <View style={styles.inputsContainer}>

                <TextInput 
                    style={styles.input}
                    variant='outlined'
                    label={'Email'}
                    value={email}
                    onChangeText={setEmail}
                    color={colors.PRIMARY}
                    leading={() => <Feather name="mail" size={20} color={colors.PRIMARY} />}
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
            </View>

            <TouchableOpacity
                style={styles.btnEntrar}
                activeOpacity={0.8}
            >
                <Text style={{ color: colors.SECONDARY, fontWeight: 'bold', fontSize: 16 }}>Entrar</Text>
            </TouchableOpacity>

            <View
                style={styles.dividerView}
            >
                <Text style={styles.divider} />
                <Text style={{ marginHorizontal: 5 }}>Ou</Text>
                <Text style={styles.divider} />
            </View>

            <TouchableOpacity
                style={styles.btnGoogle}
                activeOpacity={0.8}
            >
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                    <Image 
                        source={require('../../assets/images/logo_google.png')}
                        resizeMode='contain'
                        style={styles.logoGoogle}
                    />
                    <Text>Fazer login com google</Text>
                </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginTop: 20, gap: 5 }}>
                <Text>Não possui conta?</Text>
                <Pressable
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={{ fontWeight: 'bold' }}>Cadastre-se</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        alignItems: 'center'
    },
    logo: {
        width: '20%',
        height: '10%',
        marginTop: 50
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
    },
    dividerView: {
        flexDirection: 'row',
        marginTop: 20,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    divider: {
        width: '45%',
        borderColor: '#CCC',
        borderBottomWidth: 1,
        height: 0.5
    },
    btnGoogle: {
        borderRadius: 8,
        borderWidth: 1,
        width: '90%',
        marginTop: 20,
        borderColor: colors.GRAYINPUT
    },
    logoGoogle: {
        width: 30,
        height: 30,
        marginVertical: 10
    }
})