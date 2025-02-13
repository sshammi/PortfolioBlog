/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDeleteProjectMutation, useGetSingleProjectQuery } from '@/redux/api/blogs.slice';


const ProjectDetails = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const [projectId, setProjectId] = useState<string>('');
  const [deleteProject] = useDeleteProjectMutation();
  const router = useRouter();

  useEffect(() => {
    const fetchProjectId = async () => {
      try {
        const resolvedParams = await params; // Await the promise resolution
        const { projectId } = resolvedParams;
        console.log(projectId);
        setProjectId(projectId); // Set the resolved projectId
      } catch (error) {
        console.error('Error resolving projectId:', error);
      }
    };

    fetchProjectId();
  }, [params]);

  const { data: project, isLoading } = useGetSingleProjectQuery(projectId)
  
  const handleUpdate = () => {
    router.push(`/dashboard/projects/update/${projectId}`);
  };

  const handleDelete = async () => {
    try {
      await deleteProject(projectId);
      router.push('/dashboard/projects'); // Redirect after deletion
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">{project?.data?.description}</h1>
      {project?.data?.image && (
        <img 
          src={project?.data?.image} 
          alt={project?.data?.description} 
          className="w-full h-auto max-h-80 object-cover rounded" 
        />
      )}
      <p className="mt-4 text-sm text-black">Link: <a href={project?.data?.link} className="text-blue-500">{project?.data?.link}</a></p>

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

export default ProjectDetails;
