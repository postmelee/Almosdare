import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  View,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import CreateDareNavbar from "./createDareNavbar-component";
import UserIcon from "./userIcon-component";
import * as Font from "expo-font";

const customFonts = {
  "OpenSansCondensed-Light": require("../assets/fonts/OpenSansCondensed-Light.ttf"),
  "NotoSansKR-Light": require("../assets/fonts/NotoSansKR-Light.otf"),
};

export default class CreateDareFirstScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "datetime",
      show: false,
      loaded: false,
      date: new Date(),
    };
  }
  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({
      show: Platform.OS === "ios",
      date: currentDate,
    });
  };

  showMode = (currentMode) => {
    this.setState({
      mode: currentMode,
      show: true,
    });
  };

  renderMinute = () => {
    let minute =
      this.state.date.getMinutes() < 10
        ? "0" + String(this.state.date.getMinutes())
        : String(this.state.date.getMinutes());
    return minute;
  };

  renderHour = () => {
    let hour = this.state.date.getHours();
    let noonStr = "";
    let hourStr = "";
    if (hour > 12) {
      if (hour > 21) {
        hourStr = String(hour - 12);
      } else {
        hourStr = "0" + String(hour - 12);
      }
      noonStr = "PM";
    } else if (hour < 10) {
      hourStr = "0" + String(hour);
      noonStr = "AM";
    } else {
      hourStr = String(hour);
      noonStr = "AM";
    }
    return {
      hourStr,
      noonStr,
    };
  };
  showDatepicker = () => {
    this.showMode("datetime");
  };

  showTimepicker = () => {
    this.showMode("time");
  };
  fetchData = async () => {
    await Font.loadAsync(customFonts);
    this.setState({
      loaded: true,
    });
  };
  componentDidMount() {
    this.fetchData();
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
                  hour: this.renderHour().hourStr,
                  minute: this.renderMinute(),
                  members: this.props.route.params.members,
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
        <View style={styles.body}>
          <View style={styles.title}>
            <SharedElement id="date">
              <Text style={styles.titleTextFocus}>
                {this.state.date.toDateString()}
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
                  {this.renderHour().hourStr}
                </Text>
              </SharedElement>
              <SharedElement id="dot">
                <Text style={{ width: 20, fontSize: 60, textAlign: "center" }}>
                  :
                </Text>
              </SharedElement>
              <SharedElement id="minute">
                <Text style={styles.titleTime}>{this.renderMinute()}</Text>
              </SharedElement>
            </View>
          </View>

          <View style={styles.picker}>
            <DateTimePicker
              testID="dateTimePicker"
              value={this.state.date}
              mode={this.state.mode}
              is24Hour={true}
              display="default"
              onChange={this.onChange}
            />
          </View>
          <SharedElement
            style={{
              position: "absolute",
              bottom: 50,
              left: 0,
              width: "100%",
            }}
            id="members"
          >
            <View style={styles.memberSection}>
              <FlatList
                showsHorizontalScrollIndicator={true}
                indicatorStyle={"dark"}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                data={this.props.route.params.members}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
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
                }}
              ></FlatList>
            </View>
          </SharedElement>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    flex: 1,
    alignItems: "center",
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
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "400",
  },
  button: {
    marginTop: "12%",
    alignItems: "center",
  },
  title: {
    paddingVertical: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 70,
  },
  titleTime: {
    fontSize: 60,
    width: 100,
  },
  titleText: {
    fontSize: 25,
    fontWeight: "300",
  },
  titleTextFocus: {
    fontSize: 35,
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
    position: "absolute",
    width: "100%",
    height: 220,
    top: (Dimensions.get("window").height - 44) / 2 - 90,
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
});
