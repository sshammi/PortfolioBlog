/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useForm, FieldValues, SubmitErrorHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetSingleBlogQuery, useUpdateBlogMutation } from '@/redux/api/blogs.slice';

const UpdateBlogPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const [id, setBlogId] = useState<string>('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    const fetchBlogId = async () => {
      try {
        const resolvedParams = await params;
        const { id } = resolvedParams;
        setBlogId(id);
      } catch (error) {
        console.error('Error resolving blogId:', error);
      }
    };
    fetchBlogId();
  }, [params]);

  const { data: blog, isLoading, isError } = useGetSingleBlogQuery(id);
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

  useEffect(() => {
    if (blog?.data) {
      setValue('title', blog.data.title);
      setValue('content', blog.data.content);
      setValue('category', blog.data.category);
    }
  }, [blog, setValue]);

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating blog...');
    try {
      const updateData = {
        id,
        data: {
          title: data.title,
          content: data.content,
          category: data.category,
        },
      };
      await updateBlog(updateData).unwrap();
      toast.success('Blog updated successfully!', { id: toastId });
      router.push('/dashboard/blogs');
    } catch (error:any) {
      toast.error(error.data?.message || 'Failed to update blog', { id: toastId });
      console.error('Update blog error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading blog data</div>;
  }

  return (
    <div className='max-w-2xl mx-auto p-6 py-24'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-80'>
      <h1 className="text-2xl font-bold mb-4 text-center">Update Blog</h1>      
        <div>
          <label className='block text-sm font-medium text-gray-700'>Title</label>
          <input 
          type='text'
          defaultValue={blog?.title}
          placeholder='Title' {...register('title')} className={errors.title ? 'border-red-500' : 'w-full p-2 border rounded'} />
          {errors.title && <span className='text-red-500 text-sm'>{errors.title.message?.toString()}</span>}
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>Content</label>
          <input 
          type='text'
          defaultValue={blog?.content}
          placeholder='Content' {...register('content')} className={errors.content ? 'border-red-500' : 'w-full p-2 border rounded'} />
          {errors.content && <span className='text-red-500 text-sm'>{errors.content.message?.toString()}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register("category")}
            className={`w-full p-2 border rounded-md ${errors.category ? "border-red-500" : ""}`}
            defaultValue={blog?.category}
          >
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
          </select>
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message?.toString()}</span>}
        </div>


        <button type='submit' className='w-full bg-gray-800 text-white' disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UpdateBlogPage;
