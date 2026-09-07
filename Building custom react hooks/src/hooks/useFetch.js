import { useEffect, useState } from "react";

function useFetch(fetchFunction, initialValue) {

    const [facedData, setFacedData] = useState(initialValue);
    const [error, setError] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const places = await fetchFunction();
                setFacedData(places);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data' });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFunction]);


    return { facedData, error, isFetching, setFacedData };
}

export default useFetch;