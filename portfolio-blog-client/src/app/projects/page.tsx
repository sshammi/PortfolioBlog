/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProjectsQuery } from "@/redux/api/blogs.slice";
import Link from "next/link";

export default function Blogs() {
  const { data: blogResponse, isLoading, isError } = useGetAllProjectsQuery({});
  const blogs = blogResponse?.data || [];
  return (
    <div className="max-w-4xl mx-auto p-4">
  <div className="flex justify-center items-center my-6">
    <h1 className="text-3xl font-bold text-center">All Projects</h1>
  </div>

  {isLoading && <p className="text-center text-gray-500">Loading...</p>}
  {isError && <p className="text-center text-red-500">Failed to fetch projects.</p>}

  {blogs?.length === 0 ? (
    <p className="text-center text-gray-500">No projects available.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {blogs?.map((blog: any) => (
        <div key={blog._id} className="p-6 border rounded-lg shadow bg-slate-200">
          {blog.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={blog.image}
              alt="Project"
              className="w-full h-auto max-h-60 object-cover rounded"
            />
          )}
          <h2 className="text-xl font-bold mt-2">{blog.description.slice(0, 50)}...</h2>
          <p className="text-sm text-gray-600">Link: 
            <a href={blog.link} className="text-blue-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">
              {blog.link}
            </a>
          </p>
          <Link href={`/projects/${blog._id}`}>
            <button className="mt-2 text-blue-500 hover:underline">
              Read More
            </button>
          </Link>
        </div>
      ))}
    </div>
  )}
</div>
  );
}
