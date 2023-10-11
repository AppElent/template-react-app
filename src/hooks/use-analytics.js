import { useEffect } from 'react';
import { gtm } from 'src/libs/gtm';

/**
 *
 * @param config
 */
export function useAnalytics(config) {
  useEffect(() => {
    gtm.initialize(config);
  }, [config]);
}
