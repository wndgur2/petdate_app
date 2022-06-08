import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../colors";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import getMe from "../hooks/getMe";
import { CaptionText, TextG, TextG50 } from "../components/auth/AuthShared";

export default function Post({ navigation, route }) {

  const { data:myData } = getMe();

  const logOut = async()=>{await logUserOut();}
  if(!myData) {
    return (<View style={{backgroundColor:colors.lightGreen}}>
      <Text> getMe ERROR </Text>
      <TouchableOpacity onPress={logOut}><Text>로그아웃</Text></TouchableOpacity>
    </View>)
  }

  const user = route.params.user;
  const content = route.params.content;
  const time = route.params.time;
  const location = route.params.location;

  const me = myData.getMe;
  const chat = ()=>{navigation.navigate("NewChatroom", {user, me})}
  
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "black", fontWeight:"700", fontSize:22, paddingBottom:30}}>게시글 상세</Text>
      <TextG>작성자: {user.name}</TextG>
      <TextG>목적: {content}</TextG>
      <TextG>시간: {time}</TextG>
      <TextG>장소: {location}</TextG>
      {user.name === myData.getMe.name ? <Text style={{padding:30}}>내 게시글입니다.</Text>:
      <TouchableOpacity onPress={chat} style={{padding:30}}><CaptionText>채팅하기</CaptionText></TouchableOpacity>}
    </View>
  );
}