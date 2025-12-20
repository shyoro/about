import { getDb } from '@/lib/db/client';
import { profile, skills, workExperience, education } from '@/lib/db/schema';
import { DatabaseError } from '@/lib/utils/errors';
import type { Profile, Skill, WorkExperience, Education } from '@/types';
import { asc } from 'drizzle-orm';

/**
 * Repository for profile data database operations
 */
export class ProfileRepository {
  /**
   * Fetches the main profile information
   * @returns The profile data or null if not found
   * @throws DatabaseError if the operation fails
   */
  async getProfile(): Promise<Profile | null> {
    try {
      const db = getDb();
      const [profileData] = await db.select().from(profile).limit(1);

      if (!profileData) {
        return null;
      }

      // Ensure bio is always an array (JSONB might return different formats)
      let bioArray: string[] = [];
      if (Array.isArray(profileData.bio)) {
        bioArray = profileData.bio;
      } else if (typeof profileData.bio === 'string') {
        try {
          const parsed = JSON.parse(profileData.bio);
          bioArray = Array.isArray(parsed) ? parsed : [];
        } catch {
          bioArray = [];
        }
      }

      return {
        id: profileData.id,
        name: profileData.name,
        title: profileData.title,
        bio: bioArray,
        profileImageUrl: profileData.profileImageUrl,
        createdAt: profileData.createdAt,
        updatedAt: profileData.updatedAt,
      };
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError('Failed to fetch profile', error);
    }
  }

  /**
   * Fetches all skills ordered by order field
   * @returns Array of skills
   * @throws DatabaseError if the operation fails
   */
  async getSkills(): Promise<Skill[]> {
    try {
      const db = getDb();
      const skillsData = await db
        .select()
        .from(skills)
        .orderBy(asc(skills.order));

      return skillsData.map((skill) => ({
        id: skill.id,
        name: skill.name,
        category: skill.category,
        order: skill.order,
        createdAt: skill.createdAt,
      }));
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError('Failed to fetch skills', error);
    }
  }

  /**
   * Fetches all work experience ordered by order field
   * @returns Array of work experience entries
   * @throws DatabaseError if the operation fails
   */
  async getWorkExperience(): Promise<WorkExperience[]> {
    try {
      const db = getDb();
      const workData = await db
        .select()
        .from(workExperience)
        .orderBy(asc(workExperience.order));

      return workData.map((work) => ({
        id: work.id,
        companyName: work.companyName,
        companyLogoUrl: work.companyLogoUrl,
        position: work.position,
        description: work.description,
        startDate: work.startDate,
        endDate: work.endDate,
        isCurrent: work.isCurrent,
        order: work.order,
        createdAt: work.createdAt,
      }));
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError('Failed to fetch work experience', error);
    }
  }

  /**
   * Fetches all education entries ordered by order field
   * @returns Array of education entries
   * @throws DatabaseError if the operation fails
   */
  async getEducation(): Promise<Education[]> {
    try {
      const db = getDb();
      const educationData = await db
        .select()
        .from(education)
        .orderBy(asc(education.order));

      return educationData.map((edu) => ({
        id: edu.id,
        institutionName: edu.institutionName,
        institutionLogoUrl: edu.institutionLogoUrl,
        degree: edu.degree,
        field: edu.field,
        description: edu.description,
        startDate: edu.startDate,
        endDate: edu.endDate,
        order: edu.order,
        createdAt: edu.createdAt,
      }));
    } catch (error) {
      if (error instanceof DatabaseError) {
        throw error;
      }
      throw new DatabaseError('Failed to fetch education', error);
    }
  }
}

/**
 * Singleton instance of ProfileRepository
 */
export const profileRepository = new ProfileRepository();
