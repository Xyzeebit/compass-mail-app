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

export const DRAFTS = gql`
  query drafts($username: String!, $page: Int!) {
    drafts(username: $username, page: $page) {
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

export const SPAM = gql`
  query spam($username: String!, $page: Int!) {
    spam(username: $username, page: $page) {
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

export const TRASH = gql`
  query trash($username: String!, $page: Int!) {
    trash(username: $username, page: $page) {
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

export const MESSAGE = gql`
  query message($username: String!, $messageId: ID!) {
    message(username: $username, messageId: $messageId) {
      success
      error {
        name
        message
      }
      message {
        id
        from
        to
        subject
        body
        time
      }
    }
  }
`;

export const queries = {
    inbox: INBOX,
    user: USER,
    outbox: OUTBOX,
    starred: STARRED,
    drafts: DRAFTS,
    spam: SPAM,
    trash: TRASH,
    messageQL: MESSAGE
}