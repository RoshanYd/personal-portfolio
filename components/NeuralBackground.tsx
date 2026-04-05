import React, { useEffect, useRef } from 'react';

const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 'alpha: false' can improve performance if we didn't need transparency, 
    // but we use CSS background, so we need the canvas to be transparent/composite.
    // Keeping default context but being careful with draws.
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Optimization: Check for mobile to reduce load
    const isMobile = window.innerWidth < 768;
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration
    const config = {
      particleCount: isMobile ? 35 : 100, // Significantly reduced for mobile
      connectionDistance: isMobile ? 140 : 180, // Shorter connections on mobile
      mouseDistance: 250,
      color: '151, 135, 244'
    };

    const connectionDistSq = config.connectionDistance * config.connectionDistance;
    const mouseDistSq = config.mouseDistance * config.mouseDistance;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Random velocity
        const theta = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.5 + 0.2); 
        this.vx = Math.cos(theta) * speed;
        this.vy = Math.sin(theta) * speed;
        this.size = Math.random() * 2 + 1;
      }

      update(dt: number, mouse: { x: number; y: number }) {
        // Delta Time scaling: assume 60fps ~ 16.6ms is baseline
        const timeScale = dt / 16.66;
        
        let moveX = this.vx * timeScale;
        let moveY = this.vy * timeScale;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distSq = dx * dx + dy * dy;

        // Only do heavy math if close enough
        if (distSq < mouseDistSq) {
            const distance = Math.sqrt(distSq);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (config.mouseDistance - distance) / config.mouseDistance;
            
            // Repulsion force
            const repulsion = force * 3 * timeScale;
            moveX -= forceDirectionX * repulsion;
            moveY -= forceDirectionY * repulsion;
        }

        this.x += moveX;
        this.y += moveY;

        // Bounce off edges with simple damping
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(${config.color}, 0.6)`;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles: Particle[] = [];
    const initParticles = () => {
        particles = [];
        const count = isMobile ? config.particleCount : (window.innerWidth < 1024 ? 70 : 100);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    };

    initParticles();

    const mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    let lastTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const dt = currentTime - lastTime;
      lastTime = currentTime;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update and Draw
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update(dt, mouse);
        p.draw();
      }

      // Draw Connections (Batched style changes to minimize state flips)
      ctx.lineWidth = 1;
      
      for (let a = 0; a < particles.length; a++) {
        const pA = particles[a];
        
        // Only check particles AFTER the current one to avoid double drawing
        for (let b = a + 1; b < particles.length; b++) {
            const pB = particles[b];
            const dx = pA.x - pB.x;
            const dy = pA.y - pB.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connectionDistSq) {
                // We need sqrt for linear opacity fade
                const distance = Math.sqrt(distSq);
                const opacityValue = 1 - (distance / config.connectionDistance);
                
                // Skip invisible lines
                if (opacityValue > 0.05) {
                    ctx.strokeStyle = `rgba(${config.color}, ${opacityValue * 0.4})`;
                    ctx.beginPath();
                    ctx.moveTo(pA.x, pA.y);
                    ctx.lineTo(pB.x, pB.y);
                    ctx.stroke();
                }
            }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(to bottom, #0B0A14, #181529)' }}
    />
  );
};

export default NeuralBackground;