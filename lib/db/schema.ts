import { pgTable, uuid, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

/**
 * Contact form submissions table
 */
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Profile information table
 */
export const profile = pgTable('profile', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  bio: jsonb('bio').$type<string[]>().notNull(),
  profileImageUrl: text('profile_image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Skills table
 */
export const skills = pgTable('skills', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  category: text('category'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Work experience table
 */
export const workExperience = pgTable('work_experience', {
  id: uuid('id').defaultRandom().primaryKey(),
  companyName: text('company_name').notNull(),
  companyLogoUrl: text('company_logo_url'),
  position: text('position').notNull(),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  isCurrent: boolean('is_current').notNull().default(false),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

/**
 * Education table
 */
export const education = pgTable('education', {
  id: uuid('id').defaultRandom().primaryKey(),
  institutionName: text('institution_name').notNull(),
  institutionLogoUrl: text('institution_logo_url'),
  degree: text('degree').notNull(),
  field: text('field'),
  description: text('description'),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

