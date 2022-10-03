import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { queries } from '../queries';

export function useQueryData(query, variables, type) {
    const { loading, error, data } = useQuery(query, variables);
    const [result, setResult] = useState({ loading });
    const user = useUser();

    console.log(user)

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

export function useUser() {
    
    const [variables, setVariables] = useState({ username: '', token: '' });
    const { loading, error, data, refetch } = useQuery(queries['user'], variables);
    const [user, setUser] = useState({ loading });

    useEffect(() => {
        let storage = localStorage.getItem('compass');
        if (storage) {
            storage = JSON.parse(storage);
            setVariables({ username: storage.username, token: storage.token });
        }
    }, []);

    useEffect(() => {
        
        if (variables.username && variables.token) {
            console.log('refetching...', variables)
            refetch(variables);
        }
    }, [variables]);

    useEffect(() => {
        if (error) {
            setUser({ loading, error: error.message });
        } else {
            if (data && data.success) {
                setUser({ loading, error: null, data: data.user });
            }
        }
    }, [loading, error, data]);

    return user;
}