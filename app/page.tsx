import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { BackgroundOrb } from '@/components/animations/BackgroundOrbs';
import { profileService } from '@/lib/services/profileService';

/**
 * Fetches profile data from database and passes to client components
 */
export default async function Home() {
  const profileData = await profileService.getProfileData();

  return (
    <main className="relative min-h-screen">
      <BackgroundOrb
        orbKey={1}
        positionClasses="-top-50 -left-25"
        sizeClasses="w-[90vw] h-[90vw] max-w-300 max-h-300"
        colorFromVar="--orb-1-from"
        colorToVar="--orb-1-to"
      />
      <BackgroundOrb
        orbKey={2}
        positionClasses="top-[20%] -right-25"
        sizeClasses="w-[90vw] h-[90vw] max-w-350 max-h-350"
        colorFromVar="--orb-2-from"
        colorToVar="--orb-2-to"
      />
      <HeroSection profile={profileData.profile} />
      <AboutSection profile={profileData.profile} skills={profileData.skills} />
      <ExperienceSection workExperience={profileData.workExperience} />
      <EducationSection education={profileData.education} />
      <ContactSection />
    </main>
  );
}
