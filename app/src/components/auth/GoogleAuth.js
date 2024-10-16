import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import colors from '../../utils/Colors'
import * as webBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

export default function GoogleAuth() {

    /*const webClientId = process.env.WEB_CLIENT_ID
    const androidClientId = process.env.ANDROID_CLIENT_ID

    webBrowser.maybeCompleteAuthSession()

    const config = {
        webClientId,
        androidClientId
    }

    const [request, response, promptAsync] = Google.useAuthRequest(config)

    const handleToken = () => {
        if (response?.type === 'success') {
            const { authentication } = response
            const token = authentication?.accessToken
            getUserProfile(token)
        }
    }

    const getUserProfile = async (token) => {
        if (!token) {
            return
        }

        try {
            const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const user = await response.json()
            console.log(user)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleToken()
    }, [response])*/

    return (
        <TouchableOpacity
            style={styles.btnGoogle}
            activeOpacity={0.8}
            onPress={() => promptAsync()}
        >
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                <Image
                    source={require('../../../assets/images/logo_google.png')}
                    resizeMode='contain'
                    style={styles.logoGoogle}
                />
                <Text>Fazer login com google</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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