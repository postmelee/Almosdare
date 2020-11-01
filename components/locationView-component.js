import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import socketIO from 'socket.io-client';

const LOCATION_TASK_NAME = 'background-location-task';
const socket = socketIO.connect('https://almosdare.herokuapp.com');
const getUsers = async () => {
    let token = await AsyncStorage.getItem("userToken")
    return fetch('https://almosdare.herokuapp.com/api/users', { 
        method: 'GET', 
        headers: new Headers({
          'Authorization': token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
      })
      .then((response) => response.json())
      .then((json) => {
          
        if(json.result === 1){    
            return json.nickname;
        }
        else{
            alert("ERROR")
        }
      })
      .catch((error) => {
          console.log(error);
          alert('Server Problem');
      });
}
const username = getUsers();

export default class LocationView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentLocation: null,
            hasLocationPermissions: false,
            locationResult: null,
            name: null,
        };
    }  

    componentDidMount() {
        this._getLocationPermissionAsync();
        this._getLocationAsync();
        socket.emit('join', '123');
        socket.on('sendMemberLocation', (data) => {
            this.setState({
                currentLocation: data,
            })
        })
    }


    _getLocationPermissionAsync = async () => {
        const { status } = await Permissions.getAsync(Permissions.LOCATION)
    
        if (status !== 'granted') {
            const response = await Permissions.askAsync(Permissions.LOCATION)
            this.setState({
                locationResult: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }
    };

    _getLocationAsync = async () => {
        await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.Balanced,
        });
    }

    render() {
        return (
        <View style={styles.container}>
            <Text >
                Location: {JSON.stringify(this.state.currentLocation) || this.state.locationResult}
            </Text>
            <TouchableOpacity
               onPress = {this.getUsers}>
               <Text> GO </Text>
            </TouchableOpacity>
        </View>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
})

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
    if (error) {
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        const { locations } = data;
        socket.emit('getMemberLocation', {location: JSON.stringify(locations), name: await username});
        
        

      // do something with the locations captured in the background
    }
  });