import _ from 'lodash';

import { logger } from './index';

// export let ActionType;
// (function (ActionType) {
//   ActionType['ADD_RESOURCE'] = 'ADD_RESOURCE';
//   ActionType['DELETE_RESOURCE'] = 'DELETE_RESOURCE';
//   ActionType['UPDATE_RESOURCE'] = 'UPDATE_RESOURCE';
//   ActionType['LOAD_DATA'] = 'LOAD_DATA';
//   ActionType['SET_DATA'] = 'SET_DATA';
// })(ActionType || (ActionType = {}));

export const reducer = (state, action) => {
  logger.log('Globaldatadispatch', { state, action });
  //let newState = global.structuredClone(state);
  let newState = state; //JSONfn.clone(state);
  let currentValue;
  let foundIndex;
  let foundResource;
  state;
  switch (action.type) {
    case 'ADD_RESOURCE':
      foundIndex = newState.resources?.findIndex(
        (one) => one.name === action.payload.resource.name
      );
      if (foundIndex === -1) {
        const resourceToAdd = {
          ...action.payload.resource,
          loadData:
            action.payload?.resource?.loadData == undefined
              ? true
              : action.payload?.resource?.loadData,
        };
        newState.resources?.push(resourceToAdd);
      } else {
        return state;
      }
      return { ...newState };
    case 'DELETE_RESOURCE':
      foundIndex = newState.resources?.findIndex(
        (one) => one.name === action.payload.resource.name
      );
      if (foundIndex === -1) {
        return state;
      } else {
        newState = _.remove(newState.resources, function (currentObject) {
          return currentObject.name === action.payload.resource.name;
        });
      }
      return { ...newState };
    case 'LOAD_DATA':
      foundIndex = newState.resources?.findIndex((one) => one.name === action.payload.key);
      foundResource;
      if (foundIndex != undefined) {
        foundResource = newState.resources[foundIndex];
        if (!foundResource) {
          return state;
        }
        if (foundResource.loadData) {
          return state;
        }

        foundResource.loadData = true;
        newState.resources[foundIndex] = foundResource;
      } else {
        return state;
      }

      return { ...newState };
    case 'SET_DATA':
      currentValue = _.get(newState, action.payload.key);
      if (currentValue === action.payload.value) return state;

      newState = _.set(newState, action.payload.key, action.payload.value);

      return { ...newState };
    case 'UPDATE_RESOURCE':
      foundIndex = newState.resources?.findIndex((one) => one.name === action.payload.key);
      if (foundIndex !== -1) {
        newState = state;
        newState.resources[foundIndex] = action.payload.value;
      } else {
        return state;
      }

      return { ...newState };
    default:
      return state;
  }
};
