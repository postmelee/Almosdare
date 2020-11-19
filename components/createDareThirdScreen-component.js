import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import { TabNavigator } from "react-navigation";
import { SharedElement } from "react-navigation-shared-element";
import CreateDareNavbar from "./createDareNavbar-component";

export default class CreateDareThirdScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <SharedElement
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
            height: 50,
          }}
          id="header"
        >
          <View style={styles.header}>
            <TouchableWithoutFeedback
              onPress={() => {
                console.log(this.props);
                this.props.navigation.goBack();
              }}
            >
              <View
                style={{
                  width: 100,
                }}
              >
                <Text style={styles.headerButton}>Back</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={{ fontSize: 20 }}>Date</Text>
            {this.state.selectedCoord ? (
              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate("Third", {
                    date: this.state.date,
                  });
                }}
              >
                <View
                  style={{
                    width: 100,
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={styles.headerButton}>Next</Text>
                </View>
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback
                onPress={() => {
                  alert("Choose a Location");
                }}
              >
                <View
                  style={{
                    width: 100,
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={[styles.headerButton, { color: "grey" }]}>
                    Next
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </SharedElement>

        <View style={styles.title}>
          <SharedElement id="date">
            <Text style={styles.titleTextFocus}>
              {this.props.route.params.date.toDateString()}
            </Text>
          </SharedElement>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <SharedElement id="hour">
              <Text style={[styles.titleTime, { textAlign: "right" }]}>
                {this.props.route.params.hour}
              </Text>
            </SharedElement>
            <SharedElement id="dot">
              <Text
                style={{
                  width: 10,
                  fontSize: 30,
                  textAlign: "center",
                  color: "grey",
                }}
              >
                :
              </Text>
            </SharedElement>
            <SharedElement id="minute">
              <Text style={styles.titleTime}>
                {this.props.route.params.minute}
              </Text>
            </SharedElement>
          </View>
        </View>
      </View>
    );
  }
}

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    height: "6%",
    backgroundColor: "white",
  },
  headerBox: {
    justifyContent: "center",
    marginTop: Math.round(Dimensions.get("window").height) / 22,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "400",
  },
  twoButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "12%",
    marginHorizontal: "5%",
  },
  title: {
    paddingVertical: 5,
    width: "100%",
    alignItems: "center",
    margin: 10,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "300",
  },
  description: {
    fontSize: 25,
    margin: "3%",
  },
  navbar: {
    flex: 0.1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "3%",
  },
  picker: {
    marginBottom: "11%",
  },
});
