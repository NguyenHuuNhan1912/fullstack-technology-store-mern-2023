import { useEffect, useState } from "react";

const useFetchApi = (typeApi, call) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const getApi = async () => {
        setLoading(true);
        try {
            const response = await typeApi.getAll();
            console.log('call useFecthApi');
            setData(response);
            setLoading(false);
        }
        catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getApi();
    }, [call])
    return {loading, data}
}

export default useFetchApi;