import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  page?: number;
}

function ScrollToTop({ page }: ScrollToTopProps) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname, page]);
  return null;
}

export default ScrollToTop;
