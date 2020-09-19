import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import DareIcon from "./dareIcon-component";
import Header from "./header-component";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ScrollView, Animated, TouchableHighlight, Text, View } from 'react-native';

const Stack = createStackNavigator();

export default function Home() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    
    <View style={styles.container}>
      <Header scrollY={scrollY}></Header>
      
      <ScrollView style={{flex: 1, }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: false},
        )}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Appointments
        </Text>
      </View>
      
        <View style={styles.list}>
          <DareIcon side='left'></DareIcon>
          <DareIcon side='right'></DareIcon>
        </View>
        
        <View style={styles.list}>
          <DareIcon side='left'></DareIcon>
          <DareIcon side='right'></DareIcon>
        </View>
        <View style={styles.list}>
          <DareIcon side='left'></DareIcon>
          <DareIcon side='right'></DareIcon>
        </View>
        <View style={styles.list}>
          <DareIcon side='left'></DareIcon>
          <DareIcon side='right'></DareIcon>
        </View>
        <View style={styles.list}>
          <DareIcon side='left' isStarted={true}></DareIcon>
          <DareIcon side='right'></DareIcon>
        </View>
        <View style={styles.list}>
          <DareIcon side='left'></DareIcon>
          <DareIcon side='right'></DareIcon>
        </View>
        

      
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 8,
    
  },
  titleText: {
    fontSize: 40,
    fontWeight: '300',
    marginLeft: '4%',
    
  },
  content: {
    width: '100%',
    flex: 0.6,
    flexDirection: 'row',
    flexWrap: 'wrap',

    alignItems: "center",
  },
  list: {
    marginTop: '4%',
    flexDirection: 'row',
    
  },

});

