import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { colors } from "../colors";

export default function Profile({ navigation, route }) {
  useEffect(() => {
    if (route?.params?.name) {
      navigation.setOptions({
        title: route.params.name,
      });
    }
  }, []);
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black" }}>Someones Profile</Text>
    </View>
  );
}