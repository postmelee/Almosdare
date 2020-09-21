import { StatusBar } from 'expo-status-bar';
import React, {useRef} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import Header from "./header-component";
import { StyleSheet, Animated, TouchableHighlight, Text, View } from 'react-native';

export default function DareViewScreen({ route }) {
  let props = route.params.props
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScale = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(headerScale, {
      toValue: 1,
      delay: 160,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(titleScale, {
      toValue: 1,
      delay: 260,
      duration: 300,
      useNativeDriver: false,
    }).start();
  })
  return (
    <View style={styles.container}>
        <View style={styles.header}>

        <SharedElement id={props.id+"month"} style={{justifyContent: 'center'}}>
                        <Animated.Text style={[styles.month, {fontSize: headerScale.interpolate({
                  inputRange: [0, 0.2, 0.5, 0.8, 1],
                  outputRange: [20, 22, 30, 45, 40], 
                  })}]}>{props.Dare.date.month}</Animated.Text>
                </SharedElement>
                <SharedElement id={props.id+"day"} style={{justifyContent: 'center'}}>
                        <Animated.Text style={[styles.day, {fontSize: headerScale.interpolate({
                  inputRange: [0, 0.2, 0.5, 0.8, 1],
                  outputRange: [28, 31, 38, 50, 42], 
                  })}]}>{props.Dare.date.day}</Animated.Text>
                </SharedElement>
                
        </View>
        <View style={styles.title}>
        <SharedElement id='ak'>
                        <Text style={styles.location}>
                            MAY
                        </Text>
                    </SharedElement>
          <SharedElement id={props.id+"location"}>
                    <Animated.Text style={[styles.location, {fontSize: titleScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [17, 26], 
                  })}]}>MAY<Animated.Text style={[styles.time, {fontSize: titleScale.interpolate({
                    inputRange: [0, 1],
                    outputRange: [15, 27], 
                    })}]}>{' '+props.Dare.time}</Animated.Text> 
                    </Animated.Text>
                  
                </SharedElement>
                
                
          </View>
          <StatusBar style="light"/>
        </View>
  );
}

DareViewScreen.sharedElements = (route, otherNavigation, showing) => {
  const props = route.params.props
  return [{id: props.id+'month'}, {id: props.id+'day'},{id: props.id+'location'},{id: props.id+'time'}, {id: 'ak'}]
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'black',
    },
    header: {
      flex: 0.1,
      backgroundColor: 'black',
      flexDirection: 'row',
      
      paddingHorizontal: 15,
      paddingVertical: 0,
      marginTop: 22,

    },
    month: {
      fontSize: 20,
      fontWeight: "500",
      color: 'rgb(145, 168, 209)',
      marginRight: "2%",
  },
  day: {
    
      fontSize: 28,
      fontWeight: "600",
      color: 'white',

  },
  location: {
    fontSize: 17,
    fontWeight: "600",
    color: 'white',
    marginRight: '2%',
},
time: {
    fontSize: 15,
    fontWeight: "400",
    color: '#ccc',
},
    title: {
      flexWrap: 'wrap',
      backgroundColor: 'black',
      paddingVertical: 0,
      paddingHorizontal: 15,
      flexDirection: 'row',
      
    },

    titleText: {
      fontSize: 40,
      marginLeft: '4%',
      
    },
    content: {
      width: '100%',
      flex: 0.6,
      flexDirection: 'row',
      flexWrap: 'wrap',
  
      alignItems: "center",
    },
    navbar: {
      flex: 0.1,
      backgroundColor: '#ddd',
      justifyContent: 'center',
      alignItems: 'center',
    },
});

DareViewScreen.sharedElements = (route, otherNavigation, showing) => {
    const props = route.params.props
    return [{id: props.id+'month'}, {id: props.id+'day'},{id: props.id+'location'},{id: props.id+'time'}, {id: 'ak'}]
  };