import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

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
    }, [loading, data]);

    return result;
}