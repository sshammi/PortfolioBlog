/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetSingleBlogQuery, useDeleteBlogMutation } from '@/redux/api/blogs.slice';

const BlogpageDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setBlogId] = useState<string>('');
  const [deleteBlog] = useDeleteBlogMutation();
  const router = useRouter();

  useEffect(() => {
    const fetchBlogId = async () => {
      try {
        const resolvedParams = await params; // Await the promise resolution
        const { id } = resolvedParams;
        console.log(id)
        setBlogId(id); // Set the resolved blogId
      } catch (error) {
        console.error('Error resolving blogId:', error);
      }
    };

    fetchBlogId();
  }, [params]);
  const { data: blog, isLoading } = useGetSingleBlogQuery(id);
  const handleUpdate = () => {
    router.push(`/dashboard/blogs/update/${id}`);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(id);
      router.push('/dashboard/blogs'); // Redirect after deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">{blog?.data?.title}</h1>
      {blog?.data?.image && (
        <img src={blog?.data?.image} alt={blog.title} 
        className="w-full h-auto max-h-80 object-cover rounded" />
      )}
      <p className="mt-4 text-sm text-black">Category: {blog?.data?.category}</p>
      <p className="mt-2 text-black">{blog?.data?.content}</p>

      <div className="mt-4">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogpageDetails;
