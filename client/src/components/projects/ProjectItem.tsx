import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { useProjects } from '../../context/ProjectsContext';
import type { Project } from '@game-editor/shared';

export default function ProjectItem({ projectData }: { projectData: Project }) {
    const { id, name, description } = projectData;
    const { projects, loading, error, removeProject } = useProjects();

    async function onDeleteHandler(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        console.log("ID ==> ", id);
        await removeProject(id);
    }

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
      <li className="project-row">
        <div className="project-name">{name}</div>
        <div className="project-description">{description}</div>
        <div className="project-actions">
          
          <button type="button" className="btn btn-detail"><Link to={`/projects/${id}`}>Detail</Link></button>
          <button type="button" className="btn btn-delete" onClick={onDeleteHandler}>Delete</button>
        </div>
      </li>
    )
}