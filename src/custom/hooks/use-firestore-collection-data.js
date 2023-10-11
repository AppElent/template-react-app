import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

export const useFirestoreCollectionData = (query, options, process) => {
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
  }, [values, process]);

  return [valuesNew, loading, error, snapshot];
};
