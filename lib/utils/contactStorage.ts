import {isMinimal} from "std-env";

/**
 * Contact information structure
 */
export interface ContactInfo {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

const CONTACT_STORAGE_KEY = 'shay-azulay-contact-info';

/**
 * Loads contact information from localStorage
 * @returns Contact information object
 */
export function loadContactInfo(): ContactInfo {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const stored = localStorage.getItem(CONTACT_STORAGE_KEY);
    if (!stored) {
      return {};
    }

    return JSON.parse(stored) as ContactInfo;
  } catch (error) {
    console.error('Error loading contact info from storage:', error);
    return {};
  }
}

/**
 * Saves contact information to localStorage
 * @param contactInfo - Contact information to save
 */
export function saveContactInfo(contactInfo: ContactInfo): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contactInfo));
  } catch (error) {
    console.error('Error saving contact info to storage:', error);
  }
}

/**
 * Merges new contact information with existing stored data
 * @param newInfo - New contact information to merge
 * @returns Updated contact information
 */
export function mergeContactInfo(newInfo: Partial<ContactInfo>): ContactInfo {
  const existing = loadContactInfo();

  const merged = {
    ...existing,
    ...newInfo,
  };

  Object.keys(merged).forEach((key) => {
    const typedKey = key as keyof ContactInfo;
    if (!merged[typedKey] || merged[typedKey]?.trim() === '') {
      delete merged[typedKey];
    }
  });

  saveContactInfo(merged);
  return merged;
}

/**
 * Checks if contact information is complete
 * Complete means: (name AND email) OR (name AND phone)
 * @param contactInfo - Contact information to check
 * @returns True if required fields are present
 */
export function isContactInfoComplete(contactInfo: ContactInfo): boolean {
  const hasName = contactInfo.name && contactInfo.name.length >= 2;
  const hasEmail = contactInfo.email && contactInfo.email.includes('@');
  const hasPhone = contactInfo.phone && contactInfo.phone.trim().length >= 10;

  return !!(hasName && (hasEmail || hasPhone));
}

/**
 * Clears contact information from localStorage
 */
export function clearContactInfo(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(CONTACT_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing contact info:', error);
  }
}

