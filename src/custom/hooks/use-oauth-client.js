import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { getUrlParams } from '../libs/get-url-params';
import toast from 'react-hot-toast';
import { getAuth } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from 'src/libs/firebase';
import { useData } from 'src/custom/libs/data-framework';
import { useRouter } from 'src/hooks/use-router';

export const useOauthClient = (configuration) => {
  const router = useRouter();
  const { pathname, query } = router;
  const firebaseData = useData();
  //const [token, setToken] = useState();

  useEffect(() => {
    const state = query.state;
    const config = query.config;
    const fetchToken = async (state) => {
      console.log('fetch', state);
      //const configuration = configurations[config];
      const url = configuration.baseUrl
        ? `${configuration.baseUrl}${configuration.tokenUrl}`
        : configuration.tokenUrl;
      const urlWithState = url + '?state=' + state;
      let tokenResponse;
      try {
        tokenResponse = await axios.post(urlWithState);
        // const tokenResponse = await (
        //   await fetch(urlWithState, { method: "POST" })
        // ).json();
      } catch (error) {
        console.error('Error fetching: ', error.response);
        toast.error('Error getting token: ' + error.response.data);
        router.replace(pathname, undefined, { shallow: true });
        return;
      }

      await saveToken(tokenResponse.data);

      // Redirect back to path without query params
      if (configuration.options.redirect_after_token) {
        router.push(configuration.options.redirect_after_token, undefined, {
          shallow: true,
        });
      } else {
        router.replace(pathname, undefined, { shallow: true });
      }
    };
    if (state && config && config === configuration.name) {
      fetchToken(state);
    }
  }, []);

  const redirect = useCallback(() => {
    let queryParams = {
      config: configuration.name,
    };
    if (configuration.redirectQueryParams)
      queryParams = { ...queryParams, ...configuration.redirectQueryParams };
    if (configuration.options?.redirect_back) queryParams.redirect_url = window.location.href;
    if (configuration.options?.redirect_to) queryParams.redirect = true;

    if (configuration.scope) queryParams.scope = configuration.scope;

    const redirectUrl = configuration.baseUrl
      ? `${configuration.baseUrl}/${configuration.redirectUrl}`
      : configuration.redirectUrl;

    window.location.href = redirectUrl + '?' + getUrlParams(queryParams);
  }, [configuration]);

  const refreshToken = useCallback(
    async (token, save = false) => {
      //token needs to be renewed
      let newToken;
      try {
        newToken = await axios.post(token.refresh_token_url, {
          token: token.token.refresh_token,
        });
      } catch (error) {
        console.log('Error refreshing access token', error);
        toast.error('Access token refresh failed: ' + error.message);
      }
      return newToken?.data;
    },
    [configuration]
  );

  const saveToken = useCallback(
    async (data, key) => {
      try {
        const auth = getAuth();
        const username = auth.currentUser?.uid || 'demo_user';
        // const [tokens, loading, error, snapshot] = useCollectionData(
        //   collection(db, `users/${username}/tokens`),
        //   where("environment", "==", "dev")
        // );
        const saveKey = key ? key : configuration.name;
        await setDoc(doc(db, `users/${username}/tokens/${saveKey}`), data);
        toast.success('Access token saved');
      } catch (error) {
        console.log(error);
        toast.error('Error: ' + error.message);
      }
    },
    [configuration]
  );

  const getToken = useCallback(
    async (data, key) => {
      if (!data) {
        data = firebaseData.firestore.collections.tokens.data;
      }
      const saveKey = key ? key : configuration.name;
      const token = data[saveKey];
      if (token) {
        const expires_at = token.token.expires_at;
        if (new Date().getTime() < expires_at) {
          //token needs to be refreshed
          const newAccessToken = await refreshToken(token);
          token.token = newAccessToken;
          await saveToken(token);
        } else {
          return token;
        }
      }
      return token;
    },
    [configuration]
  );

  const returnValue = {
    redirect,
    refreshToken,
    saveToken,
    getToken,
  };

  return returnValue;
};
