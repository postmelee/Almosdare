import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function CreateDareSecondScreen() {
    const navigation = useNavigation();
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBox}>
            <Text style={styles.headerTitle}>
              Create a Dare
            </Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              Step 2
            </Text>
            <Text style={styles.description}>
              Choose a Place.
            </Text>
          </View>
          <View style={styles.picker}>
          </View>
          
        </View>
      </View>
    )
  }


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      body: {
        flex: 1,
        justifyContent: "space-between",
      },
      header: {
        flex: 0.1,
        backgroundColor: '#eee',
      },
      headerBox: {
        justifyContent: 'center',
        marginTop: Math.round(Dimensions.get('window').height)/22,
        alignItems: 'center',
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: '400'
      },
      twoButtons: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: '12%',
        marginHorizontal: '5%'
      },
      title: {
        padding: 20,
        width: '100%',
        
      },
      titleText: {
        fontSize: 40,
      },
      description: {
        fontSize: 25,
        margin: '3%',
      },
      navbar: {
        flex: 0.1,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '3%'
      },
      picker: {
        marginBottom: '11%'
      }
});

