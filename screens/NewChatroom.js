import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, KeyboardAvoSNingView, Text, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import getMe from "../hooks/getMe";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const ROOM_UPDATES = gql`
  subscription roomUpdates($SN: Int!) {
    roomUpdates(SN: $SN) {
      SN
      payload
      user {
        name
      }
      read
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomSN: Int, $userSN: Int) {
    sendMessage(payload: $payload, roomSN: $roomSN, userSN: $userSN) {
      ok
      error
      messageSN
      roomSN
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($SN: Int!) {
    seeRoom(SN: $SN) {
      SN
      messages {
        SN
        payload
        user {
          name
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View`
  padding: 0px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Message = styled.Text`
  color: black;
  background-color: rgba(53, 78, 22, 0.3);
  padding: 5px 10px;
  overflow: hidden;
  border-radius: 10px;
  font-size: 16px;
  margin: 0px 10px;
`;
const TextInput = styled.TextInput`
  border: 1px solid rgba(53, 78, 22, 0.5);
  padding: 10px 20px;
  color: black;
  border-radius: 1000px;
  width: 90%;
  margin-right: 10px;
`;

const InputContainer = styled.View`
  width: 95%;
  margin-bottom: 50px;
  margin-top: 25px;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

export default function NewChatroom({ route, navigation }) {
  const { register, setValue, handleSubmit, getValues, watch } = useForm();

  useEffect(() => {
    register("message", { required: true });
  }, [register]);
  
  const [sendMessageMutation, {data, loading}] = useMutation(SEND_MESSAGE_MUTATION);

  const onValid = ({ message }) => {
    sendMessageMutation({
      variables: {
        payload: message,
        userSN: route?.params?.user?.SN,
      },
    });
    navigation.navigate("Chatroom", {talkingTo : route.params.user, SN : data.sendMessage.roomSN});
  };
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.lightGreen }}
      behavior="padding"
      keyboardVerticalOffset={-170}
    >
      <ScreenLayout loading={loading}>
        <InputContainer>
          <TextInput
            placeholderTextColor="rgba(53, 78, 22, 0.5)"
            placeholder="Write a message..."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
          />
          <SendButton
            onPress={handleSubmit(onValid)}
            disabled={!Boolean(watch("message"))}
          >
            <Ionicons
              name="send"
              color={
                !Boolean(watch("message"))
                  ? "rgba(53, 78, 22, 0.5)"
                  : "black"
              }
              size={25}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}