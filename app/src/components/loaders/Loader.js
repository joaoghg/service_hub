import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Loader({ loading }) {
    return (
        <Modal transparent={true} animationType="none" visible={loading}>
            <StatusBar backgroundColor='rgba(0,0,0,0.5)' />
            <View style={styles.modalBackground}>
                <ActivityIndicator animating={loading} size={30} color={'#FFF'} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }
});