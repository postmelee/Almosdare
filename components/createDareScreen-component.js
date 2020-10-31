import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useCallback} from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, TouchableHighlight, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import CreateDareStartScreen from './createDareStartScreen-component';
import CreateDareFirstScreen from './createDareFirstScreen-component';
import CreateDareSecondScreen from './createDareSecondScreen-component';
import CreateDareThirdScreen from './createDareThirdScreen-component';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { SharedElement } from 'react-navigation-shared-element';

const MainStack = createSharedElementStackNavigator();

export default class CreateDareScreen extends React.Component{

  constructor(props){
    super(props);
    this.state={
      members: null,
      date: new Date(),
      location: null,
    }
    this.getDareData = this.getDareData.bind(this);
    this.setNewDareMembers = this.setNewDareMembers(this);
    this.setNewDareDate = this.setNewDareDate.bind(this);
    this.setNewDareLocation = this.setNewDareLocation.bind(this);

}


  getDareData = () => {
    return ({
      member: this.state.member,
      date: this.state.date,
      location: this.state.location,
  })
}

  setNewDareMembers = (members) => {
    this.setState(
      {
        members: members,
      }
    )
  }

  setNewDareDate = (date) => {
    this.setState(
      {
        date: date
      }
    )
  }

  setNewDareLocation = (location) => {
    this.setState(
      {
        location: location,
      }
    )
  }


  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <MainStack.Navigator mode="modal" initialRouteName="Start">
        <MainStack.Screen name="Start"
          component={CreateDareStartScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          initialParams={{
            getDareData: this.getDareData,
            setNewDareMembers: this.setNewDareMembers,
          }} >
            
          </MainStack.Screen>
        <MainStack.Screen name="First"
          component={CreateDareFirstScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
          initialParams={{
            getDareData: this.getDareData,
            setNewDareDate: this.setNewDareDate,
          }} >
            
          </MainStack.Screen>
        <MainStack.Screen name="Second"
        component={CreateDareSecondScreen}
          options={{
            headerShown: false,
          }}
          initialParams={{
            getDareData: this.getDareData,
            setNewDareLocation: this.setNewDareLocation,
          }} >
            
          </MainStack.Screen>
        <MainStack.Screen name="Third"
        component={CreateDareThirdScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialParams={{
          getDareData: this.getDareData,
          setNewDareLocation: this.setNewDareLocation,
        }} ></MainStack.Screen>
      </MainStack.Navigator>
      
      </View>
    )
      
      }
}

const styles = StyleSheet.create({
    navbar: {
      flex: 0.1,
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '3%'
    },
});



