/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProjectsQuery } from "@/redux/api/blogs.slice";
import Link from "next/link";

export default function Blogs() {
  const { data: blogResponse, isLoading, isError } = useGetAllProjectsQuery({});
  const blogs = blogResponse?.data || [];
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Prjects</h1>
        <Link href="/dashboard/addproject">
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500">
            Add Project
          </button>
        </Link>
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to fetch blogs.</p>}
      
      {blogs?.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid gap-4 ">
          {blogs?.map((blog: any) => (
            <div key={blog._id} className="p-6 border rounded-lg shadow bg-slate-200 ">
              {blog.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={blog.image}
                  alt='Project'
                  className="w-full h-auto max-h-80 object-cover rounded"
                />
              )}
              <p className="mt-2 text-gray-700">{blog.description.slice(0, 100)}...</p>
              <p className="text-sm text-gray-600">Link: {blog.link}</p>
              <Link href={`/dashboard/projects/${blog._id}`}>
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
