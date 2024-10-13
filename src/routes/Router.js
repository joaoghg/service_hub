import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Router() {

    const insets = useSafeAreaInsets()

    return (
        <View 
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingRight: insets.right,
                paddingLeft: insets.left
            }}
        >
            <Text>Teste</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})