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
  return (
    <View style={styles.container}>
        <Header scrollY={scrollY}></Header>
      
        <View style={styles.title}>
            <Text style={styles.titleText}>
                User
            </Text>
          </View>
        </View>
  );
}

DareViewScreen.sharedElements = (route, otherNavigation, showing) => {
  const props = route.params.props
  return [{id: "home"}, {id: props.id+'month'}, {id: props.id+'day'},{id: props.id+'location'},{id: props.id+'time'}]
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flex: 0.1,
      backgroundColor: '#aaa',
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      width: '100%',
      backgroundColor: '#bbb',
      padding: 10,
      
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

