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
    
    const { error } = await supabase
      .from('enrollments')
      .insert([{ user_id: user.id, course_id: courseId }]);
    if (error) {
      console.error('Error enrolling in course:', error.message);
    } else {
      setEnrolledCourses(prev => [...prev, courseId]);
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