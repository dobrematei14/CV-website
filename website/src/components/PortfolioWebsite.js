import React, { useState, useEffect } from 'react';
import { Github, Mail, Linkedin, ChevronDown, Download } from 'lucide-react';
import { GlowButton, IconOnlyButton, TruncatedButton } from './ButtonComponents';
import * as pdfjsLib from 'pdfjs-dist';
import AutoRotatingCards from './stackedCards';
import ExperienceSection from './experience';


// Create a proper worker configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.min.js`;

const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('');

  // Replace with your GitHub username
  const githubUsername = "dobrematei14";

  const generatePdfPreview = async () => {
    if (pdfPreviewUrl) return; // Only generate once

    try {
      console.log('Attempting to load PDF...');

      // Use a simplified PDF preview approach
      setPdfPreviewUrl(`${process.env.PUBLIC_URL}/cv-preview.png`);
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      // Set a fallback message
      console.log('Failed to load PDF. Check console for details.');
    }
  };

  useEffect(() => {
    // Fetch GitHub repositories
    const fetchRepos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);

        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }

        let repos = await response.json();

        // Sort repos by most recently updated
        repos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        // Only take the first 4-6 repos to display
        repos = repos.slice(0, 6);

        setRepos(repos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setIsLoading(false);

        // Fallback to the specific repos we know about if the API fails
        const fallbackRepos = [
          {
            id: 1,
            name: "GAN-based-Sensor-Pattern-Noise-Restoration",
            description: "Research project implementing GAN architectures for sensor pattern noise restoration",
            language: "Python",
            stargazers_count: 0,
            forks_count: 0,
            html_url: "https://github.com/dobrematei14/GAN-based-Sensor-Pattern-Noise-Restoration"
          },
          {
            id: 2,
            name: "CV-website",
            description: "Personal portfolio and CV website built with React and Tailwind CSS",
            language: "JavaScript",
            stargazers_count: 0,
            forks_count: 0,
            html_url: "https://github.com/dobrematei14/CV-website"
          }
        ];
        setRepos(fallbackRepos);
      }
    };


    fetchRepos();

    // Hide scroll hint after 5 seconds
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Monitor scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'skills', 'experience', 'contact'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Language color mapping
  const languageColors = {
    "JavaScript": "bg-yellow-400",
    "TypeScript": "bg-blue-500",
    "Python": "bg-green-500",
    "HTML/CSS": "bg-orange-500",
    "Java": "bg-red-500",
    "C++": "bg-purple-500",
    "Ruby": "bg-red-600",
    "Go": "bg-blue-400",
  };

  // Skill data with proficiency levels
  const skills = [
    { name: "Python", level: 90 },
    { name: "C", level: 90 },
    { name: "SQL", level: 80 },
    { name: "Java", level: 70 },
    { name: "C++", level: 70 },
    { name: "R", level: 60 },
    { name: "HTML/CSS", level: 60 },
    { name: "JavaScript", level: 40 },    
  ];

  // Work experience data
  const experiences = [
    {
      company: "Agricover",
      role: "Senior Frontend Developer",
      period: "2022 - Present",
      description: "Lead development of the company's flagship web application. Implemented new features and improved performance by 40%.",
      technologies: ["React", "TypeScript", "Redux", "GraphQL"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black shadow-md z-20 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
          <div className="relative flex items-center h-16">
            {/* Name aligned to left */}
            <div className="absolute left-0">
              <span className="text-xl font-bold text-[#8B5CF6]">Matei Alexandru Dobre</span>
            </div>

            {/* Navigation links centered on page */}
            <div className="w-full flex justify-center">
              <div className="hidden md:flex space-x-8">
                <button
                  onClick={() => scrollToSection('home')}
                  className={`hover:text-[#8B5CF6] transition-colors ${activeSection === 'home' ? 'text-[#8B5CF6] font-medium' : ''}`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className={`hover:text-[#8B5CF6] transition-colors ${activeSection === 'projects' ? 'text-[#8B5CF6] font-medium' : ''}`}
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection('skills')}
                  className={`hover:text-[#8B5CF6] transition-colors ${activeSection === 'skills' ? 'text-[#8B5CF6] font-medium' : ''}`}
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection('experience')}
                  className={`hover:text-[#8B5CF6] transition-colors ${activeSection === 'experience' ? 'text-[#8B5CF6] font-medium' : ''}`}
                >
                  Experience
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`hover:text-[#8B5CF6] transition-colors ${activeSection === 'contact' ? 'text-[#8B5CF6] font-medium' : ''}`}
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Social icons aligned to right */}
            <div className="absolute right-0 flex space-x-4">
              <a href="https://github.com/dobrematei14/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/matei-alexandru-dobre-42b92b180/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:dobre.matei.ichb@gmail.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-900 flex items-center justify-center relative overflow-hidden border-2 border-[#8B5CF6]">
            {/* Profile image placeholder */}
            <div className="text-4xl font-bold text-[#8B5CF6]">MAD</div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
            Hi, I'm <span className="text-[#8B5CF6]">Matt</span>
          </h1>

          <div className="text-2xl md:text-3xl mb-8 text-gray-400">
            <span className="inline-block animate-slideInRight">Software Engineer</span>
          </div>

          <p className="text-xl mb-12 max-w-2xl mx-auto animate-fadeIn opacity-80">
            Welcome to my portfolio!
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn">
            <GlowButton onClick={() => scrollToSection('projects')}>
              View Projects
            </GlowButton>

            <IconOnlyButton
              onClick={() => scrollToSection('contact')}
              icon={<Mail size={20} />}
            >
              Contact Me
            </IconOnlyButton>
          </div>
        </div>

        {/* Scroll indicator */}
        {showScrollHint && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button
              onClick={() => scrollToSection('projects')}
              className="flex flex-col items-center text-gray-400 hover:text-[#8B5CF6] transition-colors"
            >
              <span className="mb-2 text-sm">Scroll</span>
              <ChevronDown size={24} />
            </button>
          </div>
        )}
      </section>

      {/* GitHub Projects Section */}
      <AutoRotatingCards repos={repos} />


      {/* Skills Section */}
      <section id="skills" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Skills & Technologies</h2>
          <p className="text-gray-400 mb-12 text-center max-w-3xl mx-auto">
            I'm proficient in a range of technologies and continuously expanding my skill set.
            Here's an overview of my technical expertise.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-gray-400 text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div
                    className="bg-[#8B5CF6] h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section / CV */}
      <ExperienceSection />






      {/* Contact Section */}
      <section id="contact" className="py-20 bg-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
          <p className="mb-12 opacity-90 max-w-2xl mx-auto">
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            {/* Email Card */}
            <a
              href="mailto:dobre.matei.ichb@gmail.com"
              className="bg-indigo-800 p-6 rounded-lg transition-all duration-300 hover:bg-indigo-900 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="flex justify-center mb-4">
                <Mail size={32} className="text-indigo-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="opacity-90 truncate">dobre.matei.ichb@gmail.com</p>
              <span className="mt-4 inline-block text-indigo-300 group-hover:text-white">Contact Me →</span>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/matei-alexandru-dobre-42b92b180/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-800 p-6 rounded-lg transition-all duration-300 hover:bg-indigo-900 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="flex justify-center mb-4">
                <Linkedin size={32} className="text-indigo-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <p className="opacity-90">Matei Alexandru Dobre</p>
              <span className="mt-4 inline-block text-indigo-300 group-hover:text-white">Connect →</span>
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/dobrematei14"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-800 p-6 rounded-lg transition-all duration-300 hover:bg-indigo-900 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="flex justify-center mb-4">
                <Github size={32} className="text-indigo-300 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <p className="opacity-90">dobrematei14</p>
              <span className="mt-4 inline-block text-indigo-300 group-hover:text-white">View Projects →</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black text-white text-center border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Matei Alexandru Dobre. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;