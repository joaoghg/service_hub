import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Colors from '../Utils/Colors'

const LoginScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingTop: insets.top,
        alignItems: 'center'
      }}
    >
      <Image 
        source={require('../../assets/images/login.png')} 
        style={styles.loginImage}
      />

      <View
        style={styles.subContainer}
      >
        <Text style={{ fontSize: 27, color: Colors.WHITE, textAlign: 'center' }}>
          Encontre profissionais para <Text style={{ fontWeight: 'bold' }}>todo tipo de serviço</Text>
        </Text>

        <Text style={{ fontSize: 17, color: Colors.WHITE, textAlign: 'center', marginTop: 20 }} >
          O melhor aplicativo para encontrar serviços perto de você
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => {}}
        >
          <Text style={{ textAlign: 'center', fontSize: 17, color: Colors.PRIMARY }}>Começar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 20,
    borderWidth: 4,
    borderColor: Colors.BLACK,
    borderRadius: 15
  },
  subContainer: {
    width: '100%',
    backgroundColor: Colors.PRIMARY,
    height: '70%',
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20
  },
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 99,
    marginTop: 30
  }
})