import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import { TabNavigator } from "react-navigation";
import { SharedElement } from 'react-navigation-shared-element';
import CreateDareNavbar from './createDareNavbar-component'

export default class CreateDareThirdScreen extends React.Component{
  constructor(props){
    super(props);
    this.state={
      

    }
  }
  render() {
   
    return(
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.body}>
          <View style={styles.title}>
          <SharedElement id="title">
            <Text style={styles.titleText}>
              Step 3
            </Text>
            </SharedElement>
          </View>
          <View style={styles.title}>
            <SharedElement id="date">
              <Text style={styles.titleText}>
              {this.props.route.params.getDareData().date.toDateString()}
            </Text>
            </SharedElement>
          </View>
          <View style={styles.title}>
            <SharedElement id="location">
              <Text style={styles.titleText}>
                Location
            </Text>
            </SharedElement>
          </View>
          <View style={{flex: 1,}}>
            <Text>
              Invited your friends!
            </Text>
          </View>
        </View>
          
          <CreateDareNavbar index={3} previous="Second" next="home"></CreateDareNavbar>
      </View>
    )
     
  }
    
}

let {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  mapContainer: {
    height: height,
    width: width,
  },
  map: {
    height: height,
    width: width,
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    body: {
      flex: 1,
      alignItems: 'center',
    },
    header: {
      height: '6%',
      backgroundColor: 'white',
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
      paddingVertical: 5,
      width: '100%',
      alignItems: 'center',
      margin: 10,
      
    },
    titleText: {
      fontSize: 35, 
      fontWeight: "300"
      
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

