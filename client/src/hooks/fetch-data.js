import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { queries } from '../queries';

export function useQueryData(variables, type) {
    const { loading, error, data } = useQuery(queries[type], variables);
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