'use client';

import { CldImage } from 'next-cloudinary';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';

const Home = () => {
  const skills = [
    { name: 'React', icon: <FaReact size={50} className="text-blue-500 mb-2" />, percentage: 90, color: 'bg-blue-500' },
    { name: 'Node.js', icon: <FaNodeJs size={50} className="text-green-500 mb-2" />, percentage: 85, color: 'bg-green-500' },
    { name: 'Database', icon: <FaDatabase size={50} className="text-red-500 mb-2" />, percentage: 80, color: 'bg-red-500' },
    { name: 'HTML5', icon: <FaHtml5 size={50} className="text-orange-500 mb-2" />, percentage: 95, color: 'bg-orange-500' },
    { name: 'CSS3', icon: <FaCss3Alt size={50} className="text-blue-400 mb-2" />, percentage: 85, color: 'bg-blue-400' },
    { name: 'JavaScript', icon: <FaJs size={50} className="text-yellow-500 mb-2" />, percentage: 80, color: 'bg-yellow-500' },
  ];
  const projects = [
    {
      id: 1,
      title: 'Bike Store Website',
      description: 'A modern bike store with dynamic product listing.',
      image: 'Screenshot_2025-02-11_113807_oudajn',
      link: 'https://github.com/sshammi/BikeStore',
    },
    {
      id: 2,
      title: 'E-commerce Dashboard',
      description: 'An admin dashboard to manage an e-commerce platform.',
      image: 'Screenshot_2025-02-11_113926_nhlmnz',
      link: 'https://github.com/sshammi/Bike-store-server',
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A personal portfolio built with Next.js & Tailwind CSS.',
      image: 'Screenshot_2025-02-11_103542_rkluri',
      link: '/projects/portfolio',
    },
  ];
  return (
    <div>
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-10 text-center lg:text-left flex flex-col lg:flex-row items-center">
          <motion.div
            className="lg:w-1/2 space-y-6 px-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-4xl font-bold leading-tight">
              Hi, I am <span className="text-blue-500">Shammi</span>
            </h1>
            <p className="text-lg">
              I am a passionate developer focused on building modern web applications. I love coding, learning new technologies, and solving complex problems.
            </p>
            <p className="text-lg">
              Currently, I’m exploring new front-end frameworks and building cool projects. Let’s connect and create something awesome together!
            </p>
          </motion.div>

          <motion.div
            className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <CldImage
              src="photo_2024-12-07_21-53-12_v81v6k"
              alt="Shammi's Photo"
              width={300}
              height={300}
              className="rounded-full object-cover shadow-lg"
            />
          </motion.div>
        </div>

        <div className="container mx-auto px-6 text-center py-20">
          <h2 className="text-4xl font-bold mb-14">Skills</h2>

          {/* Icons Grid */}
          <div className="grid grid-cols-2 gap-8 mb-12 sm:grid-cols-3">
            {skills.map((skill, index) => (
              <div key={index} className="flex flex-col items-center">
                {skill.icon}
                <span className="font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-12">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-600 p-6 rounded-lg shadow-lg">
                <CldImage
                  src={project.image}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <p className="text-white mt-2">{project.description}</p>
                <Link href={project.link} className="mt-4 inline-block text-blue-200 hover:underline">
                  View Project →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://drive.google.com/file/d/1_LAh-sMUyew-PhPToWSk8YiWbS98hN2z/view?usp=sharing" // Replace with actual resume file path
            download="Shammi_Resume.pdf"
            className="px-6 py-3 bg-slate-400 text-gray-900 font-bold rounded-lg shadow-md hover:bg-blue-880 transition"
          >
            Download Resume
          </a>
        </div>
      </section>
    </div>

  );
};

export default Home;

