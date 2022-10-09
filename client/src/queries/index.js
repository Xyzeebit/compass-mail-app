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

export const USER = gql`
    query user($username: String, $token: String) {
        user(username: $username, token: $token) {
            success
            error {
                name
                message
            }
            user {
                id
                username
                firstName
                lastName
                email
                contacts {
                    name
                }
            }
        }
    }
`

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
            }
        }
    }
`;

export const OUTBOX = gql`
    query outbox($username: String!, $page: Int!) {
        outbox(username: $username, page: $page) {
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
            }
        }
    }
`;

export const STARRED = gql`
    query starred($username: String!, $page: Int!) {
        starred(username: $username, page: $page) {
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
            }
        }
    }
`;

export const queries = {
    inbox: INBOX,
    user: USER,
    outbox: OUTBOX,
    starred: STARRED,
}