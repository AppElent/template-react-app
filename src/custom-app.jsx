import PropTypes from 'prop-types';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

import { logger, setLogger } from 'src/custom/libs/logging';
import Refine from 'src/custom/libs/refine';
import { useHttpsRedirect } from 'src/custom/hooks/use-https-redirect';
import useLocalStorage from './custom/hooks/use-local-storage';
import { DataFramework, useData } from './custom/libs/data-framework';
import { collection, where } from 'firebase/firestore';
import { db } from './libs/firebase';
import { getAuth } from 'firebase/auth';
import { useRouter } from './hooks/use-router';
import { useEffect } from 'react';
import { ActionType } from './custom/libs/data-framework/framework/ActionType';
import { ConfirmProvider } from 'material-ui-confirm';

const CustomApp = ({ children }) => {
  // Redirect to HTTPS if condition is TRUE
  useHttpsRedirect(!import.meta.env.DEV && window.location.hostname !== 'localhost');

  const navigate = useRouter();
  useEffect(() => {
    if (window.location.pathname === '/') navigate.push('/app');
  }, [navigate]);

  // Retrieve locally saved user settings
  const [userSettings] = useLocalStorage('user_settings');
  useEffect(() => {
    logger.log('User settings', userSettings);
  }, [userSettings]);

  // Set loglevel
  const LOG_LEVEL = userSettings?.loglevel
    ? userSettings.loglevel
    : import.meta.env.DEV
    ? 'info'
    : 'warn';
  useEffect(() => {
    setLogger({ level: LOG_LEVEL });
    logger.log('Environment variables', import.meta.env);
    logger.log('Log level', LOG_LEVEL);
  }, [LOG_LEVEL]);

  // Set the options for confirmation dialogs
  const confirmationDialogOptions = {
    confirmationButtonProps: { variant: 'contained', autoFocus: true },
    cancellationButtonProps: { variant: 'outlined', color: 'error' },
  };

  // set resources for data framework
  const resources = [
    {
      name: 'dummy01',
      options: {
        collection: collection(db, 'dummy'),
        dataProviderName: 'firestore',
      },
    },
    {
      name: 'testdocument',
      options: {
        collection: collection(db, 'dummy'),
        document: 'dumm03',
        dataProviderName: 'firestore',
      },
    },
    {
      name: 'test01',
      key: 'testkey',
      loadData: true,
      options: {
        dataProviderName: 'localStorage',
      },
    },
    {
      name: 'teststate',
      loadData: true,
      options: {
        type: 'string',
        dataProviderName: 'state',
      },
    },
    {
      name: 'teststate2',
      loadData: true,
      options: {
        type: 'object',
        dataProviderName: 'state',
      },
    },
    {
      name: 'teststate3',
      loadData: true,
      options: {
        type: 'string',
        dataProviderName: 'state',
      },
    },
    {
      name: 'user_settings',
      key: 'user_settings',
      loadData: true,
      options: {
        dataProviderName: 'localStorage',
      },
    },
    {
      name: 'dummy03',
      options: {
        collection: collection(db, 'dummy'),
        dataProviderName: 'firestore',
        postProcess: (data) => {
          var object = data?.reduce(
            (obj, item) => Object.assign(obj, { [item.id]: { ...item } }),
            {}
          );
          return object;
        },
      },
    },
  ];

  return (
    <>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <DataFramework
          logger={logger}
          resources={resources}
        >
          <ConfirmProvider defaultOptions={confirmationDialogOptions}>
            <Refine>
              <CustomAppChild>{children}</CustomAppChild>
            </Refine>
          </ConfirmProvider>
        </DataFramework>
      </QueryParamProvider>
    </>
  );
};

const CustomAppChild = ({ children }) => {
  let returnComponent = <>{children}</>;

  return returnComponent;
};

export default CustomApp;

CustomApp.propTypes = {
  children: PropTypes.any,
};

CustomAppChild.propTypes = {
  children: PropTypes.any,
};
