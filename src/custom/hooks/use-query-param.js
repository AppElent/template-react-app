// import { useEffect } from 'react';

// export const useQueryParam = (name, fallbackId, onChange) => {
//   const router = useRouter();

//   const queryValue = router.query[name];

//   const setQueryParam = (newValue) => {
//     router.replace(
//       {
//         query: { ...router.query, [name]: newValue },
//       },
//       undefined,
//       { shallow: true }
//     );
//   };

//   useEffect(() => {
//     if (!queryValue && fallbackId) {
//       setQueryParam(fallbackId);
//     }
//   }, [queryValue, fallbackId]);

//   return { value: queryValue || fallbackId, setQueryParam };
// };
