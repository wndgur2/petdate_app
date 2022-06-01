import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut, tokenVar } from "../apollo";
import { USER_FRAGMENT } from "../fragments";

const ME_QUERY = gql`
  query getMe {
    getMe {
      ...UserFragment
    }
  }
${USER_FRAGMENT}
`;

export default function getMe() {
  const { data } = useQuery(ME_QUERY, {fetchPolicy: "no-cache" })
  return { data };
}