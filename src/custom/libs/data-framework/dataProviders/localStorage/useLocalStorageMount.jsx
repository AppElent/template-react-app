import GlobalData from './GlobalData';

const useLocalStorageMount = (globalData) => {
  let dataComponents = [];

  if (globalData) {
    const resources = globalData.resources.filter(
      (one) => one.options?.dataProviderName.toLowerCase() === 'localstorage'
    );
    for (const resource of resources) {
      if (resource.loadData) {
        dataComponents.push(
          <GlobalData
            key={resource.name}
            resource={resource}
          />
        );
      }
    }
  }

  return dataComponents;
};

export default useLocalStorageMount;
