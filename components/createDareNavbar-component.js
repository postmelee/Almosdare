import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef} from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, TouchableHighlight, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import { SharedElement } from 'react-navigation-shared-element';

export default function CreateDareNavbar(props) {
    const navigation = useNavigation();
    const feturn = () => {
        return props;
    }
    return(
        <View style={styles.navbar}>
              <TouchableWithoutFeedback onPress={() => { 
                  if(props.previous === 'home') navigation.goBack();
                  else navigation.navigate(props.previous);
                }}>
                <SharedElement id="buttonLeft">
                    <AntDesign style={
                        props.index === 1 ? styles.rLeft : {color: 'black'}
                    } name="left" size={50} color="black" /> 
                </SharedElement>    
                
              </TouchableWithoutFeedback>
              <Text>
                  {props.index}/3
              </Text>
              <TouchableWithoutFeedback onPress={() => {
                  if(props.next == 'home') navigation.navigate("Main");
                  else navigation.navigate(props.next);
              }}>
                  <SharedElement id="buttonRight">
                    <AntDesign style={
                        props.index === 3 ? styles.rRight : {color: 'black'}
                    } name="right" size={50} color="black" /> 
                  </SharedElement>
              
              </TouchableWithoutFeedback>
            
    </View>
    )
}




const styles = StyleSheet.create({
    navbar: {
      flex: 0.1,
      backgroundColor: 'rgba(52, 52, 52, 0)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '3%'
    },
    rLeft: {
        transform: [{
            rotate: "-90deg"
        }]
    },
    rRight: {
        transform: [{
            rotate: "90deg"
        }]
    }
});