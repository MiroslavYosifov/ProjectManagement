import { useContext } from 'react';
import { ProjectsContext } from './ProjectsContext.js';

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('useProjects трябва да се ползва вътре в <ProjectsProvider>');
  }
  return ctx;
}
