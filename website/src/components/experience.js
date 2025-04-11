import React from 'react';

const ExperienceSection = () => {
  // Updated work experience data based on the LinkedIn information
  const experiences = [
    {
      company: "Sealcentre Pieterburen",
      role: "Software Engineer Intern",
      period: "Feb 2022 - Jun 2022 · 5 mos",
      location: "Groningen, Groningen, Netherlands · Remote",
      type: "Internship",
      description: [
        "Developed a machine learning model for seal survival prediction as part of a team project during a Software Engineering internship at Sealcentre Pieterburen.",
        "Designed and implemented a user-friendly GUI to interact with the model, enhancing user experience and accessibility.",
        "Collaborated with team members to ensure seamless integration of the ML model and GUI, showcasing teamwork and communication skills."
      ],
      technologies: ["Python", "Machine Learning", "GUI Development", "Team Collaboration"]
    },
    {
      company: "AGRICOVER",
      role: "Report Developer",
      period: "Jun 2019 - Sep 2019",
      location: "Bucharest, Romania · On-site",
      type: "Internship",
      description: "SQL-based Reporting Development for business use",
      technologies: ["SQL", "Data Analysis", "Reporting", "Business Intelligence"]
    }
  ];

  return (
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
                  {exp.company} {exp.type && <span className="ml-2 text-gray-400">· {exp.type}</span>}
                </div>
                <div className="text-sm text-gray-400">{exp.period} · {exp.location}</div>
              </div>
              
              {/* Description - handle both string and array formats */}
              {typeof exp.description === 'string' ? (
                <p className="text-gray-300 mb-4">{exp.description}</p>
              ) : (
                <ul className="text-gray-300 mb-4 list-disc ml-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="mb-2">{item}</li>
                  ))}
                </ul>
              )}
              
              {/* Technologies/skills tags */}
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

        {/* You can keep the download CV button here if needed */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => window.open(`${process.env.PUBLIC_URL}/CV.pdf`, '_blank')}
            className="px-6 py-3 bg-[#8B5CF6] text-white rounded-full hover:bg-[#7c4af0] transition-colors flex items-center"
          >
            <span>Download CV</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;