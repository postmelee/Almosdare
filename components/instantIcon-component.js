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
import { Feather } from "@expo/vector-icons";

export default class InstantIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: null,
    };
  }

  renderNumberView = (length) => {
    return (
      <View
        key={"num"}
        style={{
          marginLeft: 5,
          paddingTop: 2,
          width: "18%",

          aspectRatio: 0.85,
          alignItems: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 100,
            aspectRatio: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "rgba(0, 0, 0, 0.2)",
          }}
        >
          <Feather name="user" size={27} color="black" />
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            marginTop: 2,
            fontSize: 13,
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {"+" + length}
        </Text>
      </View>
    );
  };
  renderUserIcons = () => {
    const invitedUsers = this.props.instantData.invited.concat();
    const pendingUsers = this.props.instantData.pending.concat();
    let showedUsers = [];
    if (invitedUsers.length > 5) {
      showedUsers = invitedUsers.slice(4).map((userData, i) => {
        if (i === 3) {
          return this.renderNumberView(invitedUsers.length - 4);
        } else {
          return (
            <View
              key={"InvitedUser" + i}
              style={{
                marginLeft: 5,
                paddingTop: 2,
                width: "18%",
                aspectRatio: 0.85,
                alignItems: "center",
              }}
            >
              <UserIcon
                id={this.props.id}
                profileImageUrl={userData.profileImageUrl}
                username={userData.nickname}
                status="invited"
                fontSize={20}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  marginTop: 2,
                  fontSize: 13,
                  textAlign: "center",
                }}
              >
                {userData.nickname}
              </Text>
            </View>
          );
        }
      });

      return showedUsers;
    } else if (invitedUsers.length + pendingUsers.length > 5) {
      const invitedTemp = invitedUsers.map((userData, i) => {
        return (
          <View
            key={"InvitedUser" + i}
            style={{
              marginLeft: 5,
              paddingTop: 2,
              width: "18%",
              aspectRatio: 0.85,
              alignItems: "center",
            }}
          >
            <UserIcon
              id={this.props.id}
              profileImageUrl={userData.profileImageUrl}
              username={userData.nickname}
              status="invited"
              fontSize={20}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginTop: 2,
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {userData.nickname}
            </Text>
          </View>
        );
      });
      console.log(invitedTemp);
      const pendingTemp = pendingUsers
        .slice(0, 5 - invitedUsers.length)
        .map((userData, i) => {
          if (i === 3) {
            return this.renderNumberView(
              invitedUsers.length + pendingUsers.length - 4
            );
          } else {
            return (
              <View
                key={"PendingUser" + i}
                style={{
                  marginLeft: 5,
                  paddingTop: 2,
                  width: "18%",
                  aspectRatio: 0.85,
                  alignItems: "center",
                }}
              >
                <UserIcon
                  id={this.props.id}
                  profileImageUrl={userData.profileImageUrl}
                  username={userData.nickname}
                  status="pending"
                  fontSize={20}
                />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    marginTop: 2,
                    fontSize: 13,
                    textAlign: "center",
                  }}
                >
                  {userData.nickname}
                </Text>
              </View>
            );
          }
        });
      console.log(pendingTemp);
      return invitedTemp.concat(pendingTemp);
    } else {
      const invitedTemp = invitedUsers.map((userData, i) => {
        return (
          <View
            key={"InvitedUser" + i}
            style={{
              marginLeft: 5,
              paddingTop: 2,
              width: "18%",
              aspectRatio: 0.85,
              alignItems: "center",
            }}
          >
            <UserIcon
              id={this.props.id}
              profileImageUrl={userData.profileImageUrl}
              username={userData.nickname}
              status="invited"
              fontSize={20}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginTop: 2,
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {userData.nickname}
            </Text>
          </View>
        );
      });
      const pendingTemp = pendingUsers.map((userData, i) => {
        return (
          <View
            key={"PendingUser" + i}
            style={{
              marginLeft: 5,
              paddingTop: 2,
              width: "18%",
              aspectRatio: 0.85,
              alignItems: "center",
            }}
          >
            <UserIcon
              id={this.props.id}
              profileImageUrl={userData.profileImageUrl}
              username={userData.nickname}
              status="pending"
              fontSize={20}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginTop: 2,
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {userData.nickname}
            </Text>
          </View>
        );
      });

      return invitedTemp.concat(pendingTemp);
    }
  };
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
        <View
          style={{
            borderRadius: 20,
            flex: 1,
            backgroundColor: "rgb(240, 240, 240)",
          }}
        >
          <View style={styles.block}>{this.renderUserIcons()}</View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,

    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    width: "92%",
    height: Dimensions.get("window").width * 0.2,
    marginLeft: "4%",
    marginRight: "4%",
    zIndex: 2,
    marginTop: "4%",
  },
  block: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    zIndex: 2,
    paddingHorizontal: 10,
  },
});
