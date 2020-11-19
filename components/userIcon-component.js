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
  Image,
} from "react-native";

export default function UserIcon(props) {
  const navigation = useNavigation();

  const randomColor = (index) => {
    const colors2020 = [
      "rgb(59, 85, 132)",
      "rgb(160, 142, 131)",
      "rgb(123, 131, 134)",
      "rgb(112, 142, 189)",
    ];
    const colors2019 = [
      "rgb(28, 76, 71)",
      "rgb(113, 106, 80)",
      "rgb(156, 150, 64)",
      "rgb(74, 73, 68)",
      "rgb(241, 112, 103)",
      "rgb(167, 96, 107)",
    ];
    const colors2018 = [
      "rgb(29, 128, 172)",
      "rgb(107, 94, 150)",
      "rgb(251, 177, 69)",
      "rgb(213, 67, 101)",
      "rgb(242, 121, 54)",
      "rgb(181, 109, 162)",
      "rgb(196, 145, 108)",
      "rgb(210, 179, 94)",
    ];

    const pallet = [colors2018, colors2019, colors2020];

    return pallet[index % 3][
      Math.floor(Math.random() * pallet[index % 3].length)
    ];
  };
  //props should have
  //  date = {month, day}, location=String(""), time=String("xx:xx xm"), member = []
  return (
    <View
      style={{
        flex: 1,
        aspectRatio: 1,
        borderWidth: 2,
        borderRadius: 100,
        padding: 2,
        borderColor: "rgb(145, 168, 209)",
      }}
    >
      {props.profileImageUrl ? (
        <Image
          source={{ uri: props.profileImageUrl }}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: 1,
            padding: 7,
            borderRadius: 100,
            marginRight: 11,
          }}
        ></Image>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: 1,
            padding: 7,
            borderRadius: 100,
            backgroundColor: randomColor(props.id),
            marginRight: 11,
          }}
        >
          <Text
            style={{
              color: "black",
              fontSize: props.fontSize,
              textAlign: "center",
            }}
            allowFontScaling
            adjustsFontSizeToFit={true}
            minimumFontScale={0.5}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {props.username}
          </Text>
        </View>
      )}
    </View>
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
