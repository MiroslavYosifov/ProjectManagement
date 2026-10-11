import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { listProjects, postProject, deleteProject } from '../api/projects';
import { getErrorMessage } from '../api/client';
import type { Project } from '../types/api';

type ProjectsContextValue = {
  projects: Project[];
  loading: boolean;
  error: string | null;
  createProject: (data: { name: string; description: string }) => Promise<Project>;
  removeProject: (id: string) => Promise<void>;
  reload: () => Promise<void>;
};

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await listProjects({ page: 1, limit: 20 });
        if (!ignore) setProjects(data.projects);
      } catch (err) {
        if (!ignore) setError(getErrorMessage(err, 'Failed to load projects'));
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  async function reload() {
    setError(null);
    const data = await listProjects({ page: 1, limit: 20 });
    setProjects(data.projects);
  }

  async function createProject({ name, description }: { name: string; description: string }) {
    const data = await postProject({ name, description });
    setProjects((prev) => [data.project, ...prev]);
    return data.project;
  }

  async function removeProject(id: string) {
    await deleteProject(id);
    setProjects((prev) => prev.filter(p => p.id !== id));
  }

  const value = { projects, loading, error, createProject, removeProject, reload };

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === null) {
    throw new Error('useProjects must be used in <ProjectsProvider>');
  }
  return context;
}
