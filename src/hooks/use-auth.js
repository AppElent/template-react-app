import { useContext } from 'react';
import { AuthContext } from 'src/contexts/auth/firebase';

export const useAuth = () => useContext(AuthContext);
