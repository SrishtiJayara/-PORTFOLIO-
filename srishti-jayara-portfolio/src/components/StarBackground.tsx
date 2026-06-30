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

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const maxStars = 120;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const colors = [
        'rgba(255, 255, 255, 0.8)',
        'rgba(244, 63, 94, 0.6)', // rose / fuchsia hint
        'rgba(168, 85, 247, 0.6)', // purple hint
        'rgba(59, 130, 246, 0.6)', // blue hint
      ];

      for (let i = 0; i < maxStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.8 ? colors[Math.floor(Math.random() * colors.length)] : 'rgba(255, 255, 255, 0.7)',
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

      // Draw subtle grids (very elegant, low contrast tech aesthetic)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw and connect stars
      stars.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        const opacity = (Math.sin(star.twinklePhase) + 1) / 2 * 0.6 + 0.4;
        
        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = opacity;
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        // Interactive gravity connections to mouse
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });

      // Subtle star-to-star constellation lines (only for very close ones to avoid clutter)
      ctx.lineWidth = 0.3;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const s1 = stars[i];
          const s2 = stars[j];
          const dx = s1.x - s2.x;
          const dy = s1.y - s2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - dist / 100)})`;
            ctx.beginPath();
            ctx.moveTo(s1.x, s1.y);
            ctx.lineTo(s2.x, s2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
