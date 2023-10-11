import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Refine as RefineDev } from '@refinedev/core';
import RestDataProvider from '@refinedev/simple-rest';

const Refine = ({ authProvider, resources, dataProvider, children, ...refineOptions }) => {
  /**?
   *   Create i18nProvider from Refine
   *
   */
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key, options) => t(key, options),
    changeLocale: (lang) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  resources = resources || [];
  useEffect(() => {
    if (resources) {
      resources.push({
        name: 'posts',
        options: {
          route: 'refine/posts',
          dataProviderName: 'dummy',
        },
      });
      resources.push({
        name: 'products',
        options: {
          route: 'refine/products',
          label: 'Products',
          dataProviderName: 'dummy',
        },
      });
    }
  }, []);

  const refineDataProvider = dataProvider || {
    dummy: RestDataProvider('https://api.fake-rest.refine.dev'),
  };

  return (
    <RefineDev
      authProvider={authProvider}
      dataProvider={refineDataProvider}
      i18nProvider={i18nProvider}
      resources={resources}
      {...refineOptions}
    >
      {children}
    </RefineDev>
  );
};

Refine.propTypes = {
  authProvider: PropTypes.any,
  children: PropTypes.any,
  dataProvider: PropTypes.any,
  resources: PropTypes.any,
};

export default Refine;
