import React, { useState, useEffect, useRef } from 'react';
import { Github, Mail, Linkedin, ChevronDown, ExternalLink, ArrowRight, Download } from 'lucide-react';
import { GlowButton, TextMoveButton, TruncatedButton, SideHighlightButton, IconOnlyButton } from './ButtonComponents';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';



const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState('');
  const canvasRef = useRef(null);

  const githubUsername = "dobrematei14";
  
  // List of pinned repository names to fetch
  const pinnedRepoNames = [
    "GAN-based-Sensor-Pattern-Noise-Restoration",
    "CV-website",
    "too-good-to-go-notification"
    // Add other pinned repo names here
  ];

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  }, []);

  const generatePdfPreview = async () => {
    if (pdfPreviewUrl) return; // Only generate once

    try {
      console.log('Attempting to load PDF...');

      // Use the correct path to the PDF file in the public directory
      const pdfPath = '/CV.pdf'; // Updated path to match public directory

      const loadingTask = pdfjsLib.getDocument(pdfPath);
      const pdf = await loadingTask.promise;
      console.log('PDF loaded successfully');

      const page = await pdf.getPage(1); // Get first page
      console.log('Page 1 loaded');

      const viewport = page.getViewport({ scale: 0.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      console.log('Rendering PDF to canvas...');
      await page.render(renderContext).promise;
      console.log('PDF rendered to canvas');

      const dataUrl = canvas.toDataURL();
      console.log('Canvas converted to data URL');
      setPdfPreviewUrl(dataUrl);
    } catch (error) {
      console.error('Error generating PDF preview:', error);
      // Set a fallback message
      console.log('Failed to load PDF. Check console for details.');
    }
  };

  // Also update the Download button to use the correct path
  <IconOnlyButton
    icon={<Download size={20} />}
    onClick={() => window.open('/website/build/CV.pdf', '_blank')}
    className="min-w-40"
  >
    Download CV here
  </IconOnlyButton>

  useEffect(() => {
    // Fetch GitHub repositories
    const fetchRepos = async () => {
      setIsLoading(true);
      try {
        // Fetch pinned repositories one by one
        const pinnedRepos = [];
        
        for (const repoName of pinnedRepoNames) {
          const response = await fetch(`https://api.github.com/repos/${githubUsername}/${repoName}`);
          
          if (response.ok) {
            const repoData = await response.json();
            pinnedRepos.push(repoData);
          }
        }
        
        // If no pinned repos were found, try fetching all repos as fallback
        if (pinnedRepos.length === 0) {
          const allReposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos`);
          
          if (allReposResponse.ok) {
            let repos = await allReposResponse.json();
            // Sort repos by most recently updated and take the first few
            repos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 6);
            setRepos(repos);
          } else {
            throw new Error('Failed to fetch repositories');
          }
        } else {
          setRepos(pinnedRepos);
        }
        
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
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "Python", level: 80 },
    { name: "SQL", level: 80 },
    { name: "Git", level: 80 },
    { name: "UI/UX Design", level: 40 },
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
      <nav className="fixed top-0 left-0 right-0 bg-black shadow-md z-10 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative flex items-center h-16">
            {/* Name aligned to left */}
            <div className="absolute left-0">
              <a href="#" className="text-xl font-bold text-[#8B5CF6]">Matei Alexandru Dobre</a>
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
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">GitHub Projects</h2>
          <p className="text-gray-400 mb-12 text-center max-w-3xl mx-auto">
            A selection of my recent work and open-source contributions.
            These projects showcase my skills and approach to solving problems.
          </p>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8B5CF6]"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {repos.map((repo) => (
                <div
                  key={repo.id}
                  className="border border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-black flex flex-col"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-[#8B5CF6]">{repo.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs text-white ${languageColors[repo.language] || 'bg-gray-500'}`}>
                        {repo.language}
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{repo.description}</p>
                    <div className="flex space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                        </svg>
                        {repo.stargazers_count} stars
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                        </svg>
                        {repo.forks_count} forks
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-3 bg-gray-900 border-t border-gray-700 flex justify-end">
                    <TruncatedButton
                      onClick={() => window.open(repo.html_url, '_blank')}
                      className="text-sm"
                    >
                      View
                    </TruncatedButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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
      <section id="experience" className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Work Experience</h2>
          <p className="text-gray-400 mb-12 text-center max-w-3xl mx-auto">
            My professional journey and the companies I've had the pleasure to work with.
          </p>

          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-12 relative pl-8 border-l-2 border-[#8B5CF6]">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#8B5CF6]"></div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <div className="flex items-center text-[#8B5CF6] font-medium">
                    {exp.company}
                  </div>
                  <div className="text-sm text-gray-400">{exp.period}</div>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-black text-[#8B5CF6] rounded-full text-sm border border-[#8B5CF6]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 relative group" onMouseEnter={generatePdfPreview}>
            {/* Hidden canvas for rendering PDF */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            <IconOnlyButton
              icon={<Download size={20} />}
              onClick={() => window.open('/CV.pdf', '_blank')}
              className="min-w-40"
            >
              Preview CV
            </IconOnlyButton>

            {/* PDF Preview */}
            <div className="absolute left-1/2 bottom-full mb-2 transform -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-10">
              <div className="bg-gray-900 p-2 rounded shadow-lg border border-[#8B5CF6]">
                {pdfPreviewUrl ? (
                  <img
                    src={pdfPreviewUrl}
                    alt="CV Preview"
                    className="w-64 h-auto border border-gray-800"
                  />
                ) : (
                  <div className="w-64 h-80 bg-gray-800 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#8B5CF6]"></div>
                  </div>
                )}
              </div>
              <div className="w-4 h-4 bg-gray-900 transform rotate-45 absolute -bottom-2 left-1/2 -ml-2 border-r border-b border-[#8B5CF6]"></div>
            </div>
          </div>
        </div>
      </section>

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