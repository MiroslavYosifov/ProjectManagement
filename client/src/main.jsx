import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './auth/AuthProvider.jsx';
import { ProjectsProvider } from './projects/ProjectsProvider.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <App />
      </ProjectsProvider>
    </AuthProvider>
  </StrictMode>,
);
