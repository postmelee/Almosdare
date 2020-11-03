import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { StyleSheet, Text, Dimensions, TouchableHighlight, View } from 'react-native';




export default function UserIcon(props) {
    const navigation = useNavigation();
    
    //props should have 
    //  date = {month, day}, location=String(""), time=String("xx:xx xm"), member = []
    return(
        <View style={{
            width: props.width,
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: 1,
            borderRadius: 100,
            backgroundColor: 'rgb(123, 143, 163)',
        }}>
            <Text style={{color: 'white', fontSize: props.fontSize}}>{props.username}</Text>
        </View>
                    
    
    )
    
    
}

function randomColor () {
    const colors = ['rgb(247, 119, 106)', 'rgb(145, 168, 209)', 'rgb(151, 221, 221)', 'rgb(247, 201, 201)', 'rgb(152, 150, 164)', 'rgb(249, 224, 61)'];
    return colors[Math.floor(Math.random() * colors.length)];
}

  