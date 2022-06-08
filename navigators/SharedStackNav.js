import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Post from "../screens/PostDetail";
import Profile from "../screens/Profile";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Chatrooms from "../screens/Chatrooms";
import MyProfile from "../screens/MyProfile";
import { Image } from "react-native";
import { colors } from "../colors";
import Chatroom from "../screens/Chatroom";
import NewChatroom from "../screens/NewChatroom";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          borderBottomColor: "rgba(255, 255, 255, 0.3)",
          shadowColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name={"SFeed"}
          component={Feed}
          options={{
            headerShown: false,
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name={"SSearch"} component={Search} options={{ headerShown: false, }} />
      ) : null}
      {screenName === "Chatrooms" ? (
        <Stack.Screen name={"SChatrooms"} component={Chatrooms} options={{ headerShown: false }} />
      ) : null}
      {screenName === "MyProfile" ? <Stack.Screen name={"SMyProfile"} component={MyProfile} options={{ headerShown: false }} /> : null}
      <Stack.Screen name="SProfile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Post" component={Post} options={{ headerShown: false }}/>
      <Stack.Screen name="Chatroom" component={Chatroom} options={{ headerShown: false }}/>
      <Stack.Screen name="NewChatroom" component={NewChatroom} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
