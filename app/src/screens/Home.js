import React, { useContext } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { AuthContext } from '../contexts/AuthContext'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import colors from '../utils/Colors'

export default function Home() {

    const insets = useSafeAreaInsets()

    const { signOut } = useContext(AuthContext)

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE
    }
})