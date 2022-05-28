import { gql, useQuery } from "@apollo/client";
import React, {useState} from "react";
import { FlatList, Text, View } from "react-native";
import Post from "../components/Post";
import ScreenLayout from "../components/ScreenLayout";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import { USER_FRAGMENT } from "../fragments";
import { TouchableOpacity } from "react-native-gesture-handler";

const FEED_QUERY = gql`
query seeFeed($offset: Int!) {
  seeFeed(offset: $offset) {
      SN
      user {
        ...UserFragment
      }
      content
    }
  }
  ${USER_FRAGMENT}
`;

export default function Feed() {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
    const renderPost = ({ item: post }) => {
    return <Post {...post} />;
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <Text>작성자 제목</Text>
      <FlatList
        onEndReachedThreshold={0.02}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: "100%" }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed}
        keyExtractor={(post) => "" + post.SN}
        renderItem={renderPost}
      />
    </ScreenLayout>
  );
} 