import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useData } from '../../framework/useData';
import { ActionType } from '../../framework/ActionType';

function useLocalStorage(key, initialValue) {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = () => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  // Return a wrapped version of useState's setter function that ...
  // ... deletes the new value from localStorage.
  const deleteValue = () => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === 'undefined') {
      console.warn(
        `Tried deleting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      // Delete from LocalStorage
      window.localStorage.removeItem(key);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    // this only works for other documents, not the current one
    window.addEventListener('storage', handleStorageChange);

    // this is a custom event, triggered in writeValueToLocalStorage
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, []);

  return [storedValue, setValue, deleteValue];
}

const GlobalData = ({ resource }) => {
  //useGlobalDataFirestoreCollection(storeKey);
  const { dispatch, ...globalData } = useData();

  const meta = useMemo(() => {
    const metaObject = {
      dataProviderName: 'localStorage',
    };
    return { ...metaObject, name: resource.name };
  }, [resource]);

  //const auth = getAuth();
  const [data, setValue, deleteValue] = useLocalStorage(resource.key);

  //Update state on data change
  useEffect(() => {
    if (dispatch && data != undefined) {
      const newData = {
        data,
      };
      if (resource.options?.postProcess) {
        newData.data = resource.options.postProcess(data);
      }
      dispatch({
        type: ActionType.SET_DATA,
        payload: { key: 'data.' + resource.name, value: newData },
      });
    }
  }, [data]);

  useEffect(() => {
    if (resource && dispatch) {
      dispatch({
        type: ActionType.UPDATE_RESOURCE,
        payload: {
          key: resource.name,
          value: {
            ...resource,
            actions: {
              set: setValue,
              update: setValue,
              delete: deleteValue,
            },
          },
        },
      });
    }
  }, []);

  return <></>;
};

GlobalData.propTypes = {
  resource: PropTypes.shape({
    name: PropTypes.string,
    options: PropTypes.any,
  }),
};

export default GlobalData;
