export const enableDevTools = import.meta.env.VITE_ENABLE_REDUX_DEV_TOOLS === 'true';

export const amplifyConfig = {
  aws_project_region: import.meta.env.VITE_AWS_PROJECT_REGION,
  aws_cognito_identity_pool_id: import.meta.env.VITE_AWS_COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: import.meta.env.VITE_AWS_COGNITO_REGION,
  aws_user_pools_id: import.meta.env.VITE_AWS_USER_POOLS_ID,
  aws_user_pools_web_client_id: import.meta.env.VITE_AWS_USER_POOLS_WEB_CLIENT_ID,
};

export const auth0Config = {
  base_url: import.meta.env.VITE_AUTH0_BASE_URL,
  client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
  issuer_base_url: import.meta.env.VITE_AUTH0_ISSUER_BASE_URL,
};

export const firebaseConfig = {
  apiKey: 'AIzaSyDAwdqU-4k5Azb1fNF9RFLAlT-RaMSDUPo',
  authDomain: 'appelent-bc868.firebaseapp.com',
  projectId: 'appelent-bc868',
  storageBucket: 'appelent-bc868.appspot.com',
  messagingSenderId: '726562505952',
  appId: '1:726562505952:web:d05c0d37da55129551fc85',
  measurementId: 'G-SCBJ5EM94B',
};

export const gtmConfig = {
  containerId: import.meta.env.VITE_GTM_CONTAINER_ID,
};

export const mapboxConfig = {
  apiKey: import.meta.env.VITE_MAPBOX_API_KEY,
};

export const version = '6.4.2';

export const siteSettings = {
  title: 'AppElent',
  subtitle: 'Subtitle',
  //plan: "PRO",
  version: 'v1.0.0',
  copyright: 'AppElent',
  url: 'appelent.appelent.com',
  stagingUrl: 'appelent.appelent.com',
  loginRedirect: '/app',
  backend: 'https://api.appelent.com',
  localhost: {
    title: 'New title',
    //sections: ["Satisfactory"],
  },
  satisfactory: {
    title: 'Satisfactory',
    sections: ['Satisfactory'],
  },
};
