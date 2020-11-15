import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import Swiper from "react-native-swiper";
import DareIcon from "./dareIcon-component";
import InstantIcon from "./instantIcon-component";
import Header from "./header-component";
import * as Animatable from "react-native-animatable";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SharedElement } from "react-navigation-shared-element";
import {
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  AsyncStorage,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { BlurView } from "expo-blur";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Stack = createStackNavigator();
const customFonts = {
  "OpenSansCondensed-Light": require("../assets/fonts/OpenSansCondensed-Light.ttf"),
  "NotoSansKR-Light": require("../assets/fonts/NotoSansKR-Light.otf"),
};
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      dareScrollY: new Animated.Value(0),
      instantScrollY: new Animated.Value(0),
      scrollY: new Animated.Value(0),
      scrollX: new Animated.Value(0),
      isBlured: false,
      isAccepted: false,
      isContentTop: true,
      isRefreshing: false,
      isMomentumScroll: false,
      isTouched: false,
      showIndicator: false,
      currentIndex: 0,
      dareViewHeight: 0,
      instantViewHeight: 0,
      selectedOffset: null,
      invitedDareList: [],
      invitedinstantList: [],
      pendingDareList: [
        {
          location: "돌고지",
          date: new Date(),
          pending: [
            { id: "5f9c907fac38d00017635332", name: "nick" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
          ],
          invited: [
            { id: "5f9c907fac38d00017635332", name: "tom" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
          ],
          _id: "5f9cdbf33865e400174459d7",
          createdAt: "2020-10-31T03:37:23.038Z",
          updatedAt: "2020-10-31T03:37:23.880Z",
          v: 0,
        },
        {
          location: "돌고지",
          date: new Date(),
          pending: [
            { id: "5f9c907fac38d00017635332", name: "nick" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
          ],
          invited: [
            { id: "5f9c907fac38d00017635332", name: "tom" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
          ],
          _id: "5f9cdbf33865e400174459d7",
          createdAt: "2020-10-31T03:37:23.038Z",
          updatedAt: "2020-10-31T03:37:23.880Z",
          v: 0,
        },
        {
          location: "돌고지",
          date: new Date(),
          pending: [
            { id: "5f9c907fac38d00017635332", name: "nick" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
          ],
          invited: [
            { id: "5f9c907fac38d00017635332", name: "tom" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
            { id: "5f9c907fac38d00017635332", name: "nick" },
          ],
          _id: "5f9cdbf33865e400174459d7",
          createdAt: "2020-10-31T03:37:23.038Z",
          updatedAt: "2020-10-31T03:37:23.880Z",
          v: 0,
        },
      ],
      pendingInstantList: [],
    };
    this.fetchData = this.fetchData.bind(this);
    this.renderBlurPopup = this.renderBlurPopup.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  fetchData = async () => {
    let token = await AsyncStorage.getItem("userToken");
    const url = "https://almosdare.herokuapp.com/api/appointments";
    fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: token,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        //alert(JSON.stringify(json))
        if (json.result === 1) {
          this.setState({
            invitedDareList: json.data.invitedDare,

            invitedinstantList: json.data.invitedInstant,
            pendingInstantList: json.data.pendingInstant,
          });
        } else {
          alert("ERROR");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Server Problem");
      });
    await Font.loadAsync(customFonts);
    this.setState({
      loaded: true,

      currentIndex: 0,
      scrollY: this.state.dareScrollY,
    });
  };

  onRefresh = () => {
    const wait = (timeout) => {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    };
    this.setState({
      isRefreshing: true,
    });
    wait(2000).then(() => {
      this.setState({
        isRefreshing: false,
      });
    });
  };
  renderBlurPopup() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            isBlured: !this.state.isBlured,
          });
        }}
      >
        <BlurView
          tint="light"
          intensity={90}
          style={[StyleSheet.absoluteFill, { position: "absolute", zIndex: 2 }]}
        >
          <Animatable.View
            style={{
              position: "absolute",
              top: 40,
              width: "100%",
              alignItems: "center",
            }}
            animation="bounceInDown"
          >
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={60}
              color="green"
            />
          </Animatable.View>
          <Animatable.View
            style={{
              width: "100%",
              position: "absolute",
              top: HEIGHT / 2 - WIDTH * 0.2,

              borderRadius: 40,
            }}
            animation={this.state.isBlured ? "fadeInUp" : null}
            delay={0}
            duration={300}
            useNativeDriver
          >
            <InstantIcon
              isPopup={true}
              id={0}
              setSelectedData={(data) => {
                this.setState({
                  selectedData: data,
                });
              }}
              instantData={this.state.selectedData}
              isBlured={this.state.isBlured}
              setIsBlured={(toggle) => {
                this.setState({
                  isBlured: toggle,
                });
              }}
            ></InstantIcon>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                marginTop: "7%",
              }}
            >
              <View
                style={{
                  marginHorizontal: 30,
                }}
              >
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons
                    name="ios-checkmark-circle-outline"
                    size={80}
                    color="black"
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginHorizontal: 30,
                }}
              >
                <TouchableOpacity>
                  <Ionicons name="ios-close-circle" size={80} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </BlurView>
      </TouchableWithoutFeedback>
    );
  }
  renderPagination = (index, total, context) => {
    //Animated.multiply(this.state.scrollY, -1);

    const translateY = this.state.scrollY.interpolate({
      inputRange: [-HEIGHT, 0, 53, HEIGHT],
      outputRange: [HEIGHT, 0, -53, -53],
      extrapolate: "clamp",
    });
    const translateX = this.state.scrollX.interpolate({
      inputRange: [0, WIDTH],
      outputRange: [0, WIDTH / 2],
      extrapolate: "clamp",
    });
    const imageOpacityLeft = this.state.scrollX.interpolate({
      inputRange: [0, WIDTH],
      outputRange: [1, 0.2],
      extrapolate: "clamp",
    });
    const imageOpacityRight = this.state.scrollX.interpolate({
      inputRange: [0, WIDTH],
      outputRange: [0.2, 1],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        style={{
          backgroundColor: "rgb(240, 240, 240)",
          position: "absolute",
          top: 113,
          left: 0,
          width: "100%",
          flexDirection: "row",
          paddingVertical: 5,
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderBottomWidth: 1,
          transform: [{ translateY: translateY }],
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this.swiperRef.scrollTo(0);
          }}
        >
          <Animated.View
            style={{
              width: "50%",
              paddingLeft: "2%",
              alignItems: "center",
              opacity: imageOpacityLeft,
            }}
          >
            <Entypo name="flash" size={30} color="black" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            this.swiperRef.scrollTo(1);
          }}
        >
          <Animated.View
            style={{
              width: "50%",
              paddingRight: "2%",
              alignItems: "center",
              opacity: imageOpacityRight,
            }}
          >
            <Entypo name="clock" size={30} color="black" />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            width: "50%",
            position: "absolute",
            bottom: 0,
            left: 0,
            borderBottomWidth: 2,
            borderColor: "black",
            transform: [{ translateX: translateX }],
          }}
        ></Animated.View>
      </Animated.View>
    );
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.loaded) {
      return (
        <View style={styles.container}>
          <Header
            scrollY={this.state.scrollY}
            index={this.state.currentIndex}
          ></Header>
          {this.state.isBlured === true ? this.renderBlurPopup() : null}

          <Swiper
            style={{
              marginTop: 60,
            }}
            ref={(ref) => (this.swiperRef = ref)}
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      x: this.state.scrollX,
                    },
                  },
                },
              ],
              { useNativeDriver: false }
            )}
            renderPagination={this.renderPagination}
            loop={false}
            onIndexChanged={(index) => {
              if (index === 0 && this.state.currentIndex === 1) {
                this.setState({
                  scrollY: this.state.dareScrollY,
                  currentIndex: 0,
                });
              } else if (index === 1 && this.state.currentIndex === 0) {
                this.setState({
                  scrollY: this.state.instantScrollY,
                  currentIndex: 1,
                });
              }
            }}
            showsHorizontalScrollIndicator={false}
          >
            <ScrollView
              style={{
                flex: 1,
              }}
              ref={(ref) => {
                this.dareRef = ref;
              }}
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.state.dareScrollY,
                      },
                    },
                  },
                ],
                {
                  listener: (event) => {
                    if (event.nativeEvent.contentOffset.y < 0) {
                    }
                    if (
                      event.nativeEvent.contentOffset.y === 0 &&
                      this.state.currentIndex === 0
                    ) {
                      this.instantRef.scrollTo({ y: 0 });
                    } else if (this.state.currentIndex === 0) {
                      this.instantRef.scrollTo({
                        y:
                          event.nativeEvent.contentOffset.y > 53
                            ? 53
                            : event.nativeEvent.contentOffset.y,
                        animated: false,
                      });
                    }
                  },
                  useNativeDriver: false,
                }
              )}
            >
              <View
                style={{
                  flex: 1,
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
                onLayout={(event) => {
                  if (
                    event.nativeEvent.layout.height !== HEIGHT + 3 &&
                    event.nativeEvent.layout.height !==
                      this.state.dareViewHeight
                  ) {
                    this.setState({
                      dareViewHeight: event.nativeEvent.layout.height,
                    });
                  }
                }}
              >
                <View
                  style={{
                    width: "100%",
                    paddingBottom: 51,
                    paddingLeft: 8,
                    zIndex: 2,
                    backgroundColor: "rgb(240, 240, 240)",
                  }}
                >
                  <Text style={styles.titleText}>Dare</Text>
                </View>
                {this.state.pendingDareList.map((dareData, i) => {
                  return (
                    <DareIcon
                      id={i}
                      key={"DareIcon" + i}
                      dareData={dareData}
                      isStarted={false}
                    />
                  );
                })}
                <View
                  style={{
                    width: "100%",
                    height: 100,
                  }}
                ></View>
                <View
                  style={{
                    width: "100%",
                    height: HEIGHT - this.state.dareViewHeight + 3,
                  }}
                ></View>
              </View>
            </ScrollView>
            <ScrollView
              style={{
                flex: 1,
              }}
              ref={(ref) => (this.instantRef = ref)}
              scrollEventThrottle={16}
              scrollIndicatorInsets={{
                top: 100,
                right: 0,
                left: 0,
                bottom: 60,
              }}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { y: this.state.instantScrollY },
                    },
                  },
                ],
                {
                  listener: (event) => {
                    if (
                      event.nativeEvent.contentOffset.y === 0 &&
                      this.state.currentIndex === 1
                    ) {
                      this.dareRef.scrollTo({ y: 0 });
                    } else if (this.state.currentIndex === 1) {
                      this.dareRef.scrollTo({
                        y:
                          event.nativeEvent.contentOffset.y > 53
                            ? 53
                            : event.nativeEvent.contentOffset.y,
                        animated: false,
                      });
                    }
                  },
                  useNativeDriver: false,
                }
              )}
            >
              <View
                style={{ flex: 1, flexWrap: "wrap", flexDirection: "row" }}
                onLayout={(event) => {
                  if (
                    event.nativeEvent.layout.height !== HEIGHT + 3 &&
                    event.nativeEvent.layout.height !==
                      this.state.instantViewHeight
                  ) {
                    this.setState({
                      instantViewHeight: event.nativeEvent.layout.height,
                    });
                  }
                }}
              >
                <View
                  style={{
                    width: "100%",
                    marginBottom: 51,
                    paddingLeft: 8,
                    backgroundColor: "rgb(240, 240, 240)",
                  }}
                >
                  <Text style={styles.titleText}>Instant</Text>
                </View>
                {this.state.pendingInstantList.map((instantData, i) => {
                  return (
                    <InstantIcon
                      key={"InstantIcon" + i}
                      id={i}
                      instantData={instantData}
                      isPopup={false}
                      isBlured={this.state.isBlured}
                      setSelectedData={(data) => {
                        this.setState({
                          selectedData: data,
                        });
                      }}
                      setIsBlured={(toggle) => {
                        this.setState({
                          isBlured: toggle,
                        });
                      }}
                    />
                  );
                })}
                <View
                  style={{
                    width: "100%",
                    height: 100,
                  }}
                ></View>
                <View
                  style={{
                    width: "100%",
                    height: HEIGHT - this.state.instantViewHeight + 3,
                  }}
                ></View>
              </View>
            </ScrollView>
          </Swiper>

          <StatusBar style="dark" />
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
    backgroundColor: "rgb(240, 240, 240)",
  },
  titleText: {
    lineHeight: 45,
    fontSize: 40,
    marginLeft: "4%",
    fontFamily: "NotoSansKR-Light",
  },
  content: {
    width: "100%",
    flex: 0.6,
    flexDirection: "row",
    flexWrap: "wrap",

    alignItems: "center",
  },
  list: {
    marginTop: "4%",
    flexDirection: "row",
  },
  dot: {
    backgroundColor: "rgba(52, 101, 217, .4)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
    marginVertical: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#3465d9",
    height: 8,
    marginHorizontal: 5,
    borderRadius: 4,
    marginVertical: 3,
  },
});
