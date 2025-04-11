import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const AutoRotatingCards = ({ repos }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRefs = useRef({});
  const intervalRef = useRef(null);
  
  // Touch handling for swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const containerRef = useRef(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Initialize card refs
  useEffect(() => {
    repos.forEach(repo => {
      cardRefs.current[repo.id] = React.createRef();
    });
  }, [repos]);

  // Auto-rotation effect
  useEffect(() => {
    // Start the auto-rotation
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveCardIndex(prevIndex => (prevIndex + 1) % repos.length);
      }, 5000); // Change card every 5 seconds
    }

    // Clean up interval on unmount or when paused
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, repos.length]);

  // Handle manual navigation
  const goToCard = (index) => {
    setActiveCardIndex(index);
    // Reset the timer when manually changing cards
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    // Restart the timer
    intervalRef.current = setInterval(() => {
      setActiveCardIndex(prevIndex => (prevIndex + 1) % repos.length);
    }, 5000);
  };

  // Go to previous card
  const goToPrevCard = () => {
    setActiveCardIndex(prevIndex => (prevIndex === 0 ? repos.length - 1 : prevIndex - 1));
    resetAutoRotationTimer();
  };

  // Go to next card
  const goToNextCard = () => {
    setActiveCardIndex(prevIndex => (prevIndex + 1) % repos.length);
    resetAutoRotationTimer();
  };

  // Reset auto rotation timer
  const resetAutoRotationTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setActiveCardIndex(prevIndex => (prevIndex + 1) % repos.length);
    }, 5000);
  };

  // Mobile touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      goToNextCard();
    } else if (isRightSwipe) {
      goToPrevCard();
    }
  };

  // Pause rotation on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  
  // Card tilt effect
  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Subtle tilt effect based on mouse position
    const tiltX = (y / rect.height - 0.5) * 10; // 10 degree max tilt
    const tiltY = (x / rect.width - 0.5) * -10; // 10 degree max tilt
    
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  };

  const resetTilt = (cardRef) => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px)';
  };
  
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

  return (
    <section id="projects" className="py-20 bg-gray-900 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">GitHub Projects</h2>
        <p className="text-gray-400 mb-12 text-center max-w-3xl mx-auto">
          A selection of my recent work and open-source contributions.
          These projects showcase my skills and approach to solving problems.
        </p>

        {/* Card container - with position relative and lower z-index */}
        <div 
          ref={containerRef}
          className="relative h-[400px] flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ zIndex: 1, touchAction: 'pan-y' }} // Lower z-index than navbar
        >
          {/* Visual swipe indicators for mobile - only visible when touched */}
          {touchStart && !touchEnd && (
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none opacity-30">
              <div className="bg-white rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </div>
            </div>
          )}
          
          {touchStart && !touchEnd && (
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-30">
              <div className="bg-white rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          )}
          
          {repos.map((repo, index) => (
            <div
              key={repo.id}
              ref={cardRefs.current[repo.id]}
              className={`w-full max-w-2xl transition-all duration-500 ease-out absolute 
                         ${index === activeCardIndex ? 'opacity-100 scale-100' : 
                           'opacity-0 scale-95'}`}
              style={{ zIndex: index === activeCardIndex ? 1 : 0 }} // Control z-index based on active state
              onMouseMove={index === activeCardIndex ? 
                (e) => handleMouseMove(e, cardRefs.current[repo.id]) : null}
              onMouseLeave={index === activeCardIndex ? 
                () => resetTilt(cardRefs.current[repo.id]) : null}
            >
              <div 
                className="border border-gray-800 rounded-lg overflow-hidden shadow-xl 
                          bg-black flex flex-col transition-all duration-300 
                          hover:shadow-[0_0_25px_rgba(139,92,246,0.3)]"
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-[#8B5CF6]">{repo.name}</h3>
                    <div className={`px-2 py-1 rounded-full text-xs text-white ${languageColors[repo.language] || 'bg-gray-500'}`}>
                      {repo.language}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{repo.description || "No description available"}</p>
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
                <div className="px-6 py-3 bg-gray-800 border-t border-gray-700 flex justify-end">
                  <button
                    onClick={() => window.open(repo.html_url, '_blank')}
                    className="px-4 py-2 bg-[#8B5CF6] text-white rounded-md hover:bg-[#7c4af0] transition-colors"
                  >
                    <div className="flex items-center">
                      <span>View Project</span>
                      <ExternalLink className="ml-2" size={16} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Left/Right Arrow Navigation - visible on large screens/tablets */}
          <div className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4">
            <button
              onClick={goToPrevCard}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              aria-label="Previous project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
          </div>

          <div className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4">
            <button
              onClick={goToNextCard}
              className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              aria-label="Next project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Navigation dots/progress indicator */}
        <div className="w-full max-w-md mx-auto mt-8 flex justify-center">
          <div className="flex space-x-3">
            {repos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCard(index)}
                className={`h-3 rounded-full transition-all duration-300 
                          ${index === activeCardIndex ? 'w-8 bg-[#8B5CF6]' : 'w-3 bg-gray-700 hover:bg-gray-500'}`}
                aria-label={`View project ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Mobile swipe instructions - only visible on small screens */}
        <div className="mt-4 text-center text-gray-500 text-sm sm:hidden">
          <p>Swipe left or right to navigate projects</p>
        </div>
      </div>
    </section>
  );
};

export default AutoRotatingCards;