/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAddBlogMutation } from "@/redux/api/blogs.slice";

export default function CreateBlog() {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Mutation for adding a blog
  const [addBlog, { isLoading }] = useAddBlogMutation();

  // Function to upload image to ImageBB
  const uploadImageToImageBB = async (imageFile: File) => {
    const apiKey = '8d2b56eb726d92e77c483dbf69cbd97c'; 
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      setLoading(true);
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        return result.data.url;
      } else {
        console.error('Image upload failed:', result.error);
        return '';
      }
    } catch (error) {
      setLoading(false);
      console.error("Error uploading image:", error);
      return '';
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (data.image instanceof File) {
        const imageURL = await uploadImageToImageBB(data.image);
        data.image = imageURL;
      }
      
      // Call mutation to send data to backend
      const response = await addBlog({
        title: data.title,
        content: data.content,
        category: data.category,
        image: data.image || "", // Ensure image is not undefined
      }).unwrap();

      console.log("Blog added successfully:", response);
      reset(); // Reset form after submission
      router.push("/dashboard/blogs"); // Redirect to blogs page
    } catch (error) {
      console.error("Failed to add blog:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 py-24">
      <h1 className="text-2xl font-bold mb-4 text-center">Create a New Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{String(errors.title.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            {...register("content", { required: "Content is required" })}
            className="w-full p-2 border rounded"
          />
          {errors.content && <p className="text-red-500 text-sm">{String(errors.content.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select {...register("category", { required: "Category is required" })} className="w-full p-2 border rounded">
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{String(errors.category.message)}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
              <input
                type="file"
                {...field}
                onChange={(e) => onChange(e.target.files?.[0])}
              />
            )}
          />
        </div>

        <button type="submit" className="w-full bg-gray-800 text-white p-2 rounded" disabled={loading || isLoading}>
          {loading || isLoading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
