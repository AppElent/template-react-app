import { useEffect, useState } from 'react';
import _ from 'lodash';
import { ActionType } from './ActionType';

import { useDataFramwork } from '../index';

export const useData = (key, options) => {
  const globalData = useDataFramwork();
  const [stateData, setStateData] = useState({ key, options });

  useEffect(() => {
    if (stateData.key) {
      if (typeof stateData.key === 'string' || stateData.key instanceof String) {
        if (globalData && globalData.dispatch && stateData.key) {
          globalData.dispatch({
            type: ActionType.LOAD_DATA,
            payload: { key: stateData.key, options: stateData.options },
          });
        }
      } else if (_.isObject(stateData.key)) {
        if (globalData.dispatch && stateData.key) {
          globalData.dispatch({
            type: ActionType.ADD_RESOURCE,
            payload: { resource: stateData.key },
          });
        }
      }
    }
  }, [stateData, globalData?.dispatch]);
  if (!key) return globalData;

  let data;
  let resource;
  if (typeof key === 'string' || key instanceof String) {
    resource = globalData?.resources?.find((resource) => resource.name === key);
    data = _.get(globalData, 'data.' + key);
  } else if (_.isObject(key)) {
    resource = globalData?.resources?.find((resource) => resource.name === key.name);
    data = _.get(globalData, 'data.' + key.name);
  }

  return { resource, ...data } || {};
};
