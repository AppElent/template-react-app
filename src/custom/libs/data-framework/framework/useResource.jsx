
import { useDataFramwork } from '../index';

export const useResource = (key) => {
  const globalData = useDataFramwork();
  if (!key) return globalData?.resources;
  return globalData?.resources.find((resource) => resource.name === key);
};
