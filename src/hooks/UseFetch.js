import React, { useEffect, useState } from 'react'
import { fetchDataFromApi } from '../services/Api'


export const useFetch = (url) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);
        fetchDataFromApi(url).then(resp => {
            setLoading(false);
            setData(resp);
        }).catch(error => {
            setLoading(false);
            setError("somthing went wrong");
        })
    }, [url]);

    return { data, loading, error }
}