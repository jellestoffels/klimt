import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  
  // Header scroll behavior: 0.6 Global header
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={clsx(
        "fixed top-0 left-0 w-full z-50 flex justify-between items-center px-[20px] tablet:px-[32px] desktop:px-[48px] transition-colors duration-300",
        // Height: 56px mobile, 64px tablet/desktop
        "h-headerMobile tablet:h-headerDesktop",
        // Scroll behavior
        scrolled ? "bg-paper/90 border-b border-borderSubtle backdrop-blur-sm" : "bg-transparent"
      )}>
        <div className="font-medium text-nav">
          <Link href="/">Studio Klimt</Link>
        </div>
        <nav className="flex gap-s4 tablet:gap-s5 text-nav font-medium">
          {/* Active link uses grey */}
          <Link href="/projects" className={router.pathname.startsWith('/projects') ? 'text-grey' : ''}>Projects</Link>
          <Link href="/info" className={router.pathname === '/info' ? 'text-grey' : ''}>Info</Link>
          <Link href="/contact" className={router.pathname === '/contact' ? 'text-grey' : ''}>Contact</Link>
        </nav>
      </header>
      
      <main className="min-h-screen pt-[120px] px-[20px] tablet:px-[32px] desktop:px-[48px] max-w-[1200px] mx-auto">
        {children}
      </main>
    </>
  );
}