import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";
import { colors } from "../colors";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  const { data } = useMe();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle:{backgroundColor:colors.lightBrown},
        activeTintColor: "white",
        showLabel: false,
        tabBarInactiveTintColor: "black",
        tabBarActiveBackgroundColor:colors.lightBrown,
        tabBarActiveTintColor:colors.darkGreen,
        tabBarInactiveBackgroundColor: colors.lightGreen,
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Post"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"pencil"} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="Chatrooms"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"chatbubbles"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Chatrooms" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MyProfile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName={"person"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="MyProfile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}