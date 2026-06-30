// Placeholder за детайлите на проект — показва id-то от URL-а и линк назад.
// Пълните детайли (зареждане през getProject, сцени, членове) идват по-късно.

import { useParams, Link } from 'react-router-dom';

export default function ProjectDetailsPage() {
  const { id } = useParams();

  return (
    <>
      <h1>Project details</h1>
      <p className="muted">
        Project ID: <code>{id}</code>
      </p>
      <p>
        <Link to="/projects">← Back to projects</Link>
      </p>
    </>
  );
}
