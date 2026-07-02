import { createContext, useContext, useEffect, useState } from 'react';

import { listProjects, postProject, deleteProject } from '../api/projects';

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await listProjects({ page: 1, limit: 20 });
        if (!ignore) setProjects(data.projects);
      } catch (err) {
        if (!ignore) setError(err.message || 'Failed to load projects');
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

  async function createProject({ name, description }) {
    const data = await postProject({ name, description });
    setProjects((prev) => [data.project, ...prev]);
    return data.project;
  }

  async function removeProject(id) {
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
