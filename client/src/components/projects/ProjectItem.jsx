import { useProjects } from '../../context/ProjectsContext';

export default function ProjectItem({ projectData }) {
    const { id, name, description } = projectData;
    const { projects, loading, error, removeProject } = useProjects();

    async function onDeleteHandler(e) {
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
          <button type="button" className="btn btn-detail">Detail</button>
          <button type="button" className="btn btn-delete" onClick={onDeleteHandler}>Delete</button>
        </div>
      </li>
    )
}