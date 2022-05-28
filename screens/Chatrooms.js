import React from "react";
import { Text, View } from "react-native";
import { colors } from "../colors";

export default function Chatrooms() {
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black" }}>Chatrooms will be here.</Text>
    </View>
  );
}