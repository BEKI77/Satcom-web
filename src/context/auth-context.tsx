import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { CustomAuth } from '@/components/auth/Custom-auth';
import { supabase } from '@/lib/lib';

interface User {
  id: string;
  name: string;
  email: string;
  role: string|null;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (name:string, email:string, password: string) => Promise<void>;
  login: (email:string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  toggleAuthDialog: () => void;
  closeAuthDialog: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuthDialog, setShowAuthDialog] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      const supaUser = session.user;
      const email = supaUser.email ?? '';
      const name = supaUser.user_metadata.full_name ?? email.split('@')[0];
      const role = email.includes('admin') ? 'admin' : 'student';
      
      setUser({
        id: supaUser.id,
        name,
        email,
        role,
        avatar: supaUser.user_metadata.avatar_url,
      });

    } else {
      setUser(null);
    }
  }, [session]);

  const login = async (email:string, password:string ) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if(error) {
      console.error(error.message);
      throw new Error(error.message);
    } else{
      console.log("Sign in successfull: ", data);
      const supaUser = data.user;
      const email = supaUser.email ?? '';
      const name = supaUser.user_metadata.full_name ?? email.split('@')[0];
      const role = email.includes('admin') ? 'admin' : 'student';

      setUser({
        id: supaUser.id,
        name,
        email,
        role,
        avatar: supaUser.user_metadata.avatar_url,
      });
    }

  };

  const signUp = async(email:string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {full_name: "User Name"}
      }
    });

    if(error) {
      // console.error(error.message);
      throw new Error(error.message);
    } else {
      console.log('Sign up successful: ', data)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const closeAuthDialog = () => setShowAuthDialog(false);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signUp, 
      logout, 
      loginWithGoogle, toggleAuthDialog: () => setShowAuthDialog((prev) => !prev), 
      closeAuthDialog 
  }}>
      {!user && showAuthDialog ? (
        <CustomAuth 
          onLogin={login} 
          onSignUp={signUp} 
          onGoogleLogin={loginWithGoogle} 
          loading={loading} 
        />
      ) : null}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};