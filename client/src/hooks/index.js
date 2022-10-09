import { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useQuery } from "@apollo/client";
import { queries } from '../queries';

export function useQueryData(query, variables, type) {
    const { loading, error, data } = useQuery(query, variables);
    const [result, setResult] = useState({ loading });

    useEffect(() => {
        if (error) {
            setResult({ loading, error });
        } else {
            if (data && data[type]) {
                setResult({ loading, error: null, data: data[type] });
            } else {
                setResult({ loading, error });
            }
        }
    }, [loading, error, data]);

    return result;
}

export function useQueryMail(username, type, page) {
    const { loading, error, data } = useQuery(queries[type], { variables: { username, page } });

    return { loading, error, data };
}

export function useUser(username, token) {
    const { loading, error, data } = useQuery(queries['user'], { variables: { username, token } });

    return {loading, error, data};
}