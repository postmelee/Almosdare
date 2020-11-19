import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Animated,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Dimensions,
  AsyncStorage,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import UserIcon from "./userIcon-component";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";
import * as Font from "expo-font";

const customFonts = {
  "OpenSansCondensed-Light": require("../assets/fonts/OpenSansCondensed-Light.ttf"),
  "NotoSansKR-Light": require("../assets/fonts/NotoSansKR-Light.otf"),
};

export default class CreateDareFirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      appType: "Dare",
      userData: null,
      modalVisible: false,
      loadingVisible: false,
      loadingMessage: "Sending...",
      query: null,
      queryResult: null,
      searchSuggest: false,
      members: [],
      listItems: [
        {
          idx: 0,
        },
        {
          idx: "5f9c4bab4513240017fc0d10",
          id: "01047574218",
          password: "xzaL46T9mo1zBvu2",
          salt:
            "4umSK47qiTH3Me6NslPqmY9JdJd/Ershtixuv9BgVKEyUdrA/xhvSCAJ+cx1CnDYn+x+yWIVqh3u32Dn68V8rQ==",
          nickname: "Admin",
          createdAt: "2020-10-30T17:21:47.875Z",
          updatedAt: "2020-10-30T17:21:47.875Z",
          __v: 0,
        },
        {
          idx: "5f9c76427e18780017f4f8fc",
          id: "admin",
          password: "TLb5lf6eSWeLco43",
          salt:
            "L2v++0xvTEYiYbvoTzOUaZCRxmR+tZppIMDkyBUoyptij9+uz+RMfUGd75LVxg3rjkDgI3C0zF8bA3H60mHR4g==",
          nickname: "admin",
          createdAt: "2020-10-30T20:23:30.798Z",
          updatedAt: "2020-10-30T20:23:30.798Z",
          __v: 0,
        },
        {
          idx: "5f9c7ced7e18780017f4f8fd",
          id: "01012345678",
          password: "xEWxQnGwo4UEkMFR",
          salt:
            "UvieEiDL0/CH3EXp+kPURCGAVnfwhvwZqSj3/n7ayf/bzJPCudZdb+TuulXFz42zh+/Wj3ZBoBq/0jCdiRUQlg==",
          nickname: "test",
          createdAt: "2020-10-30T20:51:57.617Z",
          updatedAt: "2020-10-30T20:51:57.617Z",
          __v: 0,
        },
        {
          idx: "5f9c907fac38d00017635332",
          id: "01085517809",
          password: "uqKMQm0p/ClRJUcb",
          salt:
            "PJmnHhsBGbGN1RFnfR5HY1jFllYkOspfGhm+xXbDmnmzhsm7wB275ikYlIwUkpZHbtD6xIxtEA/qbLj8JddrPQ==",
          nickname: "oh jun seo",
          createdAt: "2020-10-30T22:15:27.478Z",
          updatedAt: "2020-10-30T22:15:27.478Z",
          __v: 0,
        },
        {
          idx: "5fa9104c51bb0d0018b641de",
          id: "01055246822",
          password: "zGOmU+sWFnPUag36",
          salt:
            "dDwySDD+4xxqNq/Rwdnu6BiCdYVL192jmC/MYCISrLOCJEYQayLG/gq1/eTkve1Ds2vtyG6gagU/oYaD7Gd2Ig==",
          nickname: "coco",
          createdAt: "2020-11-09T09:47:56.804Z",
          updatedAt: "2020-11-09T09:47:56.804Z",
          __v: 0,
        },
        {
          idx: "5fad3cc5ed182b0018868fee",
          id: "01011111111",
          password: "NMoJla7Igx/i1ZL4",
          salt:
            "Gjw+NcWPs5Mahx+PgpEt1uI6jtrxfDttNU7S58a6JHvzc0kmIuzLZIi+cc2uxKKCI/yEpynof9uCUDP2PivCCQ==",
          nickname: "test1",
          createdAt: "2020-11-12T13:46:45.931Z",
          updatedAt: "2020-11-12T13:46:45.931Z",
          __v: 0,
        },
        {
          idx: "5fad3cd5ed182b0018868ff0",
          id: "01022222222",
          password: "tqrKsqYKVqhYrwvc",
          salt:
            "872OeIFWUPdQFmbwJmvC0i1ko2RsnECWo/AD/hTGg4TWaPVsXcp7VGPWOF9rt3ldSNCU7LxBaYKR0XaplGHMtA==",
          nickname: "test2",
          createdAt: "2020-11-12T13:47:01.795Z",
          updatedAt: "2020-11-12T13:47:01.795Z",
          __v: 0,
        },
        {
          idx: "5fad3ce5ed182b0018868ff2",
          id: "01033333333",
          password: "lsXQJmTpdYmgFUQ/",
          salt:
            "LV9DHzVE1iNQuQYxM4AwHPvm7x79/CkCKRV0gqN3uNEU1Rja87nxdTUhaq+aKgGfSMljn4Zy54K7y6kZuhSnog==",
          nickname: "test3",
          createdAt: "2020-11-12T13:47:17.189Z",
          updatedAt: "2020-11-12T13:47:17.189Z",
          __v: 0,
        },
        {
          idx: "5fad3cf8ed182b0018868ff4",
          id: "01044444444",
          password: "U+jAQv4WXVV6hGpV",
          salt:
            "u/y5nv7M3NDlDnvjgfist2VyRbD1Xd8huWUcqbc95aSSPFECPUD+OXxvQof7yUft1HmTg6zZbMzRKdQSA16xeQ==",
          nickname: "test4",
          createdAt: "2020-11-12T13:47:36.200Z",
          updatedAt: "2020-11-12T13:47:36.200Z",
          __v: 0,
        },
        {
          idx: "5fad3d03ed182b0018868ff6",
          id: "01055555555",
          password: "IqGGH8I8RG3gSZU4",
          salt:
            "HCgKC2AYg2ZVZwL/jCRuakMyU38xEAU4dJuQmyej+ceEhB3rbAeTWLp44vpmxPf+ncU2v5KfEEX7qnB/29+dwg==",
          nickname: "test5",
          createdAt: "2020-11-12T13:47:47.095Z",
          updatedAt: "2020-11-12T13:47:47.095Z",
          __v: 0,
        },
        {
          idx: "5fad3d0aed182b0018868ff8",
          id: "01066666666",
          password: "rQL/G61o6mn+/vrv",
          salt:
            "xY1QrER4nm+D7jU5rlnAmF/Fhd80q90o/QWcjyUnxi67AwjqJu8ThqAhPtNEcMQLQbXl6f96PC47njETmVFltA==",
          nickname: "test6",
          createdAt: "2020-11-12T13:47:54.814Z",
          updatedAt: "2020-11-12T13:47:54.814Z",
          __v: 0,
        },
        {
          idx: "5fad3d11ed182b0018868ffa",
          id: "01077777777",
          password: "OORSWEKZD50EV330",
          salt:
            "C8ebzU4AKIXEds3lOGIZPDjpNhxF9L2yS+WrcHyuxzqM+8hCU4PZ6P/lOSiDsFtyXhFxH4O2ypdva97JU4LajA==",
          nickname: "test7",
          createdAt: "2020-11-12T13:48:01.787Z",
          updatedAt: "2020-11-12T13:48:01.787Z",
          __v: 0,
        },
        {
          idx: "5fad3d1aed182b0018868ffc",
          id: "01088888888",
          password: "P4CTF+JRejP7ea22",
          salt:
            "QbQhXMVhT5oCqOmpAsmQRe1hPeG19AuKTPYpIB/Q6X3I6JTAzOOS5eW43NDnY65sR+zdjB4mQZ+o32EwzACVjA==",
          nickname: "test8",
          createdAt: "2020-11-12T13:48:10.375Z",
          updatedAt: "2020-11-12T13:48:10.375Z",
          __v: 0,
        },
        {
          idx: "5fad3d21ed182b0018868ffe",
          id: "01099999999",
          password: "wx9P6BFzzfsLE6hc",
          salt:
            "cS6vNRgCf1Lu1gOQmtJojDJxsbmOqLo45Ae3k1HkHdS1rvGLj62doAOyg+ODVjupeKSxJotdA3P7os87WFPIng==",
          nickname: "test9",
          createdAt: "2020-11-12T13:48:17.512Z",
          updatedAt: "2020-11-12T13:48:17.512Z",
          __v: 0,
        },
      ],
      navbarX: new Animated.Value(0),
    };
  }

  static sharedElements = (navigation, otherNavigation, showing) => {
    return [{ id: "members" }, { id: "header" }];
  };

  fetchData = async () => {
    this.getUsers();
    await Font.loadAsync(customFonts);
    this.setState({
      loaded: true,
    });
  };
  getUsers = async () => {
    let token = await AsyncStorage.getItem("userToken");
    return fetch("https://almosdare.herokuapp.com/api/users", {
      method: "GET",
      headers: new Headers({
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.result === 1) {
          this.setState({
            userData: json,
            members: [...this.state.members, json],
          });
        } else {
          alert("ERROR");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  removeMember(userData) {
    const arr = this.state.members;
    const index = arr.indexOf(userData);
    if (index > -1) {
      arr.splice(index, 1);
    }
    this.setState({
      members: arr,
    });
  }

  addMember(newMember) {
    const arr = this.state.members;
    if (arr.some((e) => e.idx === newMember.idx)) {
      alert("This User is in members");
      return -1;
    } else {
      this.setState({
        members: [newMember, ...this.state.members],
        // memberNicknames: [...this.state.memberNicknames, this.state.queryResult.nickname]
      });
      return 1;
    }
  }
  createInstant = () => {
    if (this.state.members.length < 2) {
      alert("You need to invited at least 1 person");
      return;
    }
    const members = this.state.members;
    const index = members.indexOf(this.state.userData);
    if (index > -1) {
      members.splice(index, 1);
    }
    this.props.navigation.navigate("HomeView", {
      newInstantData: {
        members,
      },
      newInstantReq: true,
    });
  };

  async searchUserById(id) {
    if (!id) {
      return;
    }
    let token = await AsyncStorage.getItem("userToken");
    const url = "https://almosdare.herokuapp.com/api/users/id/" + id;

    return fetch(url, {
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
          this.setModalVisible(true);
          this.setState({
            queryResult: json,
          });
        } else {
          alert("Can't find the User");
          this.setState({
            queryResult: null,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Server Problem");
      });
  }

  render() {
    const { modalVisible, loadingVisible } = this.state;
    console.log(this.props.route);
    if (this.state.loaded) {
      return (
        <View style={styles.container}>
          <Modal
            style={styles.loadingModal}
            animationType="fade"
            visible={loadingVisible}
            onShow={() => {
              this.animation.play(0, 120);
            }}
          >
            <View style={styles.loadingView}>
              <Text style={styles.loadingTitle}>
                {this.state.loadingMessage}
              </Text>
              <LottieView
                ref={(animation) => {
                  this.animation = animation;
                }}
                style={{
                  width: 400,
                  height: 400,
                  backgroundColor: "#eee",
                }}
                source={require("../assets/loading.json")}
              />
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalImg}></View>
                <Text style={styles.modalText}>
                  {this.state.queryResult ? this.state.queryResult.id : "None"}
                </Text>
                <Text style={styles.modalName}>
                  {this.state.queryResult
                    ? this.state.queryResult.nickname
                    : "None"}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 20 }}>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#b0c4de" }}
                    onPress={() => {
                      this.addMember(this.state.queryResult);
                      this.setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Add</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#b0c4de" }}
                    onPress={() => {
                      this.setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
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
                  this.props.navigation.goBack();
                }}
              >
                <View
                  style={{
                    width: 100,
                  }}
                >
                  <EvilIcons name="close" size={37} color="black" />
                </View>
              </TouchableWithoutFeedback>
              <Text style={{ fontSize: 20 }}>{this.state.appType}</Text>
              {this.state.appType === "Dare" ? (
                <TouchableWithoutFeedback
                  onPress={() => {
                    const members = this.state.members;
                    const index = members.indexOf(this.state.userData);
                    if (index > -1) {
                      members.splice(index, 1);
                    }
                    this.props.navigation.navigate("First", {
                      members: members,
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
                    this.createInstant();
                  }}
                >
                  <View
                    style={{
                      width: 100,
                      alignItems: "flex-end",
                    }}
                  >
                    <Text style={styles.headerButton}>Done</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            </View>
          </SharedElement>
          <View style={styles.title}>
            <Text style={styles.titleText}>Create</Text>

            <Text style={styles.descriptionText}>
              Choose members to create an appointment.
            </Text>
          </View>
          <SharedElement style={{ width: "100%" }} id="members">
            <View style={styles.memberSection}>
              <FlatList
                showsHorizontalScrollIndicator={true}
                indicatorStyle={"dark"}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                data={this.state.members}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  if (item == this.state.userData) {
                    return (
                      <TouchableOpacity style={styles.memberIcon}>
                        <View
                          style={{
                            width: 90,
                            aspectRatio: 1,
                            alignItems: "center",
                          }}
                        >
                          <UserIcon id={"1"} username={""} fontSize={20} />
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              marginTop: 5,
                              fontSize: 15,
                              textAlign: "center",
                            }}
                          >
                            {item.nickname}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  } else {
                    return (
                      <TouchableOpacity
                        style={styles.memberIcon}
                        onPress={() => {
                          this.removeMember(item);
                        }}
                      >
                        <View
                          style={{
                            width: 90,
                            aspectRatio: 1,
                            alignItems: "center",
                          }}
                        >
                          <UserIcon id={"1"} username={""} fontSize={20} />
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              marginTop: 5,
                              fontSize: 15,
                              textAlign: "center",
                            }}
                          >
                            {item.nickname}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                }}
              ></FlatList>
            </View>
          </SharedElement>
          <View
            style={{
              width: "93%",
              alignItems: "center",
              marginTop: 9,
              zIndex: 1,
              shadowOffset: {
                height: -5,
              },
              shadowColor: "white",
              shadowRadius: 2,
              shadowOpacity: 0.5,
            }}
          >
            <View style={styles.searchBar}>
              <TextInput
                clearButtonMode={"always"}
                keyboardType={"phone-pad"}
                style={styles.searchInput}
                placeholder="Search"
                onChangeText={(text) => {
                  if (text !== "") {
                    this.setState({
                      searchSuggest: true,
                      query: text,
                    });
                  } else {
                    this.setState({
                      searchSuggest: false,
                      query: text,
                    });
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.content}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center", paddingTop: 7 }}
              data={this.state.listItems}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                if (item.idx === 0) {
                  return this.state.searchSuggest ? (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => {
                        this.searchUserById(this.state.query);
                      }}
                    >
                      <View style={{ marginLeft: 7 }}>
                        <Text
                          style={{ fontSize: 15, color: "rgb(130, 130, 130)" }}
                        >
                          Search:
                        </Text>
                        <Text style={{ paddingLeft: 2, fontSize: 20 }}>
                          {this.state.query}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  );
                } else {
                  return this.state.members.some((e) => e.idx === item.idx) ? (
                    <TouchableOpacity
                      style={[
                        styles.listItem,
                        {
                          borderColor: "grey",
                          borderWidth: 1,
                          backgroundColor: "rgb(220, 220, 220)",
                        },
                      ]}
                      onPress={() => {
                        this.removeMember(item);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View style={{ width: 60, aspectRatio: 1 }}>
                          <UserIcon id={"1"} username={""} fontSize={20} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 20,
                            }}
                          >
                            {item.nickname}
                          </Text>
                          <Text
                            style={{
                              color: "rgb(130, 130, 130)",
                            }}
                          >
                            Hi everyone, It's me melee!
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.listItem,
                        {
                          borderColor: "black",
                          borderWidth: 1,
                          shadowColor: "black",
                          shadowOffset: {
                            height: 1,
                            width: 1,
                          },
                          shadowRadius: 1,
                          shadowOpacity: 1,
                        },
                      ]}
                      onPress={() => {
                        this.addMember(item);
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          backgroundColor: "rgb(240, 240, 240)",
                        }}
                      >
                        <View style={{ width: 60, aspectRatio: 1 }}>
                          <UserIcon id={"1"} username={""} fontSize={20} />
                        </View>
                        <View style={{ marginLeft: 10 }}>
                          <Text
                            style={{
                              fontSize: 20,
                            }}
                          >
                            {item.nickname}
                          </Text>
                          <Text
                            style={{
                              color: "rgb(130, 130, 130)",
                            }}
                          >
                            Hi everyone, It's me melee!
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
              }}
            ></FlatList>
          </View>
          <View style={styles.navbar}>
            <Animated.View
              style={{
                position: "absolute",
                width: Dimensions.get("window").width / 2,
                borderWidth: 1,
                borderColor: "black",
                top: 0,
                left: 0,
                transform: [
                  {
                    translateX: this.state.navbarX.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, Dimensions.get("window").width / 2],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              }}
            />

            <TouchableOpacity
              style={styles.navbarButton}
              onPress={() => {
                this.setState({
                  appType: "Dare",
                });
                Animated.timing(this.state.navbarX, {
                  toValue: 0,
                  delay: 0,
                  duration: 200,
                  useNativeDriver: false,
                }).start();
              }}
            >
              <Animated.View
                style={{
                  width: "100%",
                  alignItems: "center",

                  opacity: this.state.navbarX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.1],
                    extrapolate: "clamp",
                  }),
                }}
              >
                <Entypo name="clock" size={30} color="black" />
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.navbarButton}
              onPress={() => {
                this.setState({
                  appType: "Instant",
                });
                Animated.timing(this.state.navbarX, {
                  toValue: 1,
                  delay: 0,
                  duration: 200,
                  useNativeDriver: false,
                }).start();
              }}
            >
              <Animated.View
                style={{
                  width: "100%",
                  alignItems: "center",

                  opacity: this.state.navbarX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.1, 1],
                    extrapolate: "clamp",
                  }),
                }}
              >
                <Entypo name="flash" size={30} color="black" />
              </Animated.View>
            </TouchableOpacity>
          </View>
          <StatusBar hidden={true} />
        </View>
      );
    } else {
      return <View></View>;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  loadingView: {
    flex: 1,
    backgroundColor: "rgb(238,238,238)",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingModal: {
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingTitle: {
    fontSize: 40,
    fontWeight: "300",
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    width: "100%",

    justifyContent: "space-evenly",

    borderRadius: 50,
    borderColor: "black",
    shadowOffset: {
      height: 5,
    },
    zIndex: 1,
    backgroundColor: "rgb(240, 240, 240)",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    paddingHorizontal: 12,
    height: 50,
  },
  headerButton: {
    fontSize: 20,
    fontWeight: "400",
    color: "#3465d9",
  },
  searchInput: {
    height: 40,
    paddingLeft: 9,
    width: "97%",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
    width: "100%",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 1,
    height: 45,
  },
  navbarButton: {
    elevation: 2,
    alignItems: "center",
    width: "50%",
  },
  memberIcon: {
    height: 90,
    width: 90,
    marginHorizontal: 10,
    alignItems: "center",
  },
  memberSection: {
    width: "100%",
    height: 110,

    borderColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: 1,
  },
  modalImg: {
    width: "70%",
    aspectRatio: 1,
    backgroundColor: "blue",
    borderRadius: 500,
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    paddingVertical: 10,
    marginTop: 33,
    width: "100%",
    alignItems: "center",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "300",
    fontFamily: "NotoSansKR-Light",
  },
  descriptionText: {
    textAlign: "center",
    fontSize: 15,
    color: "grey",
    fontWeight: "300",
    fontFamily: "NotoSansKR-Light",
  },
  listItem: {
    width: Dimensions.get("window").width * 0.85,

    height: 70,
    margin: 4,
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "rgb(240, 240, 240)",
  },
  searchButton: {
    alignContent: "center",
    justifyContent: "center",
    width: 60,
    height: 42,
    borderRadius: 20,
    elevation: 2,
  },
  openButton: {
    width: 100,
    height: 40,
    backgroundColor: "#b0c4de",
    borderRadius: 10,
    padding: 3,
    elevation: 2,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
  },
  modalText: {
    marginVertical: 4,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "300",
  },
  modalName: {
    marginVertical: 10,
    fontSize: 30,
    textAlign: "center",
  },
});
