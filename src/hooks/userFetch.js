import { useState, useEffect } from "react";

const useFetch = (url, deps = []) => {
  const api = useAxios();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    api
      .get(url)
      .then((res) => isMounted && setData(res.data))
      .catch((err) => isMounted && setError(err))
      .finally(() => isMounted && setLoading(false));

    return () => (isMounted = false);
  }, deps);

  return { data, loading, error };
};

export default useFetch;
