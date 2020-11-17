import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet,
  ScrollView,
  Animated,
  Text,
  View,
  AsyncStorage,
  TouchableWithoutFeedback,
  Image
} from "react-native";

export default class UserInfoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      timeline: [],
    };

    this.getMyProfile = this.getMyProfile.bind(this);
    this.getMyTimeline = this.getMyTimeline.bind(this);
    this.patchMyProfileImage = this.patchMyProfileImage.bind(this);
    // this.pickImage = this.pickImage(this);
  }

  
  
  getColorByIdx = (idx) => {
    if (!idx) return "FFFFFF";

    let hash = 0;
    for (var i = 0; i < idx.length; i++) {
      hash = idx.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  };

  // rest api
  patchMyProfileImage = async (selectedImage) => {
    const formData = new FormData();
    formData.append('profileImage', selectedImage);

    const res = await (
      await fetch('https://almosdare.herokuapp.com/api/users/profileImage', {
        method: 'PATCH',
        headers: new Headers({
          Authorization: await AsyncStorage.getItem("userToken"),
          "Content-Type": "multipart/form-data",
        }),
        body: formData
      })
    ).json();

    if (res.result === 1)
      this.setState({
        profile: {
          idx: res.idx,
          id: res.id,
          nickname: res.nickname,
          profileImageUrl : res.profileImageUrl,
        },
      });
    else alert("[ERROR] getMyProfile : " + JSON.stringify(res));
  }
  getMyProfile = async () => {
    const res = await (
      await fetch("https://almosdare.herokuapp.com/api/users", {
        method: "GET",
        headers: new Headers({
          Authorization: await AsyncStorage.getItem("userToken"),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      })
    ).json();

    if (res.result === 1)
      this.setState({
        profile: {
          idx: res.idx,
          id: res.id,
          nickname: res.nickname,
          profileImageUrl : res.profileImageUrl,
        },
      });
    else alert("[ERROR] getMyProfile : " + JSON.stringify(res));
  };
  getMyTimeline = async () => {
    const res = await (
      await fetch("https://almosdare.herokuapp.com/api/timelines/100", {
        method: "GET",
        headers: new Headers({
          Authorization: await AsyncStorage.getItem("userToken"),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      })
    ).json();

    if (res.result === 1) this.setState({ timeline: res.data });
    else alert("[ERROR] getMyTimeline : " + JSON.stringify(res));
  };
  
  pickImage = async() => {
    const result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if(result.cancelled) return;

    const localUri = result.uri;
    const filename = localUri.split('/').pop();

    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    this.patchMyProfileImage({ uri: localUri, name: filename, type });
    return;
  };

  async componentDidMount() {
    await this.getMyProfile();
    await this.getMyTimeline();
    // alert("Timeline: " + JSON.stringify(this.state.timeline));
    // alert("profile: " + JSON.stringify(this.state.profile));

  }

  render() {
    const myProfile = this.state.profile;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>User</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.profile}>
            <TouchableWithoutFeedback onPress={() => {this.pickImage()}}>
              <View
                style={{
                  ...styles.profileIcon,
                  ...{
                    backgroundColor: `#${this.getColorByIdx(
                      myProfile === null ? "" : myProfile.idx
                    )}`,
                  },
                }}
              >
                { myProfile && myProfile.profileImageUrl ?
                  <Image source={{ uri: myProfile.profileImageUrl }} style={{ width: 200, height: 200 }} /> :
                  <Text style={styles.profileIconNickname}>
                    {myProfile === null ? "" : myProfile.nickname}
                  </Text>
                }
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.profileInfo}>
              <View style={styles.profileInfoTextView}>
                <Text style={{ fontSize: 20 }}>
                  id : {myProfile === null ? "" : myProfile.id}
                </Text>
              </View>
              <View style={styles.profileInfoTextView}>
                <Text style={{ fontSize: 20 }}>
                  nickname :{" "}
                  {myProfile === null ? "" : myProfile.nickname}
                </Text>
              </View>
              <View style={styles.profileInfoTextView}>
                <Text style={{ fontSize: 10 }}>
                  idx : {myProfile === null ? "" : myProfile.idx}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.logBox}>
            <View style={styles.logText}>
              <Text style={{ fontSize: 20 }}>timeline</Text>
            </View>
            <ScrollView style={styles.logContentBox}>
              {this.state.timeline.map((tl, i) => (
                <View key={i} style={styles.logContent}>
                  <Text style={{ fontSize: 11, color: "#437BD7" }}>
                    {tl.createdAt} :{" "}
                  </Text>
                  <Text style={{ fontSize: 11 }}>{tl.message}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    width: "100%",
    backgroundColor: "#bbb",
    padding: 10,
  },
  titleText: {
    fontSize: 40,
    marginLeft: "4%",
  },
  content: {
    width: "100%",
    flex: 1,
    padding: 10,
  },
  profile: {
    flexDirection: "row",
    padding: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  profileIcon: {
    flex: 30,
    aspectRatio: 1,
    borderRadius: 100000,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileIconNickname: {
    textAlign: "center",
    fontSize: 40,
  },
  profileInfo: {
    flex: 70,
  },
  profileInfoTextView: {
    padding: 5,
    paddingLeft: 20,
    borderRadius: 100000,
  },
  logBox: {
    flex: 1,
    padding: 10,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  logText: {
    padding: 10,
  },
  logContentBox: {
    flex: 1,
    padding: 13,
    width: "100%",
    borderRadius: 30,
    overflow: "visible",
    backgroundColor: "white",
    overflow: "hidden",
  },
  logContent: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
