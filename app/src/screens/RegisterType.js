import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../utils/Colors'
import * as Animatable from 'react-native-animatable';

export default function RegisterType({ navigation }) {

    const insets = useSafeAreaInsets()

    const [prestador, setPrestador] = useState(false)
    const [cliente, setCliente] = useState(false)

    const handleContinue = () => {
        if(!prestador && !cliente){
            return Alert.alert('Ops!', 'Você não informou como quer se cadastrar.')
        }

        let type
        if(prestador){
            type = 'P'
        }
        else{
            type = 'C'
        }

        navigation.navigate('Register', { type })
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.WHITE }}>
            <Animatable.View
                style={[{ paddingTop: insets.top}, styles.container]}
                animation={'fadeInDown'}
            >
                <Image 
                    source={require('../../assets/logo.png')}
                    resizeMode='contain'
                    style={styles.logo}
                />

                <Text style={styles.txtCadastro}>Como você quer se cadastrar?</Text>

                <View style={styles.row}>
                    <View style={styles.radioContainer}>
                        <Pressable
                            style={[styles.radioButton, {
                                backgroundColor: prestador ? colors.BLACK : colors.WHITE
                            }]}
                            onPress={() => {
                                setPrestador(true)
                                setCliente(false)
                            }}
                        />
                    </View>
                    <Text style={styles.radioText}>Prestador de serviços</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.radioContainer}>
                        <Pressable
                            style={[styles.radioButton, {
                                backgroundColor: cliente ? colors.BLACK : colors.WHITE
                            }]}
                            onPress={() => {
                                setPrestador(false)
                                setCliente(true)
                            }}
                        />
                    </View>
                    <Text style={styles.radioText}>Cliente</Text>
                </View>

                <TouchableOpacity
                    style={styles.btnContinuar}
                    activeOpacity={0.8}
                    onPress={handleContinue}
                >
                    <Text style={{ color: colors.SECONDARY, fontWeight: 'bold', fontSize: 16 }}>Continuar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%'
    },
    logo: {
        width: '20%',
        height: '10%',
        marginTop: 50
    },
    txtCadastro: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 30
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        width: '90%',
        alignItems: 'center',
        marginBottom: 15
    },
    radioContainer: {
        borderColor: colors.BLACK,
        borderWidth: 1,
        width: 30,
        height: 30,
        borderRadius: 15,
        padding: 2
    },
    radioButton: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },  
    radioText: {
        fontSize: 18
    },
    btnContinuar: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    }
})