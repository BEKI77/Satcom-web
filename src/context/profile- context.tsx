import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAuth } from './auth-context';
import { supabase } from '@/lib/lib';

interface Profile {
  id: string;
  userName: string;
  email: string;
  role: string;
  avatar: string;
  enrollmentDate?: string;
  completedCourses?: string[];
  currentCourses?: string[];
  progress?: Record<string, number>;
  badges?: string[];
  certificates?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  phone?: string;
}

interface ProfileContextType {
  profile: Profile | null;
  loading: boolean;
  enrolledCourses: string[];
  updateProfile : (data:any) => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  courseProgress: ()=> Promise<Record<string, number> | null>;
  updateProgress: (courseId: string, progress: number) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
 

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setEnrolledCourses([]);
      return;
    }

    setLoading(true);
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError && profileError.code==='PGRST116') {
      // Insert new profile
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          userName: user.name,
          email: user.email,
          avatar: user.avatar,
          enrollmentDate: new Date().toISOString(),
        }]);

      if (insertError) {
        console.error('Error inserting new profile:', insertError.message);
        setProfile(null);
      } else {
        setProfile({
          id: user.id,
          userName: user.name,
          email: user.email,
          role:'student',
          avatar: user.avatar,
          enrollmentDate: new Date().toISOString(),
          completedCourses: [],
          currentCourses: [],
          progress: {},
          badges: [],
          certificates: [],
          socialLinks: {},
          phone: '',
        });
      }

    } else if (profileError) {
      console.error('Error fetching profile:', profileError.message);
      setProfile(null);
      
    } else {
      setProfile(profileData);
    }


    // Fetch enrolled courses
    const { data: enrollments, error: enrollmentsError } = await supabase
      .from('enrollments')
      .select('course_id')
      .eq('user_id', user.id);

    if (enrollmentsError) {
      console.error('Error fetching enrollments:', enrollmentsError.message);
      setEnrolledCourses([]);
    } else {
      setEnrolledCourses(enrollments.map((e: any) => e.course_id));
    }
    setLoading(false);
  };

  const updateProfile = async (formData:any) => {
    if (!user) return;
    setLoading(true);

    const updates: Record<string, any> = {
      userName: formData.userName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      socialLinks: {
        linkedin: formData.linkedin,
        github: formData.github,
        twitter: formData.twitter,
      },
      id: user.id,
    };

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      await fetchProfile();
    }
    setLoading(false);
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", import.meta.env.VITE_CHAPA_SECRET_KEY);
    myHeaders.append("Content-Type", "application/json");

    const { data, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .single();

    console.log(data)

    if (courseError || !data) {
      console.error('Error fetching course:', courseError?.message);
      return;
    }
   
    const paymentData = {
      amount: data.price,
      currency: "ETB",
      email: user.email,
      first_name: user.name?.split(' ')[0] || user.name || "FirstName",
      last_name: user.name?.split(' ')[1] || "LastName",
      phone_number: profile?.phone || "0912345678",
      tx_ref: `tx-${user.id.slice(0,8)}-${data.id}-${Date.now()}`.slice(0, 50),
      callback_url: `${import.meta.env.VITE_FRONTEND_URL}/payment/callback`,
      return_url: `${window.location.origin}/courses/${data.id}`,
      "customization[title]": `Payment for ${data.title}`,
      "customization[description]": `Enroll in ${data.title}`,
      "meta[hide_receipt]": "true"
    };


    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(paymentData),
      redirect: 'follow' as RequestRedirect
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/chapa/initialize`, requestOptions);
      const result = await response.json();

      if (result.status === "success" && result.data?.checkout_url) {
        window.location.href = result.data.checkout_url;
        return; // Stop further execution
      } else {
        console.error('Chapa payment initialization failed:', result);
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
    }
  };

  const courseProgress = async (): Promise<Record<string, number>> => {
    if (!user) return {};

    const { data, error } = await supabase
      .from('enrollments')
      .select('course_id, progress')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching course progress:', error.message);
      return {};
    }

    const progressMap: Record<string, number> = {};

    data.forEach((row: { course_id: string; progress: number }) => {
      progressMap[row.course_id] = row.progress;
    });

    return progressMap;
  };

   const updateProgress = async (courseId: string, progress: number) => {
      if (!user) return;

      const { error } = await supabase
        .from('enrollments')
        .update({ progress })
        .eq('user_id', user.id)
        .eq('course_id', courseId);

      if (error) {
        console.error('Error updating course progress:', error.message);
      }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <ProfileContext.Provider value={{ 
        profile,
        updateProfile,
        loading, 
        enrolledCourses, 
        enrollInCourse, 
        courseProgress, 
        updateProgress,
        refreshProfile: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};