import { profileRepository } from '@/lib/repositories/profileRepository';
import { DatabaseError } from '@/lib/utils/errors';
import type { ProfileData } from '@/types';

/**
 * Service for handling profile data operations
 */
export class ProfileService {
  /**
   * Fetches all profile data including profile, skills, work experience, and education
   * @returns Complete profile data structure
   * @throws DatabaseError if any database operation fails
   */
  async getProfileData(): Promise<ProfileData> {
    try {
      const [profileData, skillsData, workData, educationData] = await Promise.all([
        profileRepository.getProfile(),
        profileRepository.getSkills(),
        profileRepository.getWorkExperience(),
        profileRepository.getEducation(),
      ]);

      return {
        profile: profileData,
        skills: skillsData,
        workExperience: workData,
        education: educationData,
      };
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError('Failed to fetch profile data', error);
    }
  }
}

/**
 * Singleton instance of ProfileService
 */
export const profileService = new ProfileService();
