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

const MainStack = createStackNavigator();

function Navbar(props) {
  const navigation = useNavigation();
  const leftButtonValue = useRef(new Animated.Value(-1)).current;
  const rightButtonValue = useRef(new Animated.Value(-1)).current;

  let pages = ['First', 'Second', 'Third'];
  Animated.timing(leftButtonValue, {
    toValue: props.index,
    duration: 500,
    useNativeDriver: false,
  }).start();
  Animated.timing(rightButtonValue, {
    toValue: props.index,
    duration: 500,
    useNativeDriver: false,
  }).start();

  return(
    <View style={styles.navbar}>
              <TouchableWithoutFeedback onPress={() => {
                if(props.index === 0){
                  navigation.goBack();
                } else {
                  navigation.navigate(pages[props.index-1]);
                }
                }}>
                  <Animated.View style={{transform: [{rotate: leftButtonValue.interpolate({
                      inputRange: [0, 1, 2],
                      outputRange: ['-90deg', '0deg', '0deg'], 
                    })}]}}>
                    <AntDesign name="left" size={50} color="black" /> 
                  </Animated.View>
              </TouchableWithoutFeedback>
              <Text>
                  {props.index+1}/3
              </Text>
              <TouchableWithoutFeedback style={styles.button} onPress={() => {
                if(props.index === 2){
                  navigation.goBack();
                } else {
                  navigation.navigate(pages[props.index+1]);
                }
              }}>
                <Animated.View style={{transform: [{rotate: rightButtonValue.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: ['0deg', '0deg', '90deg'], 
                  })}]}}>
                  <AntDesign name="right" size={50} color="black" /> 
                </Animated.View>
              </TouchableWithoutFeedback>
            
    </View>
  )
}
export default function CreateDareScreen() {

  const [index, setIndex] = useState(0);

  return(
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MainStack.Navigator initialRouteName="First"
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
      }}></MainStack.Screen>
    </MainStack.Navigator>
    <Navbar index={index}></Navbar></View>
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



