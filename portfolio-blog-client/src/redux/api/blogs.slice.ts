/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://portfolio-blog-server-plum.vercel.app/api/' }),
  endpoints: (builder) => ({

    //----------------------------------Blog Section-----------------
    getAllBlogs: builder.query({
      query: () => ({
        url: '/blogs',
        method: 'GET',
      }),
      providesTags: ['blog'],
    }),

    addBlog: builder.mutation({
      query: (data) => ({
        url: '/blogs',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['blog'],
    }),

    // Get a single bike by ID
    getSingleBlog: builder.query({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: 'GET',
      }),
    }),

    // Delete a bike by id
    deleteBlog: builder.mutation({
      query: (id: string) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['blog'],
    }),

    // Update a bike by id
    updateBlog: builder.mutation({
      query: (payload: { id: string; data: any }) => ({
        url: `/blogs/update/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ['blog'],
    }),

    //----------------------------------Project section------------------------------------//
    addProject: builder.mutation({
      query: (data) => ({
        url: '/order',
        method: 'POST',
        body: data,
      }),
      invalidatesTags:['order']
    }),

     //get All orders
     getAllProjects: builder.query({
      query: () => ({
        url: '/order',
        method: 'GET',
      }),
      providesTags:['order'],
    }),

  //get single order
  getSingleProject: builder.query({
    query: (id: string) => ({
      url: `/order/${id}`,
      method: 'GET',
    }),
  }),

  // update order

  updateProject: builder.mutation({
    query: (payload: { projectId: string; data: any }) => ({
      url: `/order/update/${payload.projectId}`,
      method: "PATCH",
      body: payload.data,
    }),
    invalidatesTags:['order'],
  }),
  //delete project
  deleteProject: builder.mutation({
    query: (id: string) => ({
      url: `/order/${id}`,
      method: "DELETE",
    }),
    invalidatesTags: ['order'],
  }),

  //--------------------------------------------Message---------------------------

  addMessage: builder.mutation({
    query: (data) => ({
      url: '/msg',
      method: 'POST',
      body: data,
    }),
    invalidatesTags:['message']
  }),

   //get All orders
   getAllMessage: builder.query({
    query: () => ({
      url: '/msg',
      method: 'GET',
    }),
    providesTags:['message'],
  }),

  }),
  tagTypes: ['blog','order','message'],
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddBlogMutation, useGetAllBlogsQuery ,useGetSingleBlogQuery,useUpdateBlogMutation,useDeleteBlogMutation,
  useAddProjectMutation,useGetAllProjectsQuery,useGetSingleProjectQuery,useDeleteProjectMutation,useUpdateProjectMutation,
  useAddMessageMutation,useGetAllMessageQuery
} = baseApi;