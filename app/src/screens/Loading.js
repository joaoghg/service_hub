import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import * as Animatable from 'react-native-animatable'

export default function Loading(){
    return (
        <View 
            style={styles.container}
            animation={'slideInDown'}
        >
            <Animatable.Image 
                source={require('../../assets/logo.png')}
                resizeMode="contain"
                style={styles.image}
                animation={'slideInDown'}
            />
            <Animatable.Text style={styles.Text} animation={'slideInUp'}>ServiceHub</Animatable.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 150
    },
    image: {
        height: 200,
        width: 200,
    },
    Text: {
        fontWeight: 'bold',
        fontSize: 26
    }
})