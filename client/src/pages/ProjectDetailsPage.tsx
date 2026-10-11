import { Link } from 'react-router-dom';
import ProjectDetail from '../components/projects/ProjectDetail';

export default function ProjectDetailsPage() {
  return (
    <div className='project-detail-page'>
      <p>
        <Link to="/projects">← Back to projects</Link>
      </p>
      <h1>Project details</h1>
      <ProjectDetail/>
    </div>
  );
}