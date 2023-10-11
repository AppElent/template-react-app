import PropTypes from 'prop-types';
import { createContext, useContext, useReducer } from 'react';
import { reducer } from './caching';
import { useData } from './framework/useData';

export { useData } from './framework/useData';
export { useResource } from './framework/useResource';

import useFirestoreMount from './dataProviders/firestore/useFirestoreMount';

import useLocalStorageMount from './dataProviders/localStorage/useLocalStorageMount';
import useStateMount from './dataProviders/state/useStateMount';

export const GlobalDataContext = createContext();

export const useDataFramwork = (load = true) => {
  return useContext(load ? GlobalDataContext : undefined);
};

export let logger = () => {};

// const convertArrayToObject = (array, key) => {
//   const initialValue = {};
//   return array.reduce((obj, item) => {
//     return {
//       ...obj,
//       [item[key]]: item,
//     };
//   }, initialValue);
// };

export const DataFramework = ({ initialData, resources, logger: loggerfunc, children }) => {
  //_.set(initialData, 'data.settings.usersettings', usersettings);
  if (loggerfunc) logger = loggerfunc;

  const [data, dispatch] = useReducer(reducer, {
    ...initialData,
    resources: resources || [],
  });
  logger.log('Globaldata', data);
  // const object = convertArrayToObject(resources, 'name');
  // console.log(object);

  return (
    <GlobalDataContext.Provider value={{ ...data, dispatch }}>
      <DataFrameworkChild>{children}</DataFrameworkChild>
    </GlobalDataContext.Provider>
  );
};

DataFramework.propTypes = {
  children: PropTypes.any,
  initialData: PropTypes.any,
  logger: PropTypes.any,
  resources: PropTypes.array,
};

const DataFrameworkChild = ({ children }) => {
  const state = useData();
  const firestoreComponents = useFirestoreMount(state);
  const localStorageComponents = useLocalStorageMount(state);
  const stateComponents = useStateMount(state);

  return (
    <>
      {firestoreComponents}
      {localStorageComponents}
      {stateComponents}
      {children}
    </>
  );
};
