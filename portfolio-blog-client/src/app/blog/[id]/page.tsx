/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import { useGetSingleBlogQuery} from '@/redux/api/blogs.slice';

const BlogpageDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setBlogId] = useState<string>('');

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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (

    <div className="p-10 max-w-2xl mx-auto bg-gray-100 text-black shadow-lg rounded-lg mt-11">
  <h1 className="text-3xl font-bold text-center mb-4">{blog?.data?.title}</h1>

  {blog?.data?.image && (
    <div className="flex justify-center">
      <img
        src={blog?.data?.image}
        alt={blog?.data?.title}
        className="w-full max-w-lg h-auto max-h-80 object-cover rounded-lg"
      />
    </div>
  )}

  <p className="mt-4 text-sm text-black text-center font-semibold">
    <span className="font-semibold">Category:</span> {blog?.data?.category}
  </p>

  <p className="mt-4 text-black text-justify font-semibold">{blog?.data?.content}</p>
</div>
  );
};

export default BlogpageDetails;
