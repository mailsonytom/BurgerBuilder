import { useState, useEffect } from "react";

export default httpClient => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState(null);

  const reqInterceptors = httpClient.interceptors.request.use((req) => {
    setError(null);
    return req;
  });

  const resInterceptors = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setError(err);
    }
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    httpClient.interceptors.request.eject(reqInterceptors);
    httpClient.interceptors.response.eject(resInterceptors);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqInterceptors, resInterceptors]);

  // eslint-disable-next-line no-undef
  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};
