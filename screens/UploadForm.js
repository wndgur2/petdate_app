import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_POST } from "../fragments";

const UPLOAD_POST_MUTATION = gql`
  mutation uploadPost($content: String!) {
    uploadPost(content: $content) {
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
  }, [register]);
  const onValid = ({ content }) => {
    uploadPostMutation({
      variables: {
        content,
      },
    });
  };
  return (
    <DismissKeyboard>
      <Container>
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="만남 목적"
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("content", text)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}