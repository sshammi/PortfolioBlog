/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react';
import { useForm, FieldValues, SubmitErrorHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetSingleProjectQuery, useUpdateProjectMutation } from '@/redux/api/blogs.slice';

const UpdateProjectPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string>('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    const fetchProjectId = async () => {
      try {
        const resolvedParams = await params;
        const { projectId } = resolvedParams;
        setProjectId(projectId);
      } catch (error) {
        console.error('Error resolving projectId:', error);
      }
    };
    fetchProjectId();
  }, [params]);

  const { data: project, isLoading, isError } = useGetSingleProjectQuery(projectId);
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  useEffect(() => {
    if (project?.data) {
      setValue('description', project.data.description);
      setValue('link', project.data.link);
    }
  }, [project, setValue]);

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating project...');
    try {
      const updateData = {
        projectId,
        data: {
          description: data.description,
          link: data.link,
        },
      };
      await updateProject(updateData).unwrap();
      toast.success('Project updated successfully!', { id: toastId });
      router.push('/dashboard/projects');
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to update project', { id: toastId });
      console.error('Update project error:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading project data</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 py-24">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Project</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            defaultValue={project?.data?.description}
            placeholder="Description"
            {...register('description')}
            className={errors.description ? 'border-red-500' : 'w-full p-2 border rounded'}
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message?.toString()}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Link</label>
          <input
            type="text"
            defaultValue={project?.data?.link}
            placeholder="Project Link"
            {...register('link')}
            className={errors.link ? 'border-red-500' : 'w-full p-2 border rounded'}
          />
          {errors.link && <span className="text-red-500 text-sm">{errors.link.message?.toString()}</span>}
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white"
          disabled={isUpdating}
        >
          {isUpdating ? 'Updating...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UpdateProjectPage;
