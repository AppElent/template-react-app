import { useEffect } from 'react';

export const useHttpsRedirect = (httpsRedirect) => {
  useEffect(() => {
    // Client-side-only code
    /**
     * HTTPS redirect
     */
    if (typeof window !== 'undefined') {
      if (httpsRedirect && window.location.protocol !== 'https:') {
        window.location.href = `https:${window.location.href.substring(
          window.location.protocol.length
        )}`;
      }
    }
  }, [httpsRedirect]);
};
