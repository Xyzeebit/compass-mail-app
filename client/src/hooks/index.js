import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { queries } from '../queries';

export function useQueryMail(username, type, page) {
    const { loading, error, data } = useQuery(queries[type], { variables: { username, page } });

    return { loading, error, data };
}

export function useUser(username, token) {
    const { loading, error, data } = useQuery(queries['user'], { variables: { username, token } });

    return {loading, error, data};
}

export function useMessage(username, messageId) {
    const { loading, error, data } = useQuery(queries['messageQL'], { variables: { username, messageId } });

    return { loading, error, data };
}

export function useMark(username, messageId, mark) {
    const [markAs, { loading, error, data }] = useMutation(queries['mark']);
    
    useEffect(() => {
        markAs({ variables: { username, messageId, mark } });
    }, [mark, messageId, username, markAs]);

    return { loading, error, data };
}