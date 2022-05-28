import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { gql, useMutation } from "@apollo/client";

export default function Post({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Post")}>
        <Text style={{ color: "black" }}>Post</Text>
      </TouchableOpacity>
    </View>
  );
}