import { StatusBar } from 'expo-status-bar';
import React, {useState, useRef, useEffect} from 'react';
import { NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';
import { StyleSheet, AsyncStorage, Text, Dimensions, TouchableHighlight, View, } from 'react-native';

import UserIcon from './userIcon-component';

export default class InstantIcon extends React.Component{
    constructor(props){
        super(props);
        this.state={
            members: null,
        }
        this.getMemberIdByInstant = this.getMemberIdByInstant.bind(this)
    }

    getMemberIdByInstant = async (instant) => {
        const token = await AsyncStorage.getItem("userToken");
        const invited = await Promise.all(
          instant.invited.map((userIdx, i) => {
            const url = 'https://almosdare.herokuapp.com/api/users/idx/'+userIdx;
                return fetch(url, {
                  method: 'GET',
                  headers: new Headers({
                    'Authorization': token,
                    'Content-Type': 'application/json'
                  }), 
                })
                .then((response) => response.json())
                .then((json) => {
                  if(json.result === 1) {
                    return json.nickname;
                  }
                  else{
                    alert("ERROR");
                    return -1;
                  }
                })
                .catch((error) => {
                  console.log(error);
                  alert(error);
                });
            })
        );
        const pending = await Promise.all(
            instant.pending.map((userIdx, i) => {
              const url = 'https://almosdare.herokuapp.com/api/users/idx/'+userIdx;
                  return fetch(url, {
                    method: 'GET',
                    headers: new Headers({
                      'Authorization': token,
                      'Content-Type': 'application/json'
                    }), 
                  })
                  .then((response) => response.json())
                  .then((json) => {
                    if(json.result === 1) {
                      return json.nickname;
                    }
                    else{
                      alert("ERROR");
                      return -1;
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    alert(error);
                  });
              })
          );
        this.setState({
            members: {
                invited: invited,
                pending: pending,
            }
        })
    }

    componentDidMount() {
        if(this.props.isPopup){
            this.setState(
                {
                    members: this.props.selectedData
                }
            )
        }
        else{
            this.getMemberIdByInstant(this.props.instantData);
        }
    }
    //this.props should have 
    //  date = {month, day}, location=String(""), time=String("xx:xx xm"), member = []
    render() {
        return(
        
        /* 
        <TouchableHighlight style={styles.container}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => navigation.navigate('InstantView', {this.props})}
            onLongPress={() => alert(Math.round(Dimensions.get('window').height))}>
            <View style={styles.block}>
                <UserIcon width='15%' username='태규' fontSize={20}/>
            </View>
        </TouchableHighlight>
        */
       <TouchableHighlight style={styles.container}
            
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
                
                this.props.setIsBlured(!this.props.isBlured);
                this.props.isPopup ? this.props.setSelectedData(null) : this.props.setSelectedData(this.state.members)
            }}
            onLongPress={() => alert(Math.round(Dimensions.get('window').height))}>
            <View style={styles.block}>
                {this.state.members && this.state.members.invited.map((username, i) => {
                    return (
                        <UserIcon width='15%' username={username} fontSize={20}/>
                    )
                })
                }
                {this.state.members && this.state.members.pending.map((username, i) => {
                    return (
                        <UserIcon width='15%' username={username} fontSize={20}/>
                    )
                })
                }
            </View>
        </TouchableHighlight>
        
    )
            }
    
    
}

function randomColor () {
    const colors = ['rgb(247, 119, 106)', 'rgb(145, 168, 209)', 'rgb(151, 221, 221)', 'rgb(247, 201, 201)', 'rgb(152, 150, 164)', 'rgb(249, 224, 61)'];
    return colors[Math.floor(Math.random() * colors.length)];
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 30,
        padding: 18,
        width: '92%',
        height: Dimensions.get('window').width*0.20,
        marginLeft: "4%",
        marginRight: "4%",
        backgroundColor: 'rgb(28, 28, 30)',
        zIndex: 2,
    },
    block: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        zIndex: 2,
    },
});
