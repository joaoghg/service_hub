import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const LoginScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingTop: insets.top
      }}
    >
      <Image source={require('../../assets/images/login.png')} />
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})