import { createContext, useContext, useState } from "react"

interface IAuthProps  { 
    children: React.ReactNode
 };

 interface IContext {
    user: string,
    signIn: (newUser: string, callback: () => void) => void,
    signOut: (callback: () => void) => void,
 }

const AuthContext = createContext<IContext | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}:IAuthProps) {
  const [user, setUser] = useState(() => localStorage.getItem('user') || '');

  const signIn = (newUser: string, callback: () => void) => {
    setUser(newUser);
    localStorage.setItem('user', newUser);
    callback();
  }

  const signOut = (callback: () => void) => {
    setUser('');
    localStorage.removeItem('user');
    callback();
  }

  const value: IContext = {
    user,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
        <div>
            {children}
        </div>
    </AuthContext.Provider>
  )
}
