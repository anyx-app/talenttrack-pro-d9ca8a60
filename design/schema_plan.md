# Schema Plan - TalentTrack Pro

## Overview
TalentTrack Pro requires a relational database to manage recruitment workflows, including job postings, candidate management, applications, interviews, and communications. The schema is designed to be scalable for healthcare and finance sectors, though the core structure remains industry-agnostic with flexible fields.

## Tables

### 1. `profiles`
Extends the default Supabase `auth.users` table to store application-specific user data.
- **id** (uuid, PK): References `auth.users.id`.
- **email** (text): Denormalized for easier querying.
- **full_name** (text): Recruiter or Hiring Manager's name.
- **role** (text): Enum or string (e.g., 'admin', 'recruiter', 'hiring_manager'). Defaults to 'recruiter'.
- **avatar_url** (text): Optional profile picture.
- **created_at** (timestamptz): Default `now()`.

### 2. `jobs`
Represents job openings or requisitions.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **title** (text): Job title (e.g., "Senior Cardiologist", "Financial Analyst").
- **description** (text): Full job description (Rich text or Markdown).
- **department** (text): e.g., "Cardiology", "Finance", "HR".
- **location** (text): e.g., "New York, NY", "Remote".
- **type** (text): e.g., "Full-time", "Contract".
- **status** (text): Enum ('draft', 'published', 'closed'). Default 'draft'.
- **created_by** (uuid): References `profiles.id`.
- **created_at** (timestamptz): Default `now()`.
- **updated_at** (timestamptz).

### 3. `candidates`
Stores information about potential hires.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **first_name** (text).
- **last_name** (text).
- **email** (text): Unique constraint.
- **phone** (text).
- **linkedin_url** (text): Optional.
- **resume_url** (text): Link to stored file.
- **skills** (text[]): Array of strings for skills (e.g., ["ACLS", "Financial Modeling"]).
- **source** (text): Where the candidate came from (e.g., "LinkedIn", "Referral").
- **created_at** (timestamptz): Default `now()`.

### 4. `applications`
Join table connecting Candidates to Jobs, tracking the specific hiring process.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **job_id** (uuid): References `jobs.id`.
- **candidate_id** (uuid): References `candidates.id`.
- **status** (text): Enum ('applied', 'screening', 'interview', 'offer', 'hired', 'rejected'). Default 'applied'.
- **score** (int): Optional numeric score (1-100) for ranking.
- **notes** (text): General notes for this application context.
- **applied_at** (timestamptz): Default `now()`.
- **updated_at** (timestamptz).

### 5. `interviews`
Scheduled events related to an application.
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **application_id** (uuid): References `applications.id`.
- **interviewer_id** (uuid): References `profiles.id`.
- **scheduled_at** (timestamptz): When the interview takes place.
- **duration_minutes** (int): Default 30 or 60.
- **type** (text): Enum ('phone', 'video', 'onsite').
- **status** (text): Enum ('scheduled', 'completed', 'cancelled').
- **feedback** (text): Post-interview notes.
- **created_at** (timestamptz).

### 6. `communications`
Tracks emails and notes sent to candidates (CRM features).
- **id** (uuid, PK): Default `gen_random_uuid()`.
- **candidate_id** (uuid): References `candidates.id`.
- **sender_id** (uuid): References `profiles.id`.
- **type** (text): Enum ('email', 'note', 'call_log').
- **subject** (text): Optional (for emails).
- **body** (text): Content of the communication.
- **sent_at** (timestamptz): Default `now()`.

## Relationships
- `profiles` (1) -> (many) `jobs` (via created_by)
- `jobs` (1) -> (many) `applications`
- `candidates` (1) -> (many) `applications`
- `applications` (1) -> (many) `interviews`
- `candidates` (1) -> (many) `communications`
- `profiles` (1) -> (many) `communications` (via sender_id)

## Security Policies (RLS)
- **Select**: Authenticated users can read all data (Team-based visibility assumed for MVP).
- **Insert/Update**: Authenticated users can create/edit.
- **Delete**: Admins only (or creators of the record).
