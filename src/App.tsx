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

function readPageFromHash(): PageKey {
  const hash = window.location.hash.replace(/^#\/?/, '');
  return (VALID_PAGES as string[]).includes(hash) ? (hash as PageKey) : 'home';
}

function App() {
  const [page, setPage] = useState<PageKey>(readPageFromHash);

  const navigate = useCallback((next: PageKey) => {
    setPage(next);
    window.history.replaceState(null, '', `#/${next === 'home' ? '' : next}`);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    const onHash = () => setPage(readPageFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
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
