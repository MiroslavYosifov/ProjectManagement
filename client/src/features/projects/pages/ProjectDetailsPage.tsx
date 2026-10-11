import { Link, useParams } from 'react-router-dom';
import ProjectDetail from '../components/ProjectDetail';
import SceneList from '../../scenes/components/SceneList';

export default function ProjectDetailsPage() {
  const { id } = useParams();

  return (
    <div className='project-detail-page'>
      <p>
        <Link to="/projects">← Back to projects</Link>
      </p>
      <h1>Project details</h1>
      <ProjectDetail/>
      <SceneList projectId={id!} />
    </div>
  );
}