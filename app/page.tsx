import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { BackgroundOrbs } from '@/components/animations/BackgroundOrbs';
import { profileService } from '@/lib/services/profileService';

/**
 * Fetches profile data from database and passes to client components
 */
export default async function Home() {
  const profileData = await profileService.getProfileData();

  return (
    <main className="relative min-h-screen">
      <BackgroundOrbs />
      <HeroSection profile={profileData.profile} />
      <AboutSection profile={profileData.profile} skills={profileData.skills} />
      <ExperienceSection workExperience={profileData.workExperience} />
      <EducationSection education={profileData.education} />
      <ContactSection />
    </main>
  );
}
