import { useState, useEffect } from 'react';
import { createClient, Session } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

console.log(import.meta.env.VITE_SUPABASE_URL,import.meta.env.VITE_SUPABASE_SECRET_KEY);

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_SECRET_KEY);

interface AuthModalProps {
  onAuthSuccess: (user: any) => void;
}

export function AuthModal({ onAuthSuccess }: AuthModalProps) {
  const [session, setSession] = useState<Session | null>(null)
 

  useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()

    }, []);
   
  useEffect(() => {
    if (session) {
      // Map Supabase session to your app's User type
      const user = session.user;
      const email = user.email ?? '';
      const name = user.user_metadata.full_name ?? email.split('@')[0];
      const role = email.includes('admin') ? 'admin' : 'student'; // Example role logic

      onAuthSuccess({
        id: user.id,
        name,
        email,
        role,
        enrolledCourses: [],
        completedCourses: [],
        avatar: user.user_metadata.avatar_url,
      });
    
    }
  }, [session, onAuthSuccess]);
  
  if (!session) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google']}/>
        </div>
     
      </div>
    )
  }else {
    return null;
  }
}