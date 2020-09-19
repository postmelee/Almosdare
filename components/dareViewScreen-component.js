import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, ScrollView, TouchableHighlight, Text, View } from 'react-native';

export default function DareViewScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>
          Head
        </Text>
      </View>
      <ScrollView style={{flex: 1,}}>
      <View style={styles.title}>
        <Text style={styles.titleText}>
          Title
        </Text>
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

