import GlobalData from './GlobalData';

const useFirestoreMount = (globalData) => {
  let dataComponents = [];

  if (globalData) {
    const resources = globalData?.resources?.filter(
      (one) => one.options?.dataProviderName === 'firestore'
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
    return dataComponents;
  }
};

export default useFirestoreMount;
