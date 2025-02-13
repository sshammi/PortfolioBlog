/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";

export type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { formState: { errors }, } = useForm<FormValues>();

  return (
    <div className="my-10 w-[90%] mx-auto flex justify-center items-center">
      <div className="md:grid-cols-2 gap-8 md:gap-10 items-center justify-center">
        <h1 className="text-center text-4xl mb-5 font-bold">
          Login <span className="text-teal-500">Here</span>
        </h1>
        <div className="w-[80%] mx-auto p-6 rounded-lg">
          <p className="text-center mt-6 text-sm text-black font-semibold">
            Sign Up Using
          </p>

          {/* Social Login Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
              onClick={() => signIn('google', {
                callbackUrl: 'https://portfolio-blog-bay.vercel.app/dashboard',
              })}>
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={30}
                height={30}
                alt="Google logo"
              />
            </button>
            <button className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
              onClick={() => signIn('github', {
                callbackUrl: 'https://portfolio-blog-bay.vercel.app/dashboard',
              })}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={25}
                height={25}
                alt="GitHub logo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
