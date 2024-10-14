import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Register() {

    const insets = useSafeAreaInsets()

    return (
        <View
            style={[styles.container, {
                paddingTop: insets.top
            }]}
        >
            <Text>Register</Text>
        </View>
    )
}

const styles = StyleSheet.create({})