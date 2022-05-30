import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    SN
    name
    id
  }
`;

export const MESSAGE_FRAGMENT = gql`
  fragment MessageFragment on Message {
    SN
    payload
    user
    room
    read
    createdAt
  }
`;

export const POST_FRAGMENT = gql`
  fragment PostFragment on Post{
    SN
    content
    user{
      id
      name
    }
    createdAt
    isMine
  }
`

export const FEED_POST = gql`
  fragment FeedPost on Post {
    ...PostFragment
    user {
      id
      name
    }
    content
    createdAt
    isMine
  }
  ${POST_FRAGMENT}
`;