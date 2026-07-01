// Placeholder за списъка с проекти — пълната реализация (зареждане от API,
// ProjectList / ProjectForm) идва в следваща стъпка.
import ProjectCreateForm from '../components/projects/ProjectCreateForm';
import ProjectsList from '../components/projects/ProjectsList'

export default function ProjectsPage() {
  return (
    <div className="project-page">
      <h1>Projects</h1>
      <button className="btn">Create Project</button>
      <div className='form-container'>
        <ProjectCreateForm/>
      </div>
      <div className='list-containter'>
        <ProjectsList/>
      </div>
      <p className="muted">The project list will appear here.</p>
    </div>
  );
}


