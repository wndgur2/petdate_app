import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator, Header } from "@react-navigation/stack";
import UploadForm from "../screens/UploadForm";
import { screensEnabled, ScreenStackHeaderSubview } from "react-native-screens";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
    >
      <Tab.Screen name="Uploading" component={UploadForm} />
    </Tab.Navigator>
  );
}