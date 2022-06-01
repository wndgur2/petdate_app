import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { logUserOut } from "../apollo";
import getMe from "../hooks/getMe";


export default function MyProfile({navigation}) {
  
  const { data:myData } = getMe();

  const logOut = async()=>{await logUserOut();}
  if(!myData) {
    return (<View>
      <Text> getMe ERROR </Text>
      <TouchableOpacity onPress={logOut}><Text>로그아웃</Text></TouchableOpacity>
    </View>)
  }
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
      <Text>{myData.getMe.SN}</Text>
      <Text>{myData.getMe.id}</Text>
      <Text>{myData.getMe.name}</Text>
      <TouchableOpacity onPress={logOut}><Text>로그아웃</Text></TouchableOpacity>
    </View>
  );
}