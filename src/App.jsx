import React from 'react';
import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const AVATAR = (
  <NavLink to="/" aria-label="Home" style={{ display: 'block', margin: '0 auto', width: 'fit-content' }}>
    <img
      src={`${process.env.PUBLIC_URL}/gene-sequence-svgrepo-com.svg`}
      alt="Gene Sequence Logo"
      width={120}
      height={120}
      style={{ display: 'block', margin: '0 auto' }}
    />
  </NavLink>
);

const SOCIALS = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/francisco-rsantos/', label: 'LinkedIn' },
  { icon: <FaGithub />, url: 'https://github.com/qtoino', label: 'GitHub' },
];

function MainLayout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <>
      {!isHome && (
        <nav className="top-nav">
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Résumé</NavLink>
        </nav>
      )}
      <div className="centered-layout">
        <div className="content-wrapper">
          {AVATAR}
          <h1 className="main-title">Francisco Santos</h1>
          <div className="subtitle">AI engineer, computational creativity enthusiast</div>
          <div className="social-row">
            {SOCIALS.map(({ icon, url, label }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-icon">
                {icon}
              </a>
            ))}
          </div>
          {isHome && <hr />}
          {isHome && (
            <nav className="main-nav">
              <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>Projects</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Résumé</NavLink>
            </nav>
          )}
          <div className="page-content">{children}</div>
        </div>
        <footer className="footer">
          <div>© {new Date().getFullYear()} Francisco Santos</div>
        </footer>
      </div>
    </>
  );
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      </Routes>
    </Router>
  );
};

export default App;