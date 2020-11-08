import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";
import Header from "./header-component";
import DareIcon from "./dareIcon-component";
import {
  StyleSheet,
  Animated,
  TouchableHighlight,
  Text,
  View,
} from "react-native";

export default function DareViewScreen({ route }) {
  let props = route.params.props;
  const headerScale = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0)).current;

  const containerScale = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(headerScale, {
      toValue: 1,
      delay: 310,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(titleScale, {
      toValue: 1,
      delay: 400,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(containerScale, {
      toValue: 1,
      delay: 1000,
      duration: 10,
      useNativeDriver: false,
    }).start();
  });
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.scale,
          {
            width: titleScale.interpolate({
              inputRange: [0, 0.6, 1],
              outputRange: ["44%", "72%", "100%"],
            }),
          },
        ]}
      >
        <View style={styles.block}>
          <View style={styles.date}>
            <SharedElement style={{}} id={props.id + "month"}>
              <Animated.Text
                style={[
                  styles.month,
                  {
                    fontSize: headerScale.interpolate({
                      inputRange: [0, 0.6, 0.9, 1],
                      outputRange: [26, 33, 41, 40],
                    }),
                  },
                ]}
              >
                {props.dareData.date.getMonth()}{" "}
                <Animated.Text
                  style={[
                    styles.day,
                    {
                      fontSize: headerScale.interpolate({
                        inputRange: [0, 0.6, 0.9, 1],
                        outputRange: [26, 33, 41, 40],
                      }),
                    },
                  ]}
                >
                  {props.dareData.date.getDate()}
                </Animated.Text>
              </Animated.Text>
            </SharedElement>
          </View>
          <View style={{ zIndex: 1 }}>
            <SharedElement id={props.id + "location"}>
              <Animated.Text
                numberOfLines={3}
                style={[
                  styles.location,
                  {
                    fontSize: titleScale.interpolate({
                      inputRange: [0, 0.6, 0.9, 1],
                      outputRange: [17, 24, 32, 31],
                    }),
                  },
                ]}
              >
                {props.dareData.location}
              </Animated.Text>
            </SharedElement>
            <SharedElement id={props.id + "time"}>
              <Animated.Text
                style={[
                  styles.time,
                  {
                    fontSize: titleScale.interpolate({
                      inputRange: [0, 0.6, 0.9, 1],
                      outputRange: [20, 23, 31, 30],
                    }),
                  },
                ]}
              >
                {props.dareData.date.getHours() +
                  ":" +
                  props.dareData.date.getMinutes()}
              </Animated.Text>
            </SharedElement>
          </View>
          <Animated.View>
            <Text style={{ color: "white" }}>TO JAMES: Google maps here!</Text>
          </Animated.View>
        </View>
      </Animated.View>
      <StatusBar style="light" />
    </View>
  );
}

DareViewScreen.sharedElements = (route, otherNavigation, showing) => {
  const props = route.params.props;
  return [
    { id: props.id + "go" },
    { id: props.id + "month" },
    { id: props.id + "day" },
    { id: props.id + "location" },
    { id: props.id + "time" },
    { id: "ak" },
  ];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  block: {
    flex: 1,
  },
  scale: {
    marginTop: 3,
    padding: 18,
    width: "44%",
    aspectRatio: 0.5,
    backgroundColor: "black",
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
    color: "white",
  },
  location: {
    fontSize: 17,
    fontWeight: "600",
    color: "white",
  },
  time: {
    fontSize: 20,
    fontWeight: "400",
    color: "gray",
  },
  person: {
    color: "white",
  },
  party: {
    width: "24%",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: 1,
    borderRadius: 100,
    backgroundColor: "rgb(123, 143, 163)",
  },
});
