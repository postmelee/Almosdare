import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  Animated,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  InteractionManager,
} from "react-native";
import { SearchBar } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import { TabNavigator } from "react-navigation";
import { SharedElement } from "react-navigation-shared-element";
import CreateDareNavbar from "./createDareNavbar-component";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import Polyline from "@mapbox/polyline";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default class CreateDareSecondScreen extends React.Component {
  state = {
    isSearchBarFocused: false,
    searchBarY: new Animated.Value(0),
    popViewY: new Animated.Value(0),
    searchResult: [],
    input: null,
    latitude: null,
    longitude: null,
    error: null,
    locations: null,
    search: "",
    selectedAddress: "",
    selectedCoord: false,
    selectedMode: "",
    destLat: null,
    destLng: null,
    walkingCoords: false,
    bicyclingCoords: false,
    transitCoords: false,
  };
  constructor(props) {
    super(props);
  }
  static sharedElements = (navigation, otherNavigation, showing) => {
    if (navigation.name === "Second" && otherNavigation.name === "Third") {
      return [
        { id: "title" },
        { id: "header" },
        { id: "location" },
        { id: "date" },
        { id: "hour" },
        { id: "dot" },
        { id: "minute" },
        { id: "buttonLeft" },
        { id: "buttonRight" },
      ];
    } else if (
      navigation.name === "Second" &&
      otherNavigation.name === "First"
    ) {
      return [
        { id: "title" },
        { id: "header" },
        { id: "date" },
        { id: "hour" },
        { id: "dot" },
        { id: "minute" },
        { id: "buttonLeft" },
        { id: "buttonRight" },
      ];
    }
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
    this.getUserLocation();
  }

  onChangeSearch = (query) => {
    this.setState({ input: query });
    this.search(query);
  };

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("wokeeey");
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });

        console.log(this.state);
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 }
    );
  };
  search(search) {
    console.log("query " + search);
    fetch(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" +
        search +
        "&inputtype=textquery&fields=photos,formatted_address,name,geometry&key=AIzaSyCa7HkxMKkjhMf6Ze2QbxkQtBX-haPStkQ    "
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            searchResult: result.candidates,
          });
          // this.props.route.params.setNewDareLocation(result.candidates[0].name);
          // this.setState({
          //   destLat: result.candidates[0].geometry.location.lat,
          //   destLng: result.candidates[0].geometry.location.lng,
          //   place: result.candidates[0].name,
          //   address: result.candidates[0].formatted_address,
          //   input: this.props.route.params.getDareData().location,
          // });

          console.log("SEARCH", this.state.searchResult);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  mergeCoords = (destLat, destLng) => {
    const { latitude, longitude } = this.state;

    const hasStartAndEnd = latitude !== null && destLat !== null;

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`;
      const concatEnd = `${destLat},${destLng}`;
      this.getDirections(concatStart, concatEnd, "walking");
      this.getDirections(concatStart, concatEnd, "bicycling");
      this.getDirections(concatStart, concatEnd, "transit");
    }
  };

  async getDirections(startLoc, desLoc, mode) {
    console.log(startLoc, desLoc);

    try {
      const resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyCa7HkxMKkjhMf6Ze2QbxkQtBX-haPStkQ&mode=${mode}`
      );
      const respJson = await resp.json();
      console.log(respJson);
      if (respJson.status === "ZERO_RESULTS") {
        console.log("Can not find the direction");
        return -1;
      }
      const response = respJson.routes[0];
      const distanceTime = response.legs[0];
      const distance = distanceTime.distance.text;
      const time = distanceTime.duration.text;
      const points = Polyline.decode(
        respJson.routes[0].overview_polyline.points
      );
      const coords = points.map((point) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      if (mode === "transit") {
        this.setState({
          transitCoords: { coords, distance, time },
          selectedMode: "transit",
          selectedCoord: { coords, distance, time },
        });
      } else if (mode === "bicycling") {
        this.setState({
          bicyclingCoords: { coords, distance, time },
          selectedMode: "bicycling",
          selectedCoord: { coords, distance, time },
        });
      } else if (mode === "walking") {
        this.setState({
          walkingCoords: { coords, distance, time },
          selectedMode: "walking",
          selectedCoord: { coords, distance, time },
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  renderSearchView = () => {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "white",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          },
        ]}
      ></View>
    );
  };

  renderCoords = () => {};
  render() {
    const { time, distance, latitude, longitude, destination } = this.state;
    const coordColors = ["red", "green", "blue"];
    if (latitude) {
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

              <TouchableWithoutFeedback
                onPress={() => {
                  this.props.navigation.navigate("Second", {
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
          <View
            style={{
              flex: 1,
              width: "100%",
              zIndex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Animated.View
              style={[
                styles.searchBar,
                {
                  transform: [
                    {
                      translateY: this.state.searchBarY.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -100],
                      }),
                    },
                  ],
                },
              ]}
            >
              <SharedElement
                id="location"
                style={[
                  {
                    height: 45,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                    backgroundColor: "white",
                  },
                  this.state.isSearchBarFocused
                    ? { borderWidth: 1, borderColor: "grey" }
                    : {
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                        shadowOffset: {
                          height: 3,
                        },
                        shadowColor: "black",
                      },
                ]}
              >
                {this.state.isSearchBarFocused ? (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Animated.timing(this.state.searchBarY, {
                        toValue: 0,
                        delay: 0,
                        duration: 200,
                        useNativeDriver: false,
                      }).start();
                      this.setState({
                        isSearchBarFocused: false,
                      });
                      Keyboard.dismiss();
                    }}
                  >
                    <View
                      style={{
                        position: "absolute",
                        left: 5,
                        top: 0,
                        width: 45,
                        zIndex: 1,
                        aspectRatio: 1,
                        paddingTop: 7,
                        alignItems: "center",
                      }}
                    >
                      <AntDesign name="down" size={32} color="black" />
                    </View>
                  </TouchableWithoutFeedback>
                ) : null}

                <TextInput
                  style={[
                    styles.input,
                    this.state.isSearchBarFocused
                      ? { paddingLeft: 47 }
                      : { textAlign: "center" },
                  ]}
                  clearButtonMode={"while-editing"}
                  placeholder="Location"
                  placeholderTextColor="grey"
                  autoCapitalize="none"
                  numberOfLines={1}
                  onFocus={() => {
                    this.setState({
                      isSearchBarFocused: true,
                    });
                    Animated.timing(this.state.searchBarY, {
                      toValue: 1,
                      delay: 0,
                      duration: 200,
                      useNativeDriver: false,
                    }).start();
                    Animated.timing(this.state.popViewY, {
                      toValue: 0,
                      delay: 100,
                      duration: 200,
                      useNativeDriver: false,
                    }).start();
                  }}
                  onChangeText={this.onChangeSearch}
                  value={this.state.input}
                />
              </SharedElement>
            </Animated.View>
            {this.state.isSearchBarFocused ? (
              <View
                style={{
                  position: "absolute",
                  top: 0,

                  width: "100%",
                  height: Dimensions.get("screen").height,
                  zIndex: 1,
                  backgroundColor: "white",
                  borderBottomWidth: 1,
                  borderColor: "black",
                }}
              >
                <FlatList
                  contentContainerStyle={{
                    alignItems: "center",
                  }}
                  data={this.state.searchResult}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => {
                          this.mergeCoords(
                            item.geometry.location.lat,
                            item.geometry.location.lng
                          );
                          this.setState({
                            walkingCoords: false,
                            bicyclingCoords: false,
                            transitCoords: false,
                            selectedCoord: false,
                            selectedMode: "",
                            selectedAddress: item.formatted_address,
                            isSearchBarFocused: false,
                          });
                          Animated.timing(this.state.searchBarY, {
                            toValue: 0,
                            delay: 0,
                            duration: 200,
                            useNativeDriver: false,
                          }).start();
                          Animated.timing(this.state.popViewY, {
                            toValue: 1,
                            delay: 100,
                            duration: 200,
                            useNativeDriver: false,
                          }).start();
                        }}
                      >
                        <View
                          style={{
                            marginHorizontal: 7,
                            height: 55,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              height: 20,
                              lineHeight: 20,
                              marginTop: 14,
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              marginTop: 5,
                              fontSize: 15,
                              color: "rgb(130, 130, 130)",
                            }}
                          >
                            {item.formatted_address}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                ></FlatList>
              </View>
            ) : null}
            <MapView
              showsUserLocation
              provider="google"
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                paddingTop: 5,
              }}
              initialRegion={{
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {this.state.selectedCoord ? (
                <MapView.Polyline
                  strokeWidth={2}
                  strokeColor={"blue"}
                  coordinates={this.state.selectedCoord.coords}
                ></MapView.Polyline>
              ) : null}
            </MapView>
            <Animated.View
              style={{
                position: "absolute",
                flex: 1,
                width: "90%",

                borderRadius: 10,
                backgroundColor: "white",
                bottom: -130,
                padding: 5,
                paddingHorizontal: 10,
                shadowOpacity: 0.3,
                shadowRadius: 1,
                shadowOffset: {
                  height: 3,
                },
                shadowColor: "black",
                transform: [
                  {
                    translateY: this.state.popViewY.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -140],
                    }),
                  },
                ],
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  Animated.timing(this.state.popViewY, {
                    toValue: 0,
                    delay: 100,
                    duration: 200,
                    useNativeDriver: false,
                  }).start(() => {
                    this.setState({
                      walkingCoords: false,
                      bicyclingCoords: false,
                      transitCoords: false,
                      selectedCoord: false,
                      selectedMode: "",
                      selectedAddress: "",
                    });
                  });
                }}
                style={{
                  position: "absolute",
                  top: 5,
                  right: 7,
                  zIndex: 3,
                  aspectRatio: 1,
                }}
              >
                <View style={{ flex: 1 }}>
                  <AntDesign name="close" size={24} color="black" />
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "500",
                }}
              >
                Selected
              </Text>
              <Text
                style={{
                  color: "grey",
                  fontSize: 18,
                }}
              >
                {this.state.selectedAddress}
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  marginTop: 5,
                  paddingTop: 5,
                  borderTopWidth: 1,
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.walkingCoords) {
                      this.setState({
                        selectedCoord: this.state.walkingCoords,
                        selectedMode: "walking",
                      });
                    }
                  }}
                  style={{
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      opacity: this.state.selectedMode === "walking" ? 1 : 0.3,
                    }}
                  >
                    <MaterialIcons
                      name="directions-walk"
                      size={24}
                      color="black"
                    />
                    <Text>
                      {this.state.walkingCoords
                        ? this.state.walkingCoords.time
                        : "---"}
                    </Text>
                    <Text>
                      {this.state.walkingCoords
                        ? this.state.walkingCoords.distance
                        : "---"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.bicyclingCoords) {
                      this.setState({
                        selectedCoord: this.state.bicyclingCoords,
                        selectedMode: "bicycling",
                      });
                    }
                  }}
                  style={{
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      opacity:
                        this.state.selectedMode === "bicycling" ? 1 : 0.3,
                    }}
                  >
                    <MaterialIcons
                      name="directions-bike"
                      size={24}
                      color="black"
                    />
                    <Text>
                      {this.state.bicyclingCoords
                        ? this.state.bicyclingCoords.time
                        : "---"}
                    </Text>
                    <Text>
                      {this.state.bicyclingCoords
                        ? this.state.bicyclingCoords.distance
                        : "---"}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.transitCoords) {
                      this.setState({
                        selectedCoord: this.state.transitCoords,
                        selectedMode: "transit",
                      });
                    }
                  }}
                  style={{
                    width: "30%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      opacity: this.state.selectedMode === "transit" ? 1 : 0.3,
                    }}
                  >
                    <MaterialIcons
                      name="directions-bus"
                      size={24}
                      color="black"
                    />
                    <Text>
                      {this.state.transitCoords
                        ? this.state.transitCoords.time
                        : "---"}
                    </Text>
                    <Text>
                      {this.state.transitCoords
                        ? this.state.transitCoords.distance
                        : "---"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
          {this.state.isSearchBarFocused ? this.renderSearchView() : null}
        </View>
      );
    }
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

            <TouchableWithoutFeedback
              onPress={() => {
                this.props.navigation.navigate("Second", {
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
              <Text style={styles.titleTime}>
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

        <SharedElement id="location" style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            placeholderTextColor="black"
            autoCapitalize="none"
            onChangeText={this.onChangeSearch}
            value={this.state.input}
          />
        </SharedElement>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>We need your permission!</Text>
        </View>
      </View>
    );
  }
}

let { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    marginTop: 2,
    textAlignVertical: "center",
    fontWeight: "300",
    width: "97%",
    height: 45,
  },
  submitButton: {
    backgroundColor: "skyblue",
    padding: 10,
    margin: 15,
    height: 40,
    marginBottom: 0,
  },
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

    alignItems: "center",
    paddingTop: 45,
  },
  header: {
    height: 50,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 12,
  },
  headerButton: {
    fontSize: 20,
    fontWeight: "400",
    color: "#3465d9",
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
  },
  titleTime: {
    fontSize: 30,
    width: 50,
    color: "grey",
  },
  titleText: {
    fontSize: 25,
    fontWeight: "300",
  },
  titleTextFocus: {
    fontSize: 15,
    fontWeight: "300",
    color: "grey",
  },
  description: {
    fontSize: 25,
    margin: "3%",
  },
  listItem: {
    width: Dimensions.get("window").width * 0.85,

    height: 70,
    margin: 4,
    paddingHorizontal: 5,

    borderRadius: 10,

    backgroundColor: "rgb(240, 240, 240)",
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
  searchBar: {
    alignItems: "center",
    width: "95%",
    position: "absolute",
    top: 10,
    borderRadius: 5,

    zIndex: 3,
    height: 45,
    backgroundColor: "white",

    justifyContent: "center",
    alignItems: "center",
  },
});
