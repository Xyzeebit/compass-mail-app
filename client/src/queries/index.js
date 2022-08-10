import { gql } from "@apollo/client";

export const GET_USERNAME = gql`
  query getName {
    username
  }
`;

export const SIGN_IN = gql`
    mutation signin($input: SignInInput!) {
        signIn(input: $input) {
            success
            error {
                name
                message
            }
            user {
                id
                username
                token
            }
        }
    }
`;