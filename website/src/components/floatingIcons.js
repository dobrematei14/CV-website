import React, { useEffect, useRef } from 'react';

const FloatingIcons = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full width/height
    const resizeCanvas = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Define the tech stack with image paths and fallback colors
    const techStack = [
      { name: 'Python', logo: '/logos/python.png', color: '#3776AB' },
      { name: 'C', logo: '/logos/c.png', color: '#A8B9CC' },
      { name: 'SQL', logo: '/logos/sql.png', color: '#4479A1' },
      { name: 'Java', logo: '/logos/java.png', color: '#007396' },
      { name: 'C++', logo: '/logos/cpp.png', color: '#00599C' },
      { name: 'R', logo: '/logos/r.png', color: '#276DC3' },
      { name: 'HTML', logo: '/logos/html.png', color: '#E34F26' },
      { name: 'CSS', logo: '/logos/css.png', color: '#1572B6' },
      { name: 'JS', logo: '/logos/javascript.png', color: '#F7DF1E' }
    ];
    
    // Pre-load images
    const images = {};
    techStack.forEach(tech => {
      const img = new Image();
      img.src = tech.logo;
      images[tech.name] = img;
    });
    
    // Create particles array
    const particles = [];
    const maxParticles = 12; // Maximum number of particles on screen
    
    class Particle {
      constructor(x, y, techIndex) {
        this.x = x;
        this.y = y;
        this.tech = techStack[techIndex % techStack.length];
        this.image = images[this.tech.name];
        this.imageLoaded = false;
        this.image.onload = () => {
          this.imageLoaded = true;
        };
        
        // Size and animation properties
        this.maxSize = 200; // Increased max size from 50 to 80
        this.size = 60; // Start at size 0 for fade-in effect
        this.growthRate = 0.4; // Slightly slower growth rate
        this.speedX = (Math.random() - 0.5) * 0.8; // Reduced speed (was 1.5)
        this.speedY = (Math.random() - 0.5) * 0.8; // Reduced speed (was 1.5)
        this.opacity = 0; // Start fully transparent
        this.fadeInRate = 0.008; // Slower fade in (was 0.01)
        this.life = 200 + Math.random() * 1000; // Longer lifespan
        this.state = 'fadingIn'; // States: fadingIn, active, fadingOut
        this.decayRate = 0.4; // Slower shrink speed (was 0.3)
        this.fadeOutRate = 0.008; // Slower fade out (was 0.01)
        
        // Add a small random speed to prevent particles from getting stuck
        if (Math.abs(this.speedX) < 0.1) this.speedX += (Math.random() > 0.5 ? 0.1 : -0.1);
        if (Math.abs(this.speedY) < 0.1) this.speedY += (Math.random() > 0.5 ? 0.1 : -0.1);
      }
      
      update() {
        // Handle state transitions and animations
        switch (this.state) {
          case 'fadingIn':
            // Grow size
            if (this.size < this.maxSize) {
              this.size += this.growthRate;
            }
            
            // Increase opacity
            if (this.opacity < 0.3) { // Max opacity is 30%
              this.opacity += this.fadeInRate;
            } else {
              this.state = 'active';
            }
            break;
            
          case 'active':
            // Count down life
            this.life--;
            
            // When life is depleted, start fading out
            if (this.life <= 0) {
              this.state = 'fadingOut';
            }
            break;
            
          case 'fadingOut':
            // Decrease size
            this.size -= this.decayRate;
            
            // Decrease opacity
            this.opacity -= this.fadeOutRate;
            break;
        }
        
        // Update position
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off walls with a proper bounding box to prevent sticking
        if (this.x > canvas.width - this.size/2 || this.x < this.size/2) {
          this.speedX = -this.speedX;
          // Ensure we're not stuck at the edge
          if (this.x > canvas.width - this.size/2) {
            this.x = canvas.width - this.size/2 - 1;
          } else if (this.x < this.size/2) {
            this.x = this.size/2 + 1;
          }
        }
        
        if (this.y > canvas.height - this.size/2 || this.y < this.size/2) {
          this.speedY = -this.speedY;
          // Ensure we're not stuck at the edge
          if (this.y > canvas.height - this.size/2) {
            this.y = canvas.height - this.size/2 - 1;
          } else if (this.y < this.size/2) {
            this.y = this.size/2 + 1;
          }
        }
        
        // Simple collision detection with other particles
        for (let i = 0; i < particles.length; i++) {
          const other = particles[i];
          if (other !== this) {
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (this.size/2) + (other.size/2);
            
            if (distance < minDistance) {
              // Calculate angle of collision
              const angle = Math.atan2(dy, dx);
              
              // Calculate velocity magnitudes
              const m1 = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
              const m2 = Math.sqrt(other.speedX * other.speedX + other.speedY * other.speedY);
              
              // Calculate new velocities (simplified elastic collision)
              const newSpeedX1 = -m1 * Math.cos(angle);
              const newSpeedY1 = -m1 * Math.sin(angle);
              const newSpeedX2 = m2 * Math.cos(angle);
              const newSpeedY2 = m2 * Math.sin(angle);
              
              // Apply new velocities
              this.speedX = newSpeedX1;
              this.speedY = newSpeedY1;
              other.speedX = newSpeedX2;
              other.speedY = newSpeedY2;
              
              // Move particles apart to prevent sticking
              const overlap = minDistance - distance + 1;
              const moveX = overlap * Math.cos(angle) / 2;
              const moveY = overlap * Math.sin(angle) / 2;
              
              this.x -= moveX;
              this.y -= moveY;
              other.x += moveX;
              other.y += moveY;
            }
          }
        }
      }
      
      draw() {
        // Skip drawing if size is too small
        if (this.size <= 2) return;
        
        // Set global opacity
        ctx.globalAlpha = this.opacity;
        
        if (this.imageLoaded) {
          // Draw the logo image
          ctx.drawImage(
            this.image, 
            this.x - this.size/2, 
            this.y - this.size/2, 
            this.size, 
            this.size
          );
        } else {
          // Fallback: Draw colored circle if image isn't loaded
          ctx.fillStyle = this.tech.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size/2, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw text
          ctx.fillStyle = this.shouldUseWhiteText() ? 'white' : 'black';
          ctx.font = `bold ${this.size/3}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.tech.name, this.x, this.y);
        }
        
        // Reset global alpha
        ctx.globalAlpha = 1.0;
      }
      
      // Helper to determine if white text should be used based on background color
      shouldUseWhiteText() {
        // Convert hex color to RGB
        let r = parseInt(this.tech.color.slice(1, 3), 16);
        let g = parseInt(this.tech.color.slice(3, 5), 16);
        let b = parseInt(this.tech.color.slice(5, 7), 16);
        
        // Calculate luminance (simplified)
        let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Use white text for dark colors
        return luminance < 0.6;
      }
      
      // Check if particle should be removed
      isDead() {
        return this.state === 'fadingOut' && (this.size <= 2 || this.opacity <= 0.02);
      }
    }
    
    // Function to create a new particle
    const createParticle = () => {
      const techIndex = Math.floor(Math.random() * techStack.length);
      const size = 80; // Updated initial max size to match maxSize
      const margin = size/2 + 10;
      
      // Distribute particles across the canvas with margin from edges
      const x = margin + Math.random() * (canvas.width - margin * 2);
      const y = margin + Math.random() * (canvas.height - margin * 2);
      
      particles.push(new Particle(x, y, techIndex));
    };
    
    // Initialize with some particles
    for (let i = 0; i < 6; i++) {
      createParticle();
    }
    
    // Animation loop
    let animationFrameId;
    let frameCount = 0;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        
        // Remove dead particles
        if (particles[i].isDead()) {
          particles.splice(i, 1);
        }
      }
      
      // Every 90 frames, check if we need to add more particles (slower generation)
      frameCount++;
      if (frameCount % 90 === 0) {
        if (particles.length < maxParticles) {
          createParticle();
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ backgroundColor: 'transparent' }}
    />
  );
};

export default FloatingIcons;