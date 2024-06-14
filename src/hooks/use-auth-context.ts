import { useContext } from 'react';
import { AuthContext } from 'src/context/auth-context';


export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}


