import { profileService } from '@/lib/services/profileService';
import type { ProfileData, Profile, Skill, WorkExperience, Education } from '@/types';

/**
 * Agent configuration for 'shay-azulay-agent'
 */
export interface AgentConfig {
  name: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  apiKey?: string;
}

/**
 * Builds the base system prompt introduction
 * @returns Base prompt string
 */
function buildBasePrompt(): string {
  return `You are Shay Azulay Agent, an AI assistant representing Shay Azulay. You help answer questions about Shay, his background, skills, experience, and projects. Be friendly, professional, and helpful in your responses.

IMPORTANT: You are representing Shay Azulay. Always speak in first person when talking about Shay's experiences, skills, or background. Be conversational and authentic.`;
}

/**
 * Builds the profile section of the system prompt
 * @param profile - Profile data
 * @returns Profile section string
 */
function buildProfileSection(profile: Profile | null): string {
  if (!profile) {
    return '';
  }

  let section = `\n\n## About Shay Azulay
Name: ${profile.name}
Title: ${profile.title}`;

  if (profile.bio) {
    section += `\n\nBio:\n${profile.bio}`;
  }

  return section;
}

/**
 * Groups skills by category
 * @param skills - Array of skills
 * @returns Skills grouped by category
 */
function groupSkillsByCategory(skills: Skill[]): Record<string, string[]> {
  return skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);
}

/**
 * Builds the skills section of the system prompt
 * @param skills - Array of skills
 * @returns Skills section string
 */
function buildSkillsSection(skills: Skill[]): string {
  if (!skills || skills.length === 0) {
    return '';
  }

  const skillsByCategory = groupSkillsByCategory(skills);
  let section = `\n\n## Skills`;

  for (const [category, skillList] of Object.entries(skillsByCategory)) {
    section += `\n${category}: ${skillList.join(', ')}`;
  }

  return section;
}

/**
 * Formats work experience period
 * @param work - Work experience entry
 * @returns Formatted period string
 */
function formatWorkPeriod(work: WorkExperience): string {
  if (!work.startDate) {
    return '';
  }

  const endDate = work.isCurrent ? 'Present' : (work.endDate ? work.endDate.toString() : '');
  return `\nPeriod: ${work.startDate}${endDate ? ` - ${endDate}` : ''}`;
}

/**
 * Builds a single work experience entry
 * @param work - Work experience entry
 * @returns Work experience entry string
 */
function buildWorkEntry(work: WorkExperience): string {
  let entry = `\n\n${work.companyName} - ${work.position}`;
  
  const period = formatWorkPeriod(work);
  if (period) {
    entry += period;
  }

  if (work.description) {
    entry += `\n${work.description}`;
  }

  return entry;
}

/**
 * Builds the work experience section of the system prompt
 * @param workExperience - Array of work experience entries
 * @returns Work experience section string
 */
function buildWorkExperienceSection(workExperience: WorkExperience[]): string {
  if (!workExperience || workExperience.length === 0) {
    return '';
  }

  let section = `\n\n## Work Experience`;
  
  for (const work of workExperience) {
    section += buildWorkEntry(work);
  }

  return section;
}

/**
 * Formats education period
 * @param edu - Education entry
 * @returns Formatted period string
 */
function formatEducationPeriod(edu: Education): string {
  if (!edu.startDate) {
    return '';
  }

  const endDate = edu.endDate ? edu.endDate.toString() : 'Present';
  return `\nPeriod: ${edu.startDate} - ${endDate}`;
}

/**
 * Builds a single education entry
 * @param edu - Education entry
 * @returns Education entry string
 */
function buildEducationEntry(edu: Education): string {
  let entry = `\n\n${edu.institutionName} - ${edu.degree}`;

  if (edu.field) {
    entry += ` in ${edu.field}`;
  }

  const period = formatEducationPeriod(edu);
  if (period) {
    entry += period;
  }

  if (edu.description) {
    entry += `\n${edu.description}`;
  }

  return entry;
}

/**
 * Builds the education section of the system prompt
 * @param education - Array of education entries
 * @returns Education section string
 */
function buildEducationSection(education: Education[]): string {
  if (!education || education.length === 0) {
    return '';
  }

  let section = `\n\n## Education`;

  for (const edu of education) {
    section += buildEducationEntry(edu);
  }

  section += `\nI have done a course in React`;
  section += `\nI have done a course in Next.js`;
  section += `\nI have done a course in iOS Development and Swift`;
  section += `\nI have done a course in Master AI Agents`;
  section += `\nI have done a course in Agents SDK, CrewAI, LangGraph, AutoGen and MCP`;

  return section;
}

/**
 * Builds the personal life section of the system prompt
 * @returns Personal life section string
 */
function buildPersonalLifeSection(): string {
  return `\n\n## Personal life
I live in Israel, in a city called Holon
I am married and have two boys, Noam and Amit
I am a father of two children
I am a husband of my wife Anat
I love going to see movies and TV shows
My favorite movie is "The Godfather" and my favorite TV show is "Arcane"
My favorite books are "Catch 22" "The Great Gatsby" and "The Name of the Rose"`;
}

/**
 * Builds the instructions section of the system prompt
 * @returns Instructions section string
 */
function buildInstructionsSection(): string {
  return `\n\n## Instructions
- Answer questions about Shay's background, experience, and skills
- Be conversational and friendly
- If asked about something not in the provided context, politely say you don't have that information
- Keep responses concise but informative
- Always maintain a professional yet approachable tone
- Response in plain text, not markdown. you can use emojis if you want to.
- Refine your answers to be more natural and human-like.
- Refine your answers to be up to 200 words long.
- if the question is a specific question about: solid, mongoDB, Angular, Svelte say you have played around with it in the past.but you are not an expert in any of these technologies.
- if the question is a specific about how many frontend work vs how many backend work say you have done both and your day to day is 70% frontend and 30% backend.
- If the question is not related to Shay Azulay, politely say you don't have that information.

`;

}

/**
 * Builds a comprehensive system prompt with context about Shay Azulay
 * @param profileData - Complete profile data including profile, skills, work experience, and education
 * @returns System prompt string with all context
 */
function buildSystemPrompt(profileData: ProfileData): string {
  const basePrompt = buildBasePrompt();
  const profileSection = buildProfileSection(profileData.profile);
  const skillsSection = buildSkillsSection(profileData.skills);
  const workSection = buildWorkExperienceSection(profileData.workExperience);
  const educationSection = buildEducationSection(profileData.education);
  const personalLifeSection = buildPersonalLifeSection();
  const instructionsSection = buildInstructionsSection();

  return `${basePrompt}${profileSection}${skillsSection}${workSection}${educationSection}${personalLifeSection}${instructionsSection}`;
}

/**
 * Gets environment variable for OpenAI model
 * @returns Model name string
 */
function getOpenAIModel(): string {
  return process.env.OPENAI_MODEL || 'gpt-4o';
}

/**
 * Gets environment variable for OpenAI temperature
 * @returns Temperature number
 */
function getOpenAITemperature(): number {
  return parseFloat(process.env.OPENAI_TEMPERATURE || '0.7');
}

/**
 * Gets environment variable for OpenAI max tokens
 * @returns Max tokens number
 */
function getOpenAIMaxTokens(): number {
  return parseInt(process.env.OPENAI_MAX_TOKENS || '2000', 10);
}

/**
 * Creates a fallback agent configuration
 * @returns Basic agent configuration
 */
function createFallbackConfig(): AgentConfig {
  return {
    name: 'shay-azulay-agent',
    model: getOpenAIModel(),
    temperature: getOpenAITemperature(),
    maxTokens: getOpenAIMaxTokens(),
    systemPrompt: 'You are Shay Azulay Agent, a helpful AI assistant. Be friendly, professional, and concise in your responses.',
    apiKey: process.env.OPENAI_API_KEY,
  };
}

/**
 * Creates agent configuration with profile data
 * @param profileData - Complete profile data
 * @returns Agent configuration with context
 */
function createAgentConfig(profileData: ProfileData): AgentConfig {
  const systemPrompt = buildSystemPrompt(profileData);

  return {
    name: 'shay-azulay-agent',
    model: getOpenAIModel(),
    temperature: getOpenAITemperature(),
    maxTokens: getOpenAIMaxTokens(),
    systemPrompt,
    apiKey: process.env.OPENAI_API_KEY,
  };
}

/**
 * Gets the agent configuration with context from the database
 * This function fetches profile data and builds a comprehensive system prompt
 * @returns Agent configuration object with context-aware system prompt
 */
export async function getShayAzulayAgentConfig(): Promise<AgentConfig> {
  try {
    const profileData = await profileService.getProfileData();
    return createAgentConfig(profileData);
  } catch (error) {
    console.error('Error fetching profile data for agent config:', error);
    return createFallbackConfig();
  }
}
