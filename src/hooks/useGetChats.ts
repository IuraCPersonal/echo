import { useQuery } from "@apollo/client";
import { graphql } from "../gql";

const getChatsDocuments = graphql(`
  query Chats {
    chats {
      ...ChatFragment
    }
  }
`);

const useGetChats = () => {
  return useQuery(getChatsDocuments);
};

export { useGetChats };
