import { useEffect, useState } from "react";

const useFetchApi = (typeApi, call) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataTempUser, setDataTempUser] = useState([]);
    const [dataTempOrder, setDataTempOrder] = useState([]);
    const getApi = async () => {
        setLoading(true);
        try {
            const response = await typeApi.getAll();
            setData(response);
            setDataTempUser(response.user);
            setDataTempOrder(response.order);
            setLoading(false);
        }
        catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getApi();
    }, [call])
    return {loading, data, dataTempUser, dataTempOrder }
}

export default useFetchApi;


/**
 * Custom hook
 * 1. Khái niệm
 *     - Là một function đặc biệt 
 *     - Và function này có thể gọi các hooks khác 
 *     - Trả về giá trị thay vì jsx
 * 2.Tại sao sử dụng
 *      - Khi có những đoạn code logic lặp đi lặp lại nhiều lần
 *      - Giúp clean Code
 * 3. Lưu ý
 *      - Phải bắt đầu bằng chữ use để React nhận biết đây là một React hooks
 *    
 * 1. 
 * 2. 
 */