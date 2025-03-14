import React from 'react';

const ExperienceSection = () => {
  // Updated work experience data based on the LinkedIn information
  const experiences = [
    {
      company: "AGRICOVER",
      role: "Report Developer",
      period: "Jun 2019 - Sep 2019",
      location: "Bucharest, Romania · On-site",
      type: "Internship",
      description: "SQL-based Reporting Development for business use",
      skills: ["Data Analysis", "Programming", "+4 skills"],
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
              <p className="text-gray-300 mb-4">{exp.description}</p>
              
              {/* Skills section */}
              <div className="flex items-center mb-4 text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                {exp.skills.join(', ')}
              </div>
              
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