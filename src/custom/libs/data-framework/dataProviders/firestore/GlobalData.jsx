import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useData } from '../../framework/useData';
import { ActionType } from '../../framework/ActionType';
import { addDoc, deleteDoc, doc, query, setDoc, updateDoc } from 'firebase/firestore';
import _ from 'lodash';

import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

const useFirestoreDocument = (query, options, process) => {
  const [values, loading, error, snapshot] = useDocument(query, options);
  const [valuesNew, setValuesNew] = useState();

  useEffect(() => {
    if (values) {
      const returnObject = {
        ...values.data(),
        id: values.id,
        //docRef: values.ref,
        meta: {
          type: values.ref.type,
          id: values.ref.id,
          path: values.ref.path,
        },
      };

      if (process) {
        const valueArray = process(returnObject);
      }

      setValuesNew(returnObject);
    } else {
      setValuesNew(values);
    }
  }, [values]);

  return [valuesNew, loading, error, snapshot];
};

const useFirestoreCollectionData = (query, options, process) => {
  const [values, loading, error, snapshot] = useCollection(query, options);
  const [valuesNew, setValuesNew] = useState();

  useEffect(() => {
    if (values) {
      let valueArray = [];
      values.forEach((value) => {
        const returnObject = {
          ...value.data(),
          id: value.id,
          //docRef: value.ref,
          meta: {
            type: value.ref.type,
            id: value.ref.id,
            path: value.ref.path,
          },
        };
        valueArray.push(returnObject);
      });

      if (process) {
        valueArray = process(valueArray);
      }

      setValuesNew(valueArray);
    } else {
      setValuesNew(values);
    }
  }, [values]);

  return [valuesNew, loading, error, snapshot];
};

//const firestoreKeys = ['collections', 'collectionObjects', 'documents', 'queries'];

const getQuery = (givenCollection, givenQuery) => {
  if (!givenCollection) return undefined;
  if (!givenQuery) return givenCollection;
  return query(givenCollection, ...givenQuery);
};

const GlobalData = ({ resource }) => {
  //useGlobalDataFirestoreCollection(storeKey);
  const { dispatch, ...globalData } = useData();
  let {
    query: givenQuery,
    options: givenOptions,
    collection: givenCollection,
    document: givenDocument,
  } = resource.options || {};
  // const resource = globalData.resources?.find(
  //   (resource) => resource.name === storeKey
  // );
  const type = resource.options.document ? 'document' : 'collection';
  givenQuery = givenQuery ? givenQuery : _.get(globalData, resource.name + '.options.query');
  givenOptions = givenOptions
    ? givenOptions
    : _.get(globalData, resource.name + '.options.options');
  givenCollection = givenCollection
    ? givenCollection
    : _.get(globalData, resource.name + '.options.collection');
  givenDocument = givenDocument
    ? givenDocument
    : _.get(globalData, resource.name + '.options.document');
  const newQuery =
    type === 'document'
      ? doc(givenCollection, givenDocument)
      : getQuery(givenCollection, givenQuery);

  const hooks = {
    collection: useFirestoreCollectionData,
    //collectionObjects: useFirestoreCollectionDataObject,
    document: useFirestoreDocument,
  };

  const meta = useMemo(() => {
    const metaObject = {
      dataProviderName: 'firestore',
    };
    if (type === 'document') {
      return {
        ...metaObject,
        path: doc(givenCollection, givenDocument).path,
        type: 'document',
      };
    }
    return { ...metaObject, path: givenCollection.path, type: 'collection' };
  }, [resource]);

  //const auth = getAuth();
  const [data, loading, error] = hooks[type](newQuery, givenOptions);

  //Update state on data change
  useEffect(() => {
    if (dispatch && data != undefined) {
      let newData = data;
      if (resource.options?.postProcess) {
        newData = resource.options.postProcess(data);
      }
      dispatch({
        type: ActionType.SET_DATA,
        payload: { key: 'data.' + resource.name + '.data', value: newData },
      });
    }
  }, [data]);

  useEffect(() => {
    if (dispatch && loading != undefined) {
      dispatch({
        type: ActionType.SET_DATA,
        payload: { key: 'data.' + resource.name + '.loading', value: loading },
      });
    }
  }, [loading]);

  useEffect(() => {
    if (dispatch && error != undefined) {
      dispatch({
        type: ActionType.SET_DATA,
        payload: { key: 'data.' + resource.name + '.error', value: error },
      });
    }
  }, [error]);

  useEffect(() => {
    if (dispatch && meta != undefined) {
      dispatch({
        type: ActionType.SET_DATA,
        payload: {
          key: 'data.' + resource.name + '.meta',
          value: meta,
        },
      });
    }
  }, [meta]);

  let actions = {};
  if (type === 'document') {
    actions = {
      set: async (value) => {
        const ref = doc(resource.options?.collection, resource.options?.document);
        if (ref) {
          return await setDoc(ref, value);
        }
      },
      update: async (value) => {
        const ref = doc(resource.options?.collection, resource.options?.document);
        if (ref) {
          return await updateDoc(ref, value);
        }
      },
      delete: async () => {
        const ref = doc(resource.options?.collection, resource.options?.document);
        if (ref) {
          return await deleteDoc(ref);
        }
      },
    };
  } else if (type === 'collection') {
    actions = {
      add: async (id, value) => {
        if (!_.isObject(id)) {
          return await setDoc(doc(resource.options?.collection, id), value);
        } else {
          return await addDoc(resource.options?.collection, id);
        }
      },
      set: async (id, value) => {
        console.log('trying to update', id, value);
        const ref = doc(resource.options?.collection, id);
        if (ref) {
          return await setDoc(ref, value);
        }
      },
      update: async (id, value) => {
        console.log('trying to update', id, value);
        const ref = doc(resource.options?.collection, id);
        if (ref) {
          return await updateDoc(ref, value);
        }
      },
      delete: async (id) => {
        console.log('deleting id', id);
        const ref = doc(resource.options?.collection, id);
        if (ref) {
          return await deleteDoc(ref);
        }
      },
    };
  }

  useEffect(() => {
    if (resource && dispatch) {
      dispatch({
        type: ActionType.UPDATE_RESOURCE,
        payload: {
          key: resource.name,
          value: {
            ...resource,
            actions,
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
