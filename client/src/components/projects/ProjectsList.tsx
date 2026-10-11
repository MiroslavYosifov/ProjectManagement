import { useProjects } from '../../context/ProjectsContext';
import ProjectItem from './ProjectItem';

export default function ProjectsList() {

  const { projects, loading, error } = useProjects();

  if(loading)  return (
    <div className="loader loading">
      Loading...
    </div>
  );

  if(error)  return (
    <div className="error">
      {error}
    </div>
  );

  return (
    <div className="list-items">
      <ul>
        {projects.map((projectData) => {
          return (
            <ProjectItem key={projectData.id} projectData={projectData} />
          )
        })}
      </ul>
    </div>
  );
}
