import React, { useContext } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {

    const { signOut } = useContext(AuthContext)

    return (
        <View>
            <Text>Home</Text>
            <Pressable
                style={{
                    padding: 15
                }}
                onPress={signOut}
            >
                <Text>Sair</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({})