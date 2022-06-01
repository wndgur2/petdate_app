import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, KeyboardAvoSNingView, View } from "react-native";
import ScreenLayout from "../components/ScreenLayout";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import getMe from "../hooks/getMe";
import { colors } from "../colors";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomSN: Int, $userSN: Int) {
    sendMessage(payload: $payload, roomSN: $roomSN, userSN: $userSN) {
      ok
      error
      SN
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

export default function Chatroom({ route, navigation }) {
  const { data: meData } = getMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, error, SN },
      },
    } = result;
    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        SN,
        payload: message,
        user: {
          name: meData.getMe.name,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        id: 'Message:'+SN,
        fragment: gql`
          fragment NewMessage on Message {
            SN
            payload
            user {
              name
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        SN: `Room:${route.params.SN}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };
  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      SN: route?.params?.SN,
    },
  });
  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomSN: route?.params?.SN,
        },
      });
    }
  };
  useEffect(() => {
    register("message", { required: true });
  }, [register]);
  
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.talkingTo?.name}`,
    });
  }, []);
  const renderItem = ({ item: message }) => (
    <MessageContainer
      outGoing={message.user.name !== route?.params?.talkingTo?.name}
    >
      <Message>{message.payload}</Message>
    </MessageContainer>
  );
  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.reverse();
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.lightGreen }}
      behavior="padding"
      keyboardVerticalOffset={-150}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          style={{ width: "100%", marginVertical: 10 }}
          inverted
          ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
          data={messages}
          showsVerticalScrollIndicator={false}
          keyExtractor={(message) => "" + message.SN}
          renderItem={renderItem}
        />
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
              size={22}
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}