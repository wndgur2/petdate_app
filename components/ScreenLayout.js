import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../colors";

export default function ScreenLayout({ loading, children }) {
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color="black" /> : children}
    </View>
  );
}