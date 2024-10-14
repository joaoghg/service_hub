import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../utils/Colors'
import * as Animatable from 'react-native-animatable';

export default function VerifyEmail({ navigation, route }) {

    const insets = useSafeAreaInsets()

    const email = route.params?.email

    const sendEmail = async () => {

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

                <Text style={styles.text1}>Enviamos um email de confirmação para o email {email}.</Text>

                <Text style={styles.text1}>Caso não tenha recebido o email, clique <Text onPress={sendEmail} style={styles.textResend}>aqui</Text> para reenviar</Text>

                <Text style={styles.text2}>Confirme seu email e junte-se ao ServiceHub!</Text>

                <TouchableOpacity
                    style={styles.btnContinuar}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('Login')}
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
    text1: {
        marginTop: 20,
        fontSize: 16,
        width: '80%',
        textAlign: 'center'
    },
    text2: {
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        width: '80%'
    },
    btnContinuar: {
        backgroundColor: colors.PRIMARY,
        padding: 15,
        width: '90%',
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10
    },
    textResend: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline'
    }
})