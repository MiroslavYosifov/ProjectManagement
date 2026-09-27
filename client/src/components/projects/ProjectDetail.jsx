import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProject } from '../../api/projects';

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;
        setLoading(true);
        setError(null);

        getProject(id)
            .then((data) => { if (!ignore) setProject(data.project); })
            .catch((err) => { if (!ignore) setError(err.message || 'Failed to load project'); })
            .finally(() => { if (!ignore) setLoading(false); });

        return () => { ignore = true; };
    }, [id]);

    if (loading) return <div className="loader loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!project) return null;

    return (
        <div className="project-detail">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </div>
    );
}
