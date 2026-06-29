import { useCallback, useEffect, useState } from 'react';
import { ProjectsContext } from './ProjectsContext.js';
import * as projectsApi from '../api/projects.js';
import { useAuth } from '../auth/useAuth.js';

export function ProjectsProvider({ children }) {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Презарежда списъка от сървъра.
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await projectsApi.listProjects();
      setProjects(list);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Зареждаме при вход; чистим при изход.
  useEffect(() => {
    if (user) {
      refresh();
    } else {
      setProjects([]);
      setError(null);
    }
  }, [user, refresh]);

  // Създава проект и го добавя най-отгоре (бекендът сортира по created_at desc).
  // POST не връща поле role, но създателят винаги е OWNER — добавяме го локално,
  // за да се покажат баджът и бутоните за редакция/изтриване веднага.
  const create = useCallback(async ({ name, description }) => {
    const project = await projectsApi.createProject({ name, description });
    const withRole = { ...project, role: project.role ?? 'OWNER' };
    setProjects((prev) => [withRole, ...prev]);
    return withRole;
  }, []);

  // Обновява проект и заменя реда в локалния списък.
  const update = useCallback(async (projectId, changes) => {
    const project = await projectsApi.updateProject(projectId, changes);
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...project } : p)),
    );
    return project;
  }, []);

  // Изтрива проект и го маха от списъка.
  const remove = useCallback(async (projectId) => {
    await projectsApi.deleteProject(projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  }, []);

  return (
    <ProjectsContext.Provider
      value={{ projects, loading, error, refresh, create, update, remove }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}
