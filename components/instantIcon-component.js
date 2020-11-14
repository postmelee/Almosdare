import { StatusBar } from "expo-status-bar";
import React, { useState, useRef, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Dimensions,
  TouchableHighlight,
  View,
} from "react-native";

import UserIcon from "./userIcon-component";

export default class InstantIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: null,
    };
  }

  componentDidMount() {}
  //this.props should have
  //  date = {month, day}, location=String(""), time=String("xx:xx xm"), member = []
  render() {
    return (
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
      <TouchableHighlight
        ref={(ref) => (this.viewRef = ref)}
        style={styles.container}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          this.props.isPopup
          ? this.props.setSelectedData(null)
          : this.props.setSelectedData(this.props.instantData);
        this.props.setIsBlured(!this.props.isBlured);
        }}
        onLongPress={() => alert(Math.round(Dimensions.get("window").height))}
      >
      <View style={{borderRadius: 20, flex: 1,
    backgroundColor: 'rgb(240, 240, 240)',
    shadowColor: 'white', shadowOffset: {width: -4, height: -4}, shadowRadius: 3, shadowOpacity:0.8}}>
        <View style={styles.block}>
          {this.props.instantData &&
            this.props.instantData.invited.map((userData, i) => {
              return (
                <View key={"InvitedUser" + i} style={{marginLeft: 5, paddingTop:2, width: "18%", aspectRatio:0.85, alignItems: 'center'}}>
                <UserIcon
                  id={this.props.id}
                  username={userData.nickname}
                  fontSize={20}
                />
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ marginTop: 2,fontSize: 11, textAlign: 'center'}}>{userData.nickname}</Text>
                </View>

              );
            })}
          {this.props.instantData &&
            this.props.instantData.pending.map((userData, i) => {
              return (
                <View key={"PendingUser" + i} style={{marginLeft: 5, paddingTop:2, width: "18%", aspectRatio:0.85, alignItems: 'center'}}>
                <UserIcon
                  id={this.props.id}
                  username={userData.nickname}
                  fontSize={20}
                />
                <Text numberOfLines={1} ellipsizeMode='tail' style={{ marginTop: 2,fontSize: 11, textAlign: 'center'}}>{userData.nickname}</Text>
                </View>
              );
            })}
        </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    
    width: "92%",
    height: Dimensions.get("window").width * 0.2,
    marginLeft: "4%",
    marginRight: "4%",
    zIndex: 2,
    marginTop: '4%',
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowColor: 'grey',
    shadowRadius: 4, shadowOpacity: 0.6
    
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    zIndex: 2,
    paddingHorizontal: 10,
  },
});
