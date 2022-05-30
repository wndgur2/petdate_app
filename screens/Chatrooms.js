import { gql, useQuery } from "@apollo/client";
import React, {useState} from "react";
import { FlatList, Text, View } from "react-native";
import Room from "./Room";
import ScreenLayout from "../components/ScreenLayout";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import { USER_FRAGMENT, MESSAGE_FRAGMENT } from "../fragments";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Caption, CaptionText, CaptionText25, CaptionText50, ExtraContainer } from "../components/auth/AuthShared";

const ROOMS_QUERY = gql`
query seeRooms {
  seeRooms {
      SN,
      users{ SN, name },
      messages{ user{...UserFragment}, payload, createdAt }
    }
  }
  ${USER_FRAGMENT}
`;

export default function Chatrooms() {
  const { data, loading, refetch, fetchMore } = useQuery(ROOMS_QUERY);
  
  const renderRoom = ({ item: room }) => {
    return <Room {...room} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
    <ExtraContainer>
      <Caption>
        <CaptionText>상대방</CaptionText>
        <CaptionText>최근채팅</CaptionText>
        <CaptionText>수신일</CaptionText>
      </Caption>
    </ExtraContainer>
      <FlatList
        onEnadReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeRooms?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.SN}
        renderItem={renderRoom}
      />
    </ScreenLayout>
  );
} 