import { useEffect } from 'react';
import { gtm } from 'src/libs/gtm';

/**
 *
 * @param {any} config config
 */
export function useAnalytics(config) {
  useEffect(() => {
    gtm.initialize(config);
  }, [config]);
}
