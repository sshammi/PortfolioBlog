/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAddMessageMutation } from "@/redux/api/blogs.slice";
import { toast } from "sonner";

export default function CreateMessage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Mutation for adding a message
  const [addMessage, { isLoading }] = useAddMessageMutation();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      
      // Call mutation to send data to backend
      const response = await addMessage({
        name: data.name,
        email: data.email,
        message: data.message,
      }).unwrap();
      alert("Message Sent successfully!");
      reset(); 
      router.push("/");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="max-w-2xl mx-auto p-6 py-24">
      <h1 className="text-2xl font-bold mb-4 text-center">Send a Message</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{String(errors.name.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{String(errors.email.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            {...register("message", { required: "Message is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.message && <p className="text-red-500 text-sm">{String(errors.message.message)}</p>}
        </div>

        <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded" disabled={loading || isLoading}>
          {loading || isLoading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
