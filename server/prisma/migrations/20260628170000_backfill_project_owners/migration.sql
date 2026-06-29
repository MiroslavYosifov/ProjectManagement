-- Backfill: every existing project's creator becomes its OWNER, so projects
-- created before the membership model keep full access for their owner.
-- Idempotent (ON CONFLICT) so it is safe to re-run / run after new projects
-- already self-register their owner via ProjectsService.create.
INSERT INTO "project_members" ("project_id", "user_id", "role")
SELECT "id", "user_id", 'OWNER'
FROM "projects"
ON CONFLICT ("project_id", "user_id") DO NOTHING;
