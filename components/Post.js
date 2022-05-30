import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Image, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../colors";
import { Caption, CaptionText, CaptionText25, CaptionText50, ExtraContainer, Text25, Text50, TextG25, TextG50, TextLightG50 } from "./auth/AuthShared";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0px;
  padding-bottom: 0px;
`;
const Username = styled.Text`
  width:25%;
  color: ${colors.darkGreen} ;
  font-weight: 600;
`;

function Post({ SN, user, content}) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <ExtraContainer>
        <TouchableOpacity onPress={() => navigation.navigate("Post",{user, content})}>
          <Caption>
            <Username>{user.name}</Username>
            <TextLightG50>{content}</TextLightG50>
            <Text25>장소/시간</Text25>
          </Caption>
        </TouchableOpacity>
      </ExtraContainer>
    </Container>
  );
}

Post.propTypes = {
  SN: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  content: PropTypes.string.isRequired,
};
export default Post;