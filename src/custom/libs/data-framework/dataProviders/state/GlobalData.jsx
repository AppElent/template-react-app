import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useData } from '../../framework/useData';
import { ActionType } from '../../framework/ActionType';

const GlobalData = ({ resource }) => {
  //useGlobalDataFirestoreCollection(storeKey);
  const { dispatch, ...globalData } = useData();

  // const meta = useMemo(() => {
  //   const metaObject = {
  //     dataProviderName: 'state',
  //   };
  //   return { ...metaObject, name: resource.name };
  // }, [resource]);

  //const auth = getAuth();
  const [data, setData] = useState();

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

  const updateData = (value) => {
    console.log(resource, value);
    if (resource.options.type === 'object') {
      setData((prevState) => ({ ...prevState, ...value }));
    } else if (resource.options.type === 'array') {
      setData((prevState) => [...prevState, value]);
    }
  };

  useEffect(() => {
    if (resource && dispatch) {
      dispatch({
        type: ActionType.UPDATE_RESOURCE,
        payload: {
          key: resource.name,
          value: {
            ...resource,
            actions: {
              add: (value) => {
                if (resource.options.type === 'array')
                  setData((prevState) => [...prevState, value]);
              },
              set: setData,
              update: updateData,
              delete: setData(undefined),
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
