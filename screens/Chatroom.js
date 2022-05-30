import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../colors";

export default function Chatroom({users, messages}) {
  return (
    <View
      style={{
        backgroundColor: colors.lightGreen,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
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
    </View>
  );
}