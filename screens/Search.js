import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";

export default function Search({navigation}) {
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    <Text>This is search bar</Text>
    </View>
  );
}