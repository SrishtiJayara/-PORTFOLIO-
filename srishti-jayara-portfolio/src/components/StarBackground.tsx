/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  speed: number;
  opacity: number;
  color: string;
}

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    const maxStars = 150;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      for (let i = 0; i < maxStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.4,
          twinkleSpeed: Math.random() * 0.025 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          color: 'rgba(255, 255, 255, 0.95)',
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create rich cosmic radial gradient backgrounds
      const primaryGlow = ctx.createRadialGradient(
        canvas.width * 0.15, canvas.height * 0.5, 0,
        canvas.width * 0.15, canvas.height * 0.5, canvas.width * 0.5
      );
      primaryGlow.addColorStop(0, 'rgba(76, 29, 149, 0.06)'); // Deep violet glow
      primaryGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      const secondaryGlow = ctx.createRadialGradient(
        canvas.width * 0.85, canvas.height * 0.3, 0,
        canvas.width * 0.85, canvas.height * 0.3, canvas.width * 0.5
      );
      secondaryGlow.addColorStop(0, 'rgba(29, 78, 216, 0.05)'); // Blue glow
      secondaryGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      const tertiaryGlow = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.8, 0,
        canvas.width * 0.5, canvas.height * 0.8, canvas.width * 0.6
      );
      tertiaryGlow.addColorStop(0, 'rgba(219, 39, 119, 0.04)'); // Pink/fuchsia glow
      tertiaryGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = primaryGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = secondaryGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = tertiaryGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw twinkling stars (white dots)
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const opacity = (Math.sin(star.twinklePhase) + 1) / 2 * 0.85 + 0.15;
        
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      // Draw and update shooting stars
      shootingStars.forEach((star, index) => {
        star.x += star.dx;
        star.y += star.dy;
        star.opacity -= 0.012; // smooth fade-out

        if (
          star.opacity <= 0 ||
          star.x < -100 ||
          star.x > canvas.width + 100 ||
          star.y < -100 ||
          star.y > canvas.height + 100
        ) {
          shootingStars.splice(index, 1);
          return;
        }

        // Draw the streak with gradient
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - star.dx * (star.length / speedRatio(star)),
          star.y - star.dy * (star.length / speedRatio(star))
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        
        // Handle tint color mapping smoothly
        const colorPart = star.color.replace('0.6', String(star.opacity * 0.7));
        grad.addColorStop(0.3, colorPart); 
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.0;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - star.dx * (star.length / speedRatio(star)),
          star.y - star.dy * (star.length / speedRatio(star))
        );
        ctx.stroke();

        // Draw a tiny bright head/nucleus
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.arc(star.x, star.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Spawn shooting stars periodically
      if (Math.random() < 0.015 && shootingStars.length < 3) {
        // Spawn from top or left edge
        const spawnFromTop = Math.random() > 0.3;
        const x = spawnFromTop ? Math.random() * canvas.width * 0.8 : 0;
        const y = spawnFromTop ? 0 : Math.random() * canvas.height * 0.5;
        
        // Direction: downwards diagonal (approx 30 to 60 degrees)
        const angle = (Math.PI / 6) + Math.random() * (Math.PI / 6); // 30 to 60 deg
        const speed = Math.random() * 8 + 8; // 8 to 16 pixels per frame
        const length = Math.random() * 120 + 80; // streak length
        
        const colors = [
          'rgba(255, 255, 255, 0.6)',  // white
          'rgba(56, 189, 248, 0.6)',   // sky blue
          'rgba(192, 132, 252, 0.6)',  // light purple
        ];

        shootingStars.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          length,
          speed,
          opacity: 1.0,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Helper to calculate speed ratio for tail length rendering
    const speedRatio = (star: ShootingStar) => {
      return Math.sqrt(star.dx * star.dx + star.dy * star.dy);
    };

    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="cosmic-star-canvas"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
