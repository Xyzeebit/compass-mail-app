import { gql } from "@apollo/client";

export const GET_USERNAME = gql`
  query getName {
    username
  }
`;

export const SIGN_IN = gql`
    mutation signIn($input: SignInInput!) {
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

export const SIGN_UP = gql`
    mutation signUp($input: SignUpInput!) {
        signUp(input: $input) {
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

export const INBOX = gql`
    query inbox($username: String!, $page: Int!) {
        inbox(username: $username, page: $page) {
            success
            error {
                name
                message
            }
            messages {
                id
                from
                to
                time
                subject
                body
            }
        }
    }
`;