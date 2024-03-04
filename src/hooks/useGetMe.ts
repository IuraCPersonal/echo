import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

export const getMeDocument = graphql(`
  query Me {
    me {
      ...UserFragment
    }
  }
`);

const useGetMe = () => {
  return useQuery(getMeDocument, {
    refetchWritePolicy: "overwrite",
  });
};

export { useGetMe };
