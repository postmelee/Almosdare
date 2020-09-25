import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as TaskManager from 'expo-task-manager';
import socketIO from 'socket.io-client';

const LOCATION_TASK_NAME = 'background-location-task';
const socket = socketIO.connect('http://localhost:5000');

export default class LocationView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentLocation: null,
            hasLocationPermissions: false,
            locationResult: null,
        };
    }  

    componentDidMount() {
        this._getLocationPermissionAsync();
        this._getLocationAsync();
        socket.on('sendMemberLocation', (data) => {
            this.setState({
                currentLocation: data,
            })
        })
    }

    _getLocationPermissionAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
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
                Location: {this.state.currentLocation || this.state.locationResult}
            </Text>
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

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
        // Error occurred - check `error.message` for more details.
        return;
    }
    if (data) {
        const { locations } = data;
        socket.emit('getMemberLocation', JSON.stringify(locations));

      // do something with the locations captured in the background
    }
  });