import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { logUserOut } from "../apollo";
import getMe from "../hooks/getMe";
import { CaptionText, Row } from "../components/auth/AuthShared";


export default function MyProfile({navigation}) {

  const { data:myData } = getMe();

  const logOut = async()=>{await logUserOut();}
  if(!myData) {
    return (<View style={{backgroundColor:colors.lightGreen}}>
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
      <Text style={{ color: "black", fontWeight:"900", fontSize:20, paddingBottom:50}}>내 프로필</Text>
      <Row><Text>아이디: </Text><CaptionText>{myData.getMe.id}</CaptionText></Row>
      <Row><Text>이름: </Text><CaptionText>{myData.getMe.name}</CaptionText></Row>
      <TouchableOpacity style={{padding:20}} onPress={logOut}><CaptionText>로그아웃</CaptionText></TouchableOpacity>
    </View>
  );
}