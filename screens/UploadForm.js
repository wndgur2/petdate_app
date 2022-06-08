import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_POST } from "../fragments";

const UPLOAD_POST_MUTATION = gql`
  mutation uploadPost($content: String!, $time: String!, $location: String!) {
    uploadPost(content: $content, time: $time, location: $location) {
      ok
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.lightGreen};
  padding: 0px 50px;
`;
const CaptionContainer = styled.View`
  margin-top: 90px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;
export default function UploadForm({ route, navigation }) {
  const updateUploadPost = (cache, result) => {
    const {
      data: { uploadPost },
    } = result;
    if (uploadPost.ok) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [uploadPost, ...prev];
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };
  const [uploadPostMutation, { loading }] = useMutation(
    UPLOAD_POST_MUTATION,
    {
      update: updateUploadPost,
    }
  );
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("content");
    register("time");
    register("location");
  }, [register]);

  const onValid = ({content, time, location}) => {
    uploadPostMutation({
      variables: {
        content,
        time,
        location,
      },
    });
  };

  const timeRef = useRef();
  const locationRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  return (
    <DismissKeyboard>
      <Container>
        <CaptionContainer>
          <Caption
            returnKeyType="next"
            placeholder="만남 목적"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={() => onNext(timeRef)}
            onChangeText={(text) => setValue("content", text)}
          />
          <View style={{height:20,}}/>
          <Caption
            ref={timeRef}
            placeholder="시간"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            returnKeyType="next"
            style={{ backgroundColor: "white", width: "100%" }}
            onSubmitEditing={() => onNext(locationRef)}
            onChangeText={(text) => setValue("time", text)}
          />
          <View style={{height:20,}}/>
          <Caption
            ref={locationRef}
            placeholder="장소"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            returnKeyType="done"
            style={{ backgroundColor: "white", width: "100%" }}
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("location", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}