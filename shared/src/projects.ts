import type { Timestamp } from './common.js';
import type { ProjectRole } from './members.js';

export type Project = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: Timestamp;
  updated_at: Timestamp;
};

export type ProjectWithRole = Project & { role: ProjectRole };

export type CreateProjectRequest = {
  name: string;
  description?: string | null;
};

export type UpdateProjectRequest = Partial<CreateProjectRequest>;

export type ProjectListResponse = { projects: ProjectWithRole[] };

export type ProjectResponse = { project: Project };
