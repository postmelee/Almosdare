import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef} from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, TouchableHighlight, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign } from '@expo/vector-icons';
import CreateDareFirstScreen from './createDareFirstScreen-component';
import CreateDareSecondScreen from './createDareSecondScreen-component';
import CreateDareThirdScreen from './createDareThirdScreen-component';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

const MainStack = createSharedElementStackNavigator();

export default function CreateDareScreen() {

  const [index, setIndex] = useState(0);
  

  function DareFirstScreenWrapper() {
    return(
      <CreateDareFirstScreen setDareData={setDareData} dareData={dareData}/>
    )
  }
  function DareSecondScreenWrapper() {
    return(
      <CreateDareSecondScreen setDareData={setDareData} dareData={dareData}/>
    )
  }
  function DareThirdScreenWrapper() {
    return(
      <CreateDareThirdScreen setDareData={setDareData} dareData={dareData}/>
    )
  }

  return(
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MainStack.Navigator mode="modal" initialRouteName="First"
        screenOptions={({ route }) => { 
          if(route.name === "First"){
            setIndex(0)
          } else if (route.name === "Second"){
            setIndex(1)
          } else if (route.name === "Third"){
            setIndex(2)
          }
        }}>
      <MainStack.Screen name="First"
        component={CreateDareFirstScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}></MainStack.Screen>
      <MainStack.Screen name="Second"
        component={CreateDareSecondScreen}
        options={{
          headerShown: false,
        }}></MainStack.Screen>
      <MainStack.Screen name="Third"
      component={CreateDareThirdScreen}
      options={{
        headerShown: false,
        gestureEnabled: false,
      }}></MainStack.Screen>
    </MainStack.Navigator>
    </View>
  )
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



