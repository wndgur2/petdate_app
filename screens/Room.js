import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Image, Text, useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../colors";
import { Caption, CaptionText, ChatroomContainer, ExtraContainer, TextG25 } from "../components/auth/AuthShared";
import { USER_FRAGMENT } from "../fragments";
import getMe from "../hooks/getMe";
import { logUserOut } from "../apollo";
import { Username } from "../components/Post";

const Container = styled.View``;

export default function Room({ SN, users, messages}) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const lastMessage = messages[(messages.length)-1];

  const date = new Date();
  date.setTime(parseFloat(lastMessage.createdAt));

  const {data:myData} = getMe();  
  const logOut = async()=>{await logUserOut();}

  if(!myData) {
    return (<View style={{backgroundColor:colors.lightGreen}}>
      <Text> getMe ERROR </Text>
      <TouchableOpacity onPress={logOut}><Text>로그아웃</Text></TouchableOpacity>
    </View>)
  }
  const talkingTo = (users[0].name === myData.getMe.name ? users[1] : users[0]);

  return (
    <Container>
      <ExtraContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Chatroom", {talkingTo, SN})}>
          <Caption>
            <Username>{talkingTo.name}</Username>
            <TextG25>{lastMessage.user.name}: {lastMessage.payload}</TextG25>
            <TextG25>{date.toLocaleDateString().slice(0,5)+"  "+date.toLocaleTimeString().slice(0,5)}</TextG25>
          </Caption>
        </TouchableOpacity>
      </ExtraContainer>
    </Container>
  );
}

Room.propTypes = {
  SN: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
  messages: PropTypes.array.isRequired,
};