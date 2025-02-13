/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllMessageQuery } from "@/redux/api/blogs.slice";

export default function Messages() {
 
 const {data:getAllMessages,isLoading, isError } = useGetAllMessageQuery({});
  const messages=getAllMessages?.data||[];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Messages</h1>
      </div>

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Failed to fetch messages.</p>}

      {messages?.length === 0 ? (
        <p className="text-center text-gray-500">No messages available.</p>
      ) : (
        <div className="grid gap-4">
          {messages?.map((message: any) => (
            <div key={message._id} className="p-6 border rounded-lg shadow bg-slate-200">
              <h2 className="text-xl font-bold mt-2">{message.name}</h2>
              <p className="text-sm text-gray-600">Email: {message.email}</p>
              <p className="mt-2 text-gray-700">{message.message.slice(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
