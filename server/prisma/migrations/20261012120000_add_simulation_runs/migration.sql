-- CreateEnum
CREATE TYPE "SimulationRunStatus" AS ENUM ('RUNNING', 'COMPLETED', 'INTERRUPTED');

-- CreateTable
CREATE TABLE "simulation_runs" (
    "id" UUID NOT NULL,
    "scene_id" UUID NOT NULL,
    "setup" JSONB NOT NULL,
    "engine_version" INTEGER NOT NULL,
    "status" "SimulationRunStatus" NOT NULL DEFAULT 'RUNNING',
    "last_tick" INTEGER NOT NULL DEFAULT 0,
    "started_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_heartbeat_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMPTZ(6),

    CONSTRAINT "simulation_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation_run_chunks" (
    "run_id" UUID NOT NULL,
    "seq" INTEGER NOT NULL,
    "from_tick" INTEGER NOT NULL,
    "to_tick" INTEGER NOT NULL,
    "commands" JSONB NOT NULL,
    "events" JSONB NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulation_run_chunks_pkey" PRIMARY KEY ("run_id","seq")
);

-- CreateTable
CREATE TABLE "simulation_checkpoints" (
    "run_id" UUID NOT NULL,
    "tick" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "state" JSONB NOT NULL,

    CONSTRAINT "simulation_checkpoints_pkey" PRIMARY KEY ("run_id","tick")
);

-- CreateTable
CREATE TABLE "simulation_metrics" (
    "run_id" UUID NOT NULL,
    "tick" INTEGER NOT NULL,
    "values" JSONB NOT NULL,

    CONSTRAINT "simulation_metrics_pkey" PRIMARY KEY ("run_id","tick")
);

-- CreateIndex
CREATE INDEX "simulation_runs_scene_id_started_at_idx" ON "simulation_runs"("scene_id", "started_at");

-- CreateIndex
CREATE INDEX "simulation_runs_status_last_heartbeat_at_idx" ON "simulation_runs"("status", "last_heartbeat_at");

-- CreateIndex
CREATE INDEX "simulation_run_chunks_run_id_from_tick_idx" ON "simulation_run_chunks"("run_id", "from_tick");

-- AddForeignKey
ALTER TABLE "simulation_runs" ADD CONSTRAINT "simulation_runs_scene_id_fkey" FOREIGN KEY ("scene_id") REFERENCES "scenes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation_run_chunks" ADD CONSTRAINT "simulation_run_chunks_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "simulation_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation_checkpoints" ADD CONSTRAINT "simulation_checkpoints_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "simulation_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "simulation_metrics" ADD CONSTRAINT "simulation_metrics_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "simulation_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

