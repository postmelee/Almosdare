import { StatusBar } from "expo-status-bar";
import React from "react";
import HomeScreen from "./components/homeScreen-component";
import DareViewScreen from "./components/dareViewScreen-component";
import CreateDareScreen from "./components/createDareScreen-component";
import UserInfoScreen from "./components/userInfoScreen";
import StartingScreen from "./components/startingScreen-component";
import InitialScreen from "./components/initialScreen-component";
import LocationView from "./components/locationView-component";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  View,
  Dimensions,
} from "react-native";
import Home from "./components/homeScreen-component";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const HomeStack = createSharedElementStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen({ route, navigation }) {
  return (
    <HomeStack.Navigator initialRouteName="HomeView">
      <HomeStack.Screen
        name="HomeView"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      ></HomeStack.Screen>
      <HomeStack.Screen
        name="DareView"
        component={DareViewScreen}
        options={() => ({
          headerShown: false,
          transitionSpec: {
            open: { animation: "timing", config: { duration: 300 } }, //150
            close: { animation: "timing", config: { duration: 0 } },
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress,
              },
            };
          },
        })}
      ></HomeStack.Screen>
    </HomeStack.Navigator>
  );
}

function TabNavigation({ route, navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "appstore1" : "appstore-o";
            return <AntDesign name={iconName} size={24} color={color} />;
          } else if (route.name === "Create") {
            return <AntDesign name={"plus"} size={24} color={color} />;
          } else if (route.name === "User") {
            iconName = focused ? "user-circle" : "user-circle-o";
            return <FontAwesome name={iconName} size={24} color={color} />;
          }

          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: "#eee",
          height: 50,
          paddingVertical: 5,
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderTopWidth: 1,
        },
        showLabel: false,
        activeTintColor: "black",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen}></Tab.Screen>
      <Tab.Screen
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("CreateDareScreen");
          },
        })}
        name="Create"
        component={CreateDareScreen}
      ></Tab.Screen>
      <Tab.Screen name="User" component={UserInfoScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator
          mode="modal"
          headerMode="none"
          initialRouteName="InitialScreen"
          screenOptions={{
            gestureEnabled: false,
          }}
        >
          <RootStack.Screen
            name="Main"
            component={TabNavigation}
          ></RootStack.Screen>
          <RootStack.Screen
            name="CreateDareScreen"
            component={CreateDareScreen}
          ></RootStack.Screen>
          <RootStack.Screen
            name="StartingScreen"
            component={StartingScreen}
          ></RootStack.Screen>
          <RootStack.Screen
            name="InitialScreen"
            component={InitialScreen}
          ></RootStack.Screen>
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.1,
    backgroundColor: "#aaa",
    justifyContent: "center",
    alignItems: "center",
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
    flex: 0.6,
    flexDirection: "row",
    flexWrap: "wrap",

    alignItems: "center",
  },
  navbar: {
    flex: 0.1,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
});
