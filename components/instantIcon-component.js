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
        style={[styles.container, { marginTop: this.props.isPopup ? 0 : "4%" }]}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => {
          this.viewRef.measure((x, y, width, height, pageX, pageY) => {
            this.props.setSelectedOffset({
              fx: pageX,
              fy: pageY,
            });
            this.props.isPopup
              ? this.props.setSelectedData(null)
              : this.props.setSelectedData(this.props.instantData);
            this.props.setIsBlured(!this.props.isBlured);
          });
        }}
        onLongPress={() => alert(Math.round(Dimensions.get("window").height))}
      >
        <View style={styles.block}>
          {this.props.instantData &&
            this.props.instantData.invited.map((userData, i) => {
              return (
                <UserIcon
                  key={"InvitedUser" + i}
                  width="15%"
                  username={userData.nickname}
                  fontSize={20}
                />
              );
            })}
          {this.props.instantData &&
            this.props.instantData.pending.map((userData, i) => {
              return (
                <UserIcon
                  key={"PendingUser" + i}
                  width="15%"
                  username={userData.nickname}
                  fontSize={20}
                />
              );
            })}
        </View>
      </TouchableHighlight>
    );
  }
}

function randomColor() {
  const colors = [
    "rgb(247, 119, 106)",
    "rgb(145, 168, 209)",
    "rgb(151, 221, 221)",
    "rgb(247, 201, 201)",
    "rgb(152, 150, 164)",
    "rgb(249, 224, 61)",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    padding: 18,
    width: "92%",
    height: Dimensions.get("window").width * 0.2,
    marginLeft: "4%",
    marginRight: "4%",
    backgroundColor: "rgb(28, 28, 30)",
    zIndex: 2,
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    zIndex: 2,
  },
});
