import React, { useState, useEffect } from 'react';
import { Github, Mail, Linkedin, ChevronDown, ExternalLink } from 'lucide-react';

const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(true);
  
  // Replace with your GitHub username
  const githubUsername = "yourusername";
  
  useEffect(() => {
    // Fetch GitHub repositories
    const fetchRepos = async () => {
      try {
        // In a real application, you would fetch from the GitHub API
        // For demo purposes, we'll use sample data
        const sampleRepos = [
          { 
            id: 1, 
            name: "awesome-project", 
            description: "A full-stack application with React and Node.js", 
            language: "JavaScript",
            stargazers_count: 12,
            forks_count: 5,
            html_url: "#"
          },
          { 
            id: 2, 
            name: "data-visualizer", 
            description: "Interactive data visualization tool using D3.js", 
            language: "TypeScript",
            stargazers_count: 8,
            forks_count: 2,
            html_url: "#"
          },
          { 
            id: 3, 
            name: "ml-experiments", 
            description: "Collection of machine learning experiments and models", 
            language: "Python",
            stargazers_count: 15,
            forks_count: 3,
            html_url: "#"
          },
          { 
            id: 4, 
            name: "portfolio-website", 
            description: "Personal portfolio website with interactive elements", 
            language: "HTML/CSS",
            stargazers_count: 6,
            forks_count: 1,
            html_url: "#"
          }
        ];
        
        setRepos(sampleRepos);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching repositories:", error);
        setIsLoading(false);
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
    { name: "Python", level: 75 },
    { name: "SQL", level: 70 },
    { name: "Git", level: 85 },
    { name: "UI/UX Design", level: 60 },
  ];
  
  // Work experience data
  const experiences = [
    {
      company: "Tech Innovations Inc.",
      role: "Senior Frontend Developer",
      period: "2022 - Present",
      description: "Lead development of the company's flagship web application. Implemented new features and improved performance by 40%.",
      technologies: ["React", "TypeScript", "Redux", "GraphQL"]
    },
    {
      company: "Digital Solutions Ltd.",
      role: "Frontend Developer",
      period: "2020 - 2022",
      description: "Developed responsive web applications for clients across various industries. Collaborated with designers and backend teams.",
      technologies: ["JavaScript", "Vue.js", "Node.js", "REST APIs"]
    },
    {
      company: "Web Craft Studio",
      role: "Junior Developer",
      period: "2018 - 2020",
      description: "Created website layouts and implemented client-side functionality for small to medium businesses.",
      technologies: ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <a href="#" className="text-xl font-bold text-indigo-600">Your Name</a>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('home')} 
                className={`hover:text-indigo-600 transition-colors ${activeSection === 'home' ? 'text-indigo-600 font-medium' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className={`hover:text-indigo-600 transition-colors ${activeSection === 'projects' ? 'text-indigo-600 font-medium' : ''}`}
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('skills')} 
                className={`hover:text-indigo-600 transition-colors ${activeSection === 'skills' ? 'text-indigo-600 font-medium' : ''}`}
              >
                Skills
              </button>
              <button 
                onClick={() => scrollToSection('experience')} 
                className={`hover:text-indigo-600 transition-colors ${activeSection === 'experience' ? 'text-indigo-600 font-medium' : ''}`}
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className={`hover:text-indigo-600 transition-colors ${activeSection === 'contact' ? 'text-indigo-600 font-medium' : ''}`}
              >
                Contact
              </button>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-indigo-100 flex items-center justify-center relative overflow-hidden">
            {/* Profile image placeholder */}
            <div className="text-4xl font-bold text-indigo-600">YN</div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
            Hi, I'm <span className="text-indigo-600">Your Name</span>
          </h1>
          
          <div className="text-2xl md:text-3xl mb-8 text-gray-600">
            <span className="inline-block animate-slideInRight">Full Stack Developer</span>
          </div>
          
          <p className="text-xl mb-12 max-w-2xl mx-auto animate-fadeIn opacity-80">
            I build modern web applications with a focus on user experience, 
            performance, and clean code. Welcome to my portfolio!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 animate-fadeIn">
            <button 
              onClick={() => scrollToSection('projects')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Me
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        {showScrollHint && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <button 
              onClick={() => scrollToSection('projects')}
              className="flex flex-col items-center text-gray-400 hover:text-indigo-600 transition-colors"
            >
              <span className="mb-2 text-sm">Scroll</span>
              <ChevronDown size={24} />
            </button>
          </div>
        )}
      </section>
      
      {/* GitHub Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">GitHub Projects</h2>
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            A selection of my recent work and open-source contributions.
            These projects showcase my skills and approach to solving problems.
          </p>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {repos.map((repo) => (
                <div 
                  key={repo.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-indigo-600">{repo.name}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs text-white ${languageColors[repo.language] || 'bg-gray-500'}`}>
                        {repo.language}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{repo.description}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
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
                  <div className="px-6 py-3 bg-gray-50 border-t flex justify-end">
                    <a 
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
                    >
                      View Project <ExternalLink size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Skills & Technologies</h2>
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            I'm proficient in a range of technologies and continuously expanding my skill set.
            Here's an overview of my technical expertise.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-gray-500 text-sm">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Experience Section / CV */}
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">Work Experience</h2>
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            My professional journey and the companies I've had the pleasure to work with.
          </p>
          
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <div key={index} className="mb-12 relative pl-8 border-l-2 border-indigo-100">
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-indigo-600"></div>
                <div className="mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{exp.role}</h3>
                  <div className="flex items-center text-indigo-600 font-medium">
                    {exp.company}
                  </div>
                  <div className="text-sm text-gray-500">{exp.period}</div>
                </div>
                <p className="text-gray-600 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md font-medium transition-colors">
              Download Full CV
            </button>
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
          
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="bg-indigo-700 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="opacity-90">hello@yourname.com</p>
            </div>
            
            <div className="bg-indigo-700 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Linkedin size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <p className="opacity-90">linkedin.com/in/yourname</p>
            </div>
            
            <div className="bg-indigo-700 p-6 rounded-lg">
              <div className="flex justify-center mb-4">
                <Github size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <p className="opacity-90">github.com/yourusername</p>
            </div>
          </div>
          
          <div className="text-center">
            <a 
              href="mailto:hello@yourname.com"
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md font-medium transition-colors inline-block"
            >
              Say Hello 👋
            </a>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 bg-indigo-800 text-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;