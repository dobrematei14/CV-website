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
      { name: 'R', logo: '/logos/r.png', color: '#276DC3' },
      { name: 'C++', logo: '/logos/cpp.png', color: '#00599C' },
      { name: 'HTML', logo: '/logos/html.png', color: '#E34F26' },
      { name: 'CSS', logo: '/logos/css.png', color: '#1572B6' },
      { name: 'JS', logo: '/logos/javascript.png', color: '#F7DF1E' }
    ];

    // Function to preload images
    const preloadImage = (tech) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = tech.logo;
          img.onload = () => {
            console.log(`Image loaded: ${tech.logo}`); // Log successful loads
            resolve({ ...tech, image: img });
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${tech.logo}`); // Log errors
            reject(`Failed to load image: ${tech.logo}`);
          };
        });
      };

    const preloadImages = () => {
      return Promise.all(techStack.map(preloadImage));
    };

    // Create particles array
    const particles = [];
    const maxParticles = 15; // Maximum number of particles on screen

    class Particle {
      constructor(x, y, tech) {
        this.x = x;
        this.y = y;
        this.tech = tech;
        this.image = tech.image;
        this.imageLoaded = true; // Images are preloaded, so this is always true
        this.maxSize = canvas.width * 0.1; // 10% of canvas width
        this.size = this.maxSize * 0.4; // Start at 30% of max size
        this.growthRate = this.maxSize * 0.002; // Growth rate relative to max size
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.opacity = 0;
        this.fadeInRate = 0.008;
        this.life = 200 + Math.random() * 1000;
        this.state = 'fadingIn';
        this.decayRate = this.maxSize * 0.002; // Decay rate relative to max size
        this.fadeOutRate = 0.008;

        // Add a small random speed to prevent particles from getting stuck
        if (Math.abs(this.speedX) < 0.1) this.speedX += (Math.random() > 0.5 ? 0.1 : -0.1);
        if (Math.abs(this.speedY) < 0.1) this.speedY += (Math.random() > 0.5 ? 0.1 : -0.1);
      }

      update() {
        // Handle state transitions and animations
        switch (this.state) {
          case 'fadingIn':
            if (this.size < this.maxSize) {
              this.size += this.growthRate;
            }
            if (this.opacity < 0.3) {
              this.opacity += this.fadeInRate;
            } else {
              this.state = 'active';
            }
            break;

          case 'active':
            this.life--;
            if (this.life <= 0) {
              this.state = 'fadingOut';
            }
            break;

          case 'fadingOut':
            this.size -= this.decayRate;
            this.opacity -= this.fadeOutRate;
            break;
        }

        // Update position and handle collisions (same as before)
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls (same as before)
        if (this.x > canvas.width - this.size / 2 || this.x < this.size / 2) {
          this.speedX = -this.speedX;
          if (this.x > canvas.width - this.size / 2) {
            this.x = canvas.width - this.size / 2 - 1;
          } else if (this.x < this.size / 2) {
            this.x = this.size / 2 + 1;
          }
        }

        if (this.y > canvas.height - this.size / 2 || this.y < this.size / 2) {
          this.speedY = -this.speedY;
          if (this.y > canvas.height - this.size / 2) {
            this.y = canvas.height - this.size / 2 - 1;
          } else if (this.y < this.size / 2) {
            this.y = this.size / 2 + 1;
          }
        }

        // Collision detection (same as before)
        for (const other of particles) {
          if (other !== this) {
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = (this.size / 2) + (other.size / 2);

            if (distance < minDistance) {
              const angle = Math.atan2(dy, dx);
              const m1 = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
              const m2 = Math.sqrt(other.speedX * other.speedX + other.speedY * other.speedY);
              const newSpeedX1 = -m1 * Math.cos(angle);
              const newSpeedY1 = -m1 * Math.sin(angle);
              const newSpeedX2 = m2 * Math.cos(angle);
              const newSpeedY2 = m2 * Math.sin(angle);
              this.speedX = newSpeedX1;
              this.speedY = newSpeedY1;
              other.speedX = newSpeedX2;
              other.speedY = newSpeedY2;
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
        if (this.size <= 2) return;
        ctx.globalAlpha = this.opacity;

        // Draw the logo image (images are preloaded, so no need for fallback)
        ctx.drawImage(
          this.image,
          this.x - this.size / 2,
          this.y - this.size / 2,
          this.size,
          this.size
        );

        ctx.globalAlpha = 1.0;
      }

      isDead() {
        return this.state === 'fadingOut' && (this.size <= 2 || this.opacity <= 0.02);
      }
    }

    // Function to create a new particle
    const createParticle = (techStackWithImages) => {
      const tech = techStackWithImages[Math.floor(Math.random() * techStackWithImages.length)];
      const size = canvas.width * 0.1; // 10% of canvas width
      const margin = size / 2 + 10;
      const x = margin + Math.random() * (canvas.width - margin * 2);
      const y = margin + Math.random() * (canvas.height - margin * 2);
      particles.push(new Particle(x, y, tech));
    };

    // Preload images and start animation
    preloadImages()
      .then((techStackWithImages) => {
        // Initialize with some particles
        for (let i = 0; i < 6; i++) {
          createParticle(techStackWithImages);
        }

        // Animation loop
        let animationFrameId;
        let frameCount = 0;

        const animate = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].isDead()) {
              particles.splice(i, 1);
            }
          }

          frameCount++;
          if (frameCount % 90 === 0) {
            if (particles.length < maxParticles) {
              createParticle(techStackWithImages);
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
      })
      .catch((error) => {
        console.error(error);
      });
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