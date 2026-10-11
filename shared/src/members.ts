import type { Timestamp } from './common.js';

export type ProjectRole = 'VIEWER' | 'EDITOR' | 'OWNER';

export type AssignableRole = Exclude<ProjectRole, 'OWNER'>;

export type Member = {
  user_id: string;
  email: string;
  username: string | null;
  role: ProjectRole;
  created_at: Timestamp;
};

export type SetMemberRequest = {
  email: string;
  role: AssignableRole;
};

export type SetMemberResult = {
  user_id: string;
  email: string;
  role: AssignableRole;
};

export type MemberListResponse = { members: Member[] };

export type SetMemberResponse = { member: SetMemberResult };
