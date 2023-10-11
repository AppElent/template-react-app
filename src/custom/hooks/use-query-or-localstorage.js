import { useQueryParam } from 'use-query-params';
import useLocalStorage from './use-local-storage';
import { useEffect } from 'react';

const useQueryOrLocalStorage = (key, initialValue) => {
  const [getLS, setLS, deleteLS] = useLocalStorage(key, initialValue);
  const [, setQuery] = useQueryParam(key);

  useEffect(() => {
    setQuery(getLS);
  }, [getLS, setQuery]);

  // useEffect(() => {
  //   console.log(123, query, getLS);
  //   if (!query && getLS) setQuery(getLS);
  // }, []);

  return [getLS, setLS, deleteLS];
};

export default useQueryOrLocalStorage;
