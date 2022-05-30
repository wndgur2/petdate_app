import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { gql, useMutation, useReactiveVar } from "@apollo/client";

export default function Post({ navigation, route }) {
  const user = route.params.user;
  const content = route.params.content;
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>{user.name}</Text>
      <Text>{content}</Text>
    </View>
  );
}