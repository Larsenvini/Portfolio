import React, { useEffect, useState } from "react";
import { LinkedinIcon, Github, Mail, FileText } from "lucide-react";

import ProjectCard from "./components/ProjectCard";
import SkillsSection from "./components/SkillsSection";
import profileData from "./data/ProfileData.js";

function App() {
  const carouselImages = [
    "/img/programming-code-minimalism-wallpaper-preview.jpg", // Replace with your image paths
    "/img/laptop-computer-dark-room.jpg",
    "/img/about2.jpg",
  ];

  // State for the carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
        );
        setFade(false);
      }, 500); // Transition duration
    }, 3500); // Slide interval duration

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-900">Vinicius Larsen Dev</h1>
          <nav className="flex space-x-6">
            {["About", "Skills", "Projects", "Contact"].map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="text-gray-600 hover:text-gray-900 transition duration-300"
              >
                {section}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Professional Section */}
      <section className="container mx-auto px-4 py-16 flex items-center">
        <div className="w-1/2 pr-12">
          <img
            src={profileData.profileImage}
            alt={profileData.name}
            className="rounded-full w-64 h-64 object-cover mx-auto shadow-xl border border-gray-200"
          />
        </div>
        <div className="w-1/2">
          <h3 className="text-4xl text-black mb-6">{profileData.title}</h3>

          <div className="flex space-x-6 mt-4">
            <a
              href={profileData.contacts.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              <LinkedinIcon />
            </a>
            <a
              href={profileData.contacts.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              <Github />
            </a>
            <a
              href={`mailto:${profileData.contacts.email}`}
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              <Mail />
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection skills={profileData.skills} />

      {/* About Me Section */}
      <section id="about" className="container mx-auto px-4 py-16 flex items-center">
        <div className="w-1/2 pr-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">About Me</h2>
          <p className="text-gray-600 mb-6">{profileData.aboutMe}</p>
          <a
            href="/Vinicius_Larsen_Santos_Dev.pdf"
            target="_blank"
            className="inline-flex items-center bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300"
          >
            <FileText className="mr-2" /> Download Resume
          </a>
        </div>
        <div className="w-1/2 pl-16">
          {/* Carousel Container */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <img
                src={carouselImages[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {profileData.projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-gray-600 mb-8">
            Feel free to reach out for collaboration or just to say hello!
          </p>
          <a
            href={`mailto:${profileData.contacts.email}`}
            className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-700 transition duration-300 inline-flex items-center"
          >
            <Mail className="mr-2" /> Contact Me
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Vinicius Larsen. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
