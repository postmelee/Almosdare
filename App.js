import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Dare from "./components/dare-component";
import { StyleSheet, ScrollView, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text>
          Head
        </Text>
      </View>
      
      <ScrollView style={{flex: 1, }}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Appointment
        </Text>
      </View>
        <View style={styles.list}>
          <Dare side='left'></Dare>
          <Dare side='right'></Dare>
        </View>
        <View style={styles.list}>
          <Dare side='left'></Dare>
          <Dare side='right'></Dare>
        </View>
        <View style={styles.list}>
          <Dare side='left'></Dare>
          <Dare side='right'></Dare>
        </View>
        <View style={styles.list}>
          <Dare side='left'></Dare>
          <Dare side='right'></Dare>
        </View>
        <View style={styles.list}>
          <Dare side='left'></Dare>
          <Dare side='right'></Dare>
        </View>
        <View style={styles.list}>
          <Dare side='left'></Dare>
          <Dare side='right'></Dare>
        </View>
        

      
      </ScrollView>
      <View style={styles.navbar}>
        <Text>
          Navbar
        </Text>
      </View>
    </View>
  );
}

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
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 40,
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
  list: {
    marginTop: '4%',
    flexDirection: 'row',
    
  },

});

