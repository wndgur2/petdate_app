import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, {useState} from "react";
import { FlatList, Text, View } from "react-native";
import Post from "../components/Post";
import ScreenLayout from "../components/ScreenLayout";
import { colors } from "../colors";
import AuthButton from "../components/auth/AuthButton";
import { USER_FRAGMENT } from "../fragments";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Caption, CaptionText, CaptionText25, CaptionText50, ExtraContainer } from "../components/auth/AuthShared";
import { isLoggedInVar } from "../apollo";

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

  console.log(useReactiveVar(isLoggedInVar));
  const [refreshing, setRefreshing] = useState(false);
  return (
    <ScreenLayout loading={loading}>
      <ExtraContainer>
        <Caption>
          <CaptionText25>작성자</CaptionText25>
          <CaptionText50>목적</CaptionText50>
          <CaptionText25>장소/시간</CaptionText25>
        </Caption>
      </ExtraContainer>
      <FlatList
        onEnadReachedThreshold={0.02}
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