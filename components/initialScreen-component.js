import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginComponent from './LoginView/LoginComponent';
import SignUpComponent from './LoginView/SignUpComponent';
import SwiperComponent from './LoginView/SwiperComponent';

const StackNavigator = createStackNavigator();


export default function InitialScreen() {


        
    const postSignUpToApi = async (signUpData) => {
        return fetch('https://almosdare.herokuapp.com/api/users/signup', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
          })
          .then((response) => response.json())
          .then((json) => {
            return json.result;
          })
          .catch((error) => {
              console.log(error);
              alert('Server Problem');
          });
    }

    const postLoginToApi = async (loginData) => {
        return fetch('https://almosdare.herokuapp.com/api/users/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
          })
          .then((response) => response.json())
              .then((json) => {
                    return json;
          })
          .catch((error) => {
              console.log(error);
              alert('Server Problem');
          });
    }

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
                    options={{
                        headerShown:false
                    }
                }>
                    {props => <LoginComponent {...props} postLoginToApi={postLoginToApi} />}
                </StackNavigator.Screen>
                <StackNavigator.Screen
                    name="SignUpComponent"
                    options={{
                        headerShown:false
                    }}
                >
                    {props => <SignUpComponent {...props} postSignUpToApi={postSignUpToApi} />}
                </StackNavigator.Screen>
            </StackNavigator.Navigator>
    )
};