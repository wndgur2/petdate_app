import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";


export default function MyProfile({navigation}) {
  const { data } = useMe();

  const logOut = async()=>{await logUserOut()}
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black" }}>내 프로필</Text>
      <Text>{data.getMe.SN}</Text>
      <Text>{data.getMe.id}</Text>
      <Text>{data.getMe.name}</Text>
      <TouchableOpacity onPress={logOut}><Text>로그아웃</Text></TouchableOpacity>
    </View>
  );
}