import { useQuery } from "@apollo/client";
import { queries } from '../queries';

export function useQueryMail(username, type, page) {
    const { loading, error, data } = useQuery(queries[type], { variables: { username, page } });

    return { loading, error, data };
}

export function useUser(username, token) {
    const { loading, error, data } = useQuery(queries['user'], { variables: { username, token } });

    return {loading, error, data};
}