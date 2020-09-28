import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { StyleSheet, Dimensions, TouchableWithoutFeedback, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { TabNavigator } from "react-navigation";
import { SharedElement } from 'react-navigation-shared-element';
import CreateDareNavbar from './createDareNavbar-component'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Polyline from '@mapbox/polyline'

export default class CreateDareSecondScreen extends React.Component{
  
  state = {
    input: null,
    latitude : null,
    longitude : null,
    error : null,
    locations: null,
    search : '',
    place : '',
    address : '',
    destLat : null,
    destLng : null,

  }
  constructor(props){
    super(props);
    
  }
  static sharedElements = (navigation, otherNavigation, showing) => {
    if(navigation.name === 'Second' && otherNavigation.name === 'Third'){
      return [{id: 'title'}, {id: 'location'}, {id: 'date'}, {id: 'buttonLeft'}, {id: 'buttonRight'}]
    } else if(navigation.name === 'Second' && otherNavigation.name === 'First'){
      return [{id: 'title'}, {id: 'date'}, {id: 'buttonLeft'}, {id: 'buttonRight'}]
    }
  }

  async componentDidMount(){
    const { status } = await Permissions.getAsync(Permissions.LOCATION)
    
    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.mergeCoords
        console.log(this.state);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );
  }


  onChangeSearch = query => this.setState({search : query, input : query});

  search(search){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        this.mergeCoords
        console.log(this.state);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    );

    fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + search + '&inputtype=textquery&fields=photos,formatted_address,name,geometry&key=AIzaSyCa7HkxMKkjhMf6Ze2QbxkQtBX-haPStkQ    ')
    .then(res => res.json())
      .then(
        (result) => {
          this.props.route.params.setNewDareLocation(result.candidates[0].name);
          this.setState({
            destLat : result.candidates[0].geometry.location.lat,
            destLng : result.candidates[0].geometry.location.lng,
            place : result.candidates[0].name,
            address : result.candidates[0].formatted_address,
            input : this.props.route.params.getDareData().location,
          });
          
          console.log('SEARCH', this.state);
          this.mergeCoords();
        },
        (error) => {
          console.log(error);
        }
      )
  }

  mergeCoords = () => {
    const {
      latitude,
      longitude,
      destLat,
      destLng
    } = this.state

    const hasStartAndEnd = latitude !== null && destLat !== null

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${destLat},${destLng}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  async getDirections(startLoc, desLoc) {
    console.log(startLoc, desLoc);
    try {
      const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyCa7HkxMKkjhMf6Ze2QbxkQtBX-haPStkQ&mode=transit`)
      const respJson = await resp.json();
      console.log(respJson);
      if(respJson.status === 'ZERO_RESULTS') {alert('Can not find direction'); return -1}
      const response = respJson.routes[0]
      const distanceTime = response.legs[0]
      const distance = distanceTime.distance.text
      const time = distanceTime.duration.text
      const points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords, distance, time })
    } catch(error) {
      console.log('Error: ', error)
    }
  }

  render() {
    const {
      time,
      coords,
      distance,
      latitude,
      longitude,
      destination
    } = this.state
   
    if( latitude ) {
      return(
        <View style={styles.container}>
          <View style={styles.header}></View>
          <View style={styles.body}>
            <View style={styles.title}>
            <SharedElement id="title">
              <Text style={styles.titleText}>
                Step 2
              </Text>
              </SharedElement>
            </View>
            <View style={styles.title}>
              <SharedElement id="date">
                <Text style={[styles.titleText]}>
                {this.props.route.params.getDareData().date.toDateString()}
              </Text>
              </SharedElement>
            </View>
            <View style={[styles.title]}>
              <SharedElement id="location">
                <TextInput style = {styles.input}
                  placeholder = "Location"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.onChangeSearch}
                  value = {this.state.input}
                  multiline = {true}
                  numberOfLines = {2}
                  />
            </SharedElement>
            
            </View>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.search(this.state.search)
               }>
               <Text style = {styles.submitButtonText}> GO </Text>
            </TouchableOpacity>
          
            
            
              <MapView
                showsUserLocation
                provider = "google"
                style={{ flex: 1,}}
                initialRegion = {{
                  latitude,
                  longitude,
                  latitudeDelta : 0.0922,
                  longitudeDelta : 0.0421
                }}
                >
                  <View
                    style={{
                    width,
                    paddingTop: 10,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                    <Text style={{ fontWeight: 'bold' }}>Estimated Time: {time}</Text>
                    <Text style={{ fontWeight: 'bold' }}>Estimated Distance: {distance}</Text>
                  </View>
                  <MapView.Polyline
                    strokeWidth = {2}
                    strokeColor = "red"
                    coordinates = {coords}>
                  </MapView.Polyline>
              </MapView>
            
          </View>
            
            <CreateDareNavbar index={2} previous="First" next="Third"></CreateDareNavbar>
        </View>
      ) 
    }
    return(
      <View style={styles.container}>
          <View style={styles.header}></View>
          <View style={styles.body}>
            <View style={styles.title}>
            <SharedElement id="title">
              <Text style={styles.titleText}>
                Step 2
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
            <View style={[styles.title, {}]}>
              <SharedElement id="location">
                <TextInput style = {styles.input}
                  placeholder = "Location"
                  placeholderTextColor = "black"
                  autoCapitalize = "none"
                  onChangeText = {this.onChangeSearch}
                  value = {this.state.input}
                  />
            </SharedElement>
            
            </View>
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.search(this.state.search)
               }>
               <Text style = {styles.submitButtonText}> GO </Text>
            </TouchableOpacity>
          
            <View style = {{ flex : 1, justifyContent : 'center', alignItems : 'center'}}>
        <Text>
          We need your permission!
        </Text>
          </View>
            
            
            
          </View>
            
            <CreateDareNavbar index={2} previous="First" next="Third"></CreateDareNavbar>
        </View>
    )
    
     
  }
    
}

let {height, width} = Dimensions.get('window')

const styles = StyleSheet.create({
  input : {
    width: width-30,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: "300"
  },
  submitButton: {
    backgroundColor: 'skyblue',
    padding: 10,
    margin: 15,
    height: 40,
    marginBottom : 0
 },
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
      fontSize: 25, 
      fontWeight: "300"
      
    },
    titleTextFocus: {
      fontSize: 35, 
      fontWeight: "300",
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

