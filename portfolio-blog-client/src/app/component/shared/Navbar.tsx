'use client'

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setIsMenuOpen(false);
  };
  return (
    <nav className="bg-gray-800 text-white py-5">
      <div className="container mx-auto flex items-center justify-between px-20">
        <Link href="/" className="text-2xl font-bold">
          SHAMMI
        </Link>
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <ul
          className={`lg:flex lg:space-x-8 absolute lg:static bg-gray-800 w-full lg:w-auto transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'top-16 left-0' : '-top-40'
          } lg:top-0 lg:left-0 lg:space-x-8 lg:items-center p-4 lg:p-0`}
        >
          <li>
            <Link
              href="/"
              onClick={handleClick}
              className={`flex items-center space-x-2 ${pathname === '/' ? 'text-blue-500' : 'text-white'}`}
            >
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              onClick={handleClick}
              className={`flex items-center space-x-2 ${pathname === '/projects' ? 'text-blue-500' : 'text-white'}`}
            >
              <span>Projects</span>
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              onClick={handleClick}
              className={`flex items-center space-x-2 ${pathname === '/blog' ? 'text-blue-500' : 'text-white'}`}
            >
              <span>Blog</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={handleClick}
              className={`flex items-center space-x-2 ${pathname === '/contact' ? 'text-blue-500' : 'text-white'}`}
            >
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link
                href="/dashboard"
                onClick={handleClick}
                className="flex items-center space-x-2 font-semibold"
              >
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
