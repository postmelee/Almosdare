import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginComponent from './LoginView/LoginComponent';
import SignUpComponent from './LoginView/SignUpComponent';
import SwiperComponent from './LoginView/SwiperComponent';

const StackNavigator = createStackNavigator();

export default function InitialScreen() {
    return(
            <StackNavigator.Navigator>
                <StackNavigator.Screen
                    name="SwiperComponent"
                    component={SwiperComponent}
                    options={{
                        headerShown:false
                    }}/>
                <StackNavigator.Screen
                    name="LoginComponent"
                    component={LoginComponent}
                    options={{
                        headerShown:false
                    }}/>
                <StackNavigator.Screen
                    name="SignUpComponent"
                    component={SignUpComponent}
                    options={{
                        headerShown:false
                    }}/>
            </StackNavigator.Navigator>
    )
};