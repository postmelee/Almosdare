import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";
import {
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import UserIcon from "./userIcon-component";

export default function DareIcon(props) {
  const navigation = useNavigation();
  const date = new Date(props.dareData.date);
  //props should have
  //  date = {month, day}, location=String(""), time=String("xx:xx xm"), member = []
  return (
    <TouchableHighlight
      style={styles.blockContainer}
      activeOpacity={0.7}
      underlayColor="rgb(200, 200, 200)"
      onPress={() => navigation.navigate("DareView", { props })}
      onLongPress={() => alert(Math.round(Dimensions.get("window").height))}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 30,
        }}
      >
        <LinearGradient
          colors={["#F0F0F0", "#F0F0F0"]}
          style={{ flex: 1, borderRadius: 30, padding: 18 }}
        >
          <View style={styles.blockContent}>
            <View style={styles.date}>
              <SharedElement style={{}} id={props.id + "month"}>
                <Text style={styles.month}>
                  {date.getMonth()}{" "}
                  <Text style={styles.day}>{date.getDate()}</Text>
                </Text>
              </SharedElement>
            </View>
            <View style={{ zIndex: 1 }}>
              <SharedElement id={props.id + "location"}>
                <Text numberOfLines={2} style={styles.location}>
                  {props.dareData.place.name}
                </Text>
              </SharedElement>
              <SharedElement id={props.id + "time"}>
                <Text style={styles.time}>
                  {date.getHours() + ":" + date.getMinutes()}
                </Text>
              </SharedElement>
            </View>
            <View
              style={{ zIndex: 1, flexDirection: "row", alignItems: "center" }}
            >
              <View style={{ width: "23%" }}>
                <UserIcon
                  id={props.id}
                  fontSize={20}
                  username={props.dareData.invited[0].nickname}
                />
              </View>
              <Text
                style={{
                  color: "black",
                  fontSize: 25,
                  fontWeight: "500",
                  marginLeft: "5%",
                  marginBottom: "2%",
                }}
              >
                +{props.dareData.invited.length - 1}
              </Text>
            </View>
            {props.isStarted ? (
              <>
                <View
                  style={{
                    zIndex: 0,
                    position: "absolute",
                    left: "40%",
                    right: 0,
                    bottom: -40,
                  }}
                >
                  <Text
                    style={{
                      opacity: 0.2,
                      color: "rgb(145, 168, 209)",
                      fontSize: 200,
                      fontStyle: "italic",
                    }}
                  >
                    6
                  </Text>
                </View>
              </>
            ) : null}
          </View>
        </LinearGradient>
      </View>
    </TouchableHighlight>
  );
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
  blockContent: {
    justifyContent: "space-between",
    flex: 1,
  },
  blockContainer: {
    borderRadius: 30,

    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.3)",
    width: "44%",
    aspectRatio: 1,
    marginLeft: "4%",
    marginTop: "4%",
    backgroundColor: "rgb(240, 240, 240)",
  },
  date: {
    zIndex: 1,
  },
  month: {
    fontSize: 26,
    fontWeight: "500",
    color: "rgb(145, 168, 209)",
  },
  day: {
    fontSize: 26,
    fontWeight: "600",
    color: "black",
  },
  location: {
    fontSize: 17,
    fontWeight: "600",
    color: "black",
  },
  time: {
    fontSize: 20,
    fontWeight: "400",
    color: "gray",
  },
});
