import _ from 'lodash';

export const useFormikCrud = (formik, key, options) => {
  const { idKey = 'id' } = options || {};

  const getFieldValue = (values, key) => {
    const value = _.get(values, key);
    return value;
  };

  const values = getFieldValue(formik.values, key);

  const type = Array.isArray(values) ? 'array' : _.isObject(values) ? 'object' : 'string';

  console.log(formik.values, key, type, values);

  const getItem = () => {
    if (type === 'array') {
      return key(formik.values) || [];
    } else if (type === 'object') {
      return getFieldValue(formik.values, key) || {};
    } else {
      return getFieldValue(formik.values, key) || '';
    }
  };

  console.log(getItem());

  const addItem = (value) => {
    if (!type === 'array') return;
    const currentItems = getItem();
    currentItems.push(value);
    //formik.setFieldValue(key, currentItems);
    console.log(value, currentItems);
  };

  const setItem = (id, value) => {
    let currentItems = getItem(); //getFieldValue(formik.values, key) ? getFieldValue(formik.values, key) : [];
    if (type === 'array') {
      const index = currentItems.findIndex((currentId) => currentId[idKey] === id);
      currentItems[index] = value;
    } else if (type === 'object') {
      currentItems[id] = value;
    } else {
      currentItems = id;
    }
    //formik.setFieldValue(key, currentItems);
    console.log(id, value, currentItems);
  };

  const removeItem = (id) => {
    if (!type === 'array') return;
    let currentItems = getItem();
    currentItems = currentItems.filter((currentId) => currentId[idKey] !== id);
    //formik.setFieldValue(key, currentItems);
    console.log(id, currentItems);
  };

  return [getItem, addItem, setItem, removeItem];
};
