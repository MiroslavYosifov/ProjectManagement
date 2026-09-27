import { useState } from 'react';
import ProjectCreateForm from '../components/projects/ProjectCreateForm';
import ProjectsList from '../components/projects/ProjectsList'
import { ProjectsProvider } from '../context/ProjectsContext';

export default function ProjectsPage() {

  const [hasForm, setHasForm] = useState(false);

  function onAddProject(e) {
    e.preventDefault();
    setHasForm(!hasForm);
  }

  return (
    <ProjectsProvider>
      <div className="project-page">
        <h1>Projects</h1>
        <button className="btn" onClick={onAddProject}>Add Project</button>
        <div className={`form-container form-create ${hasForm ? "active" : "" }`}>
          <ProjectCreateForm onSuccess={() => setHasForm(false)} />
        </div>
        <div className='list-containter'>
          <ProjectsList/>
        </div>
      </div>
    </ProjectsProvider>
  );
}


