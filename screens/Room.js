import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Image, Text, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../colors";
import { Caption, CaptionText, ChatroomContainer, ExtraContainer } from "../components/auth/AuthShared";
import { USER_FRAGMENT } from "../fragments";
import { gql, useQuery } from "@apollo/client";
import useMe from "../hooks/useMe";

const Container = styled.View``;

export default function Room({ SN, users, messages}) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const lastMessage = messages[(messages.length)-1];

  const date = new Date();
  date.setTime(parseFloat(lastMessage.createdAt));

  const {data} = useMe();
  return (
    <Container>
      <ExtraContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Chatroom", {users, messages})}>
          <Caption>
            <CaptionText>{users[0].name === data.me.name ? users[1].name : users[0].name}</CaptionText>
            <CaptionText>{lastMessage.user.name}: {lastMessage.payload}</CaptionText>
            <CaptionText>{date.toLocaleDateString()+" "+date.toLocaleTimeString()}</CaptionText>
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