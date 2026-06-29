import { useAuth } from '../auth/useAuth.js';
import LogoutButton from '../components/LogoutButton.jsx';
import ProjectForm from '../components/ProjectForm.jsx';
import ProjectList from '../components/ProjectList.jsx';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home">
      <header className="topbar">
        <span className="greeting">
          Здравей, {user.username || user.email}
        </span>
        <LogoutButton />
      </header>

      <main className="content">
        <h1>Моите проекти</h1>

        <section className="projects-layout">
          <div className="card">
            <h2>Нов проект</h2>
            <ProjectForm />
          </div>

          <ProjectList />
        </section>
      </main>
    </div>
  );
}
