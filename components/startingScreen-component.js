import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function StartingScreen() {
    return(
        <View style={styles.container}>
            <Entypo name="medal" size={150} color="black" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems : "center"
    }
})
