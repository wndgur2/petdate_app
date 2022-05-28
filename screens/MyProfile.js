import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { logUserOut } from "../apollo";
import useMe from "../hooks/useMe";


export default function MyProfile({navigation}) {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.name,
    });
  }, []);
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
      <TouchableOpacity onPress={logOut}><Text>로그아웃</Text></TouchableOpacity>
    </View>
  );
}