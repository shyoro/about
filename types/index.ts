export type { ContactFormData } from '@/zod/schemas';

/**
 * Profile data types
 */
export interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  profileImageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: string | null;
  order: number;
  createdAt: Date;
}

export interface WorkExperience {
  id: string;
  companyName: string;
  companyLogoUrl: string | null;
  position: string;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  order: number;
  createdAt: Date;
}

export interface Education {
  id: string;
  institutionName: string;
  institutionLogoUrl: string | null;
  degree: string;
  field: string | null;
  description: string | null;
  startDate: Date;
  endDate: Date | null;
  order: number;
  createdAt: Date;
}

/**
 * Complete profile data structure
 */
export interface ProfileData {
  profile: Profile | null;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
}

