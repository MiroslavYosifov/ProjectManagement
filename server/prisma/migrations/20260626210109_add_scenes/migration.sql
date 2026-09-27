-- CreateTable
CREATE TABLE "scenes" (
    "id" UUID NOT NULL,
    "project_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "data" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "scenes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "scenes_project_id_idx" ON "scenes"("project_id");

-- AddForeignKey
ALTER TABLE "scenes" ADD CONSTRAINT "scenes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
