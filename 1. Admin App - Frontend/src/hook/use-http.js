import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //hàm gọi api
  const sendRequest = useCallback(async (option, cb) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(option.url, {
        method: option.method ? option.method : "GET",
        body: option.body ? JSON.stringify(option.body) : null,
        headers: option.headers ? option.headers : {},
      });

      const dataResponse = await response.json();
      if (response.status === 401) {
        throw new Error(dataResponse.message);
      }

      if (response.status !== 200) {
        throw new Error(dataResponse.message);
      }

      //gọi cb lấy data
      cb(dataResponse);
    } catch (err) {
      setIsLoading(false);
      setError(err.message || "Something is wrong!");
    }

    //loading end
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
