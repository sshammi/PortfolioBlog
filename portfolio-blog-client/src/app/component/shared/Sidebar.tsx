'use client'

import { signOut } from "next-auth/react";
import Link from "next/link";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 h-[100%] min-h-screen">
      <ul className="space-y-4">
        <li>
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-500 text-gray-700"
          >
            <FaHome className="h-5 w-5 text-white text-xl font-semibold" />
            <span className="text-white text-xl font-semibold">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-500 text-gray-700"
          >
            <span className="text-white text-xl font-semibold">Home</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/blogs"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-500 text-gray-700"
          >
            <span className="text-white text-xl font-semibold">Blogs</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/projects"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-500 text-gray-700"
          >
            <span className="text-white text-xl font-semibold">Projects</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/messages"
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-500 text-gray-700"
          >
            <span className="text-white text-xl font-semibold">Mesaages</span>
          </Link>
        </li>
        <li>
          <button
            onClick={() => signOut()} // Sign out logic
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-red-500 text-red-700 w-full"
          >
            <FaSignOutAlt className="h-5 w-5 text-white text-xl font-semibold" />
            <span className="text-white text-xl font-semibold">Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
