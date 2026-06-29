import { useProjects } from '../projects/useProjects.js';
import ProjectItem from './ProjectItem.jsx';

// Списък с проектите на потребителя (собствени + споделени).
export default function ProjectList() {
  const { projects, loading, error } = useProjects();

  if (loading) return <p className="muted">Зареждане...</p>;
  if (error) return <p className="error">{error}</p>;
  if (projects.length === 0) {
    return <p className="muted">Все още няма проекти.</p>;
  }

  return (
    <ul className="project-list">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
}
