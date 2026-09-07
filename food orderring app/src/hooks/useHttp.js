import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

async function sendHTTPRequest(url, config) {
    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error("Failed to fetch meals");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

function useHttp(url, config, inititalData) {
    const [data, setdata] = useState(inititalData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(
        async function sendRequest() {
            setIsLoading(true);
            setError(null);
            try {
                const data = await sendHTTPRequest(url, config);
                setdata(data);
            } catch (error) {
                setError(error.message || 'Something went wrong!');
            }
            setIsLoading(false);
        }, [url, config]
    )
    useEffect(() => {
        if (config && config.method === 'GET' || !config.method || !config)
            sendRequest()
    }, [sendRequest, config]);
    return { data, isLoading, error, sendRequest };
}
export default useHttp;