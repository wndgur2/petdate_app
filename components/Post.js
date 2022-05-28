import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Image, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../colors";

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  
  padding: 10px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0px;
  padding-bottom: 0px;
`;
const Userid = styled.Text`
  color: black ;
  font-weight: 400;
`;
const Username = styled.Text`
  color: ${colors.darkGreen} ;
  font-weight: 600;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: black ;
  font-weight: 800;
  margin-left: 5px;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

function Post({ SN, user, content}) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  return (
    <Container>
    <Header onPress={() => navigation.navigate("SProfile")}>
      <Userid>{user.id}</Userid>
      </Header>
      <ExtraContainer>
        <Caption>
          <TouchableOpacity onPress={() => navigation.navigate("SProfile")}>
            <Username>{user.name}</Username>
          </TouchableOpacity>
          <CaptionText>{content}</CaptionText>
        </Caption>
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