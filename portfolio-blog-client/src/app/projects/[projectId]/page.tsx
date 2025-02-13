/* eslint-disable @next/next/no-img-element */
'use client';
import { useState, useEffect } from 'react';
import { useGetSingleProjectQuery } from '@/redux/api/blogs.slice';


const ProjectDetails = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const [projectId, setProjectId] = useState<string>('');

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
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="p-10 max-w-2xl mx-auto bg-gray-100 text-black shadow-lg rounded-lg mt-11">
  <h1 className="text-3xl font-bold text-center mb-4">{project?.data?.description}</h1>

  {project?.data?.image && (
    <div className="flex justify-center">
      <img
        src={project?.data?.image}
        alt={project?.data?.description}
        className="w-full max-w-lg h-auto max-h-80 object-cover rounded-lg"
      />
    </div>
  )}

  <p className="mt-4 text-sm text-black text-center font-semibold">
    <span className="font-semibold">Link:</span> 
    <a 
      href={project?.data?.link} 
      className="text-blue-500 hover:underline break-all"
      target="_blank" 
      rel="noopener noreferrer"
    >
      {project?.data?.link}
    </a>
  </p>
</div>
  );
};

export default ProjectDetails;
