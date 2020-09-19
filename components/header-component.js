import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import { StyleSheet, Animated, Dimensions, Text, View } from 'react-native';

export default function Header(props) {
    const imageOpacity = props.scrollY.interpolate({
        inputRange: [0, 20, 40],
        outputRange: [0, 0.5, 1],
        extrapolate: 'clamp',
      });
    return( 
        <Animated.View style={[styles.header, {opacity: imageOpacity}]}> 
            <View style={styles.headerBox}>
                <Text style={styles.headerTitle}>Appointments</Text> 
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    header: {
        flex: 0.1,
        backgroundColor: '#eee',
      },
    headerBox: {
        justifyContent: 'center',
        marginTop: Math.round(Dimensions.get('window').height)/22,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '400'
    }
})