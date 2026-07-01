import ProjectCreateForm from '../components/projects/ProjectCreateForm';
import ProjectsList from '../components/projects/ProjectsList'
import { ProjectsProvider } from '../context/ProjectsContext';

export default function ProjectsPage() {
  return (
    <ProjectsProvider>
      <div className="project-page">
        <h1>Projects</h1>
        <button className="btn">Create Project</button>
        <div className='form-container'>
          <ProjectCreateForm/>
        </div>
        <div className='list-containter'>
          <ProjectsList/>
        </div>
      </div>
    </ProjectsProvider>
  );
}


