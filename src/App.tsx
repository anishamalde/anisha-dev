import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';
import { Home } from './pages/Home';
import { Blog } from './pages/Blog';
import { Talks } from './pages/Talks';
import { Code } from './pages/Code';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import type { PageKey } from './data';
import './App.css';

const VALID_PAGES: PageKey[] = ['home', 'blog', 'talks', 'code', 'about', 'contact'];

// Old hash links (/#/code) still work: they're mapped to the clean path on load
function readPageFromLocation(): PageKey {
  const hash = window.location.hash.replace(/^#\/?/, '');
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const page = hash || path;
  return (VALID_PAGES as string[]).includes(page) ? (page as PageKey) : 'home';
}

function pathFor(page: PageKey): string {
  return page === 'home' ? '/' : `/${page}`;
}

function App() {
  const [page, setPage] = useState<PageKey>(readPageFromLocation);

  const navigate = useCallback((next: PageKey) => {
    setPage(next);
    window.history.pushState(null, '', pathFor(next));
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    // Replace any old hash URL with its clean path once on load
    if (window.location.hash) {
      window.history.replaceState(null, '', pathFor(readPageFromLocation()));
    }
    const onPopState = () => setPage(readPageFromLocation());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <div>
      <Nav page={page} onNavigate={navigate} />
      <AnimatePresence mode="wait">
        <PageTransition key={page}>
          {page === 'home' && <Home onNavigate={navigate} />}
          {page === 'blog' && <Blog />}
          {page === 'talks' && <Talks />}
          {page === 'code' && <Code />}
          {page === 'about' && <About />}
          {page === 'contact' && <Contact />}
        </PageTransition>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default App;
