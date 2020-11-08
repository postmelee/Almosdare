import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { StyleSheet, Dimensions, Text, View, Animated } from "react-native";

export default function Header(props) {
  const imageOpacity = props.scrollY.interpolate({
    inputRange: [0, 53],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  return (
    <Animated.View style={[styles.header, { opacity: imageOpacity }]}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}>
          {props.index === 0 ? "Dare" : "Instant"}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 20,
    backgroundColor: "#eee",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  headerBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "400",
  },
});
