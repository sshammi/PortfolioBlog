/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllBlogsQuery } from "@/redux/api/blogs.slice";
import Link from "next/link";

export default function Blogs() {
  const { data: blogResponse, isLoading, isError } = useGetAllBlogsQuery({});
  const blogs = blogResponse?.data || [];
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Blogs</h1>
        <Link href="/dashboard/addblog">
          <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-500">
            Add Blog
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
                  alt={blog.title}
                  className="w-full h-auto max-h-80 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-bold mt-2">{blog.title}</h2>
              <p className="text-sm text-gray-600">Category: {blog.category}</p>
              <p className="mt-2 text-gray-700">{blog.content.slice(0, 100)}...</p>
              <Link href={`/dashboard/blogs/${blog._id}`}>
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
