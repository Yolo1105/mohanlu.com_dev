import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Typewriter from './Typewriter';
import availableIcons from './icons';

interface LoadingProps {
  onLoadingComplete?: () => void;
}

const Loading: React.FC<LoadingProps> = ({ onLoadingComplete }) => {
  const [isComplete, setIsComplete] = useState(false);
  const [showStars, setShowStars] = useState(true);
  const [icons, setIcons] = useState<
    { src: string; left: number; top: number; rotation: number }[]
  >([]);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const typewriterInstance = useRef<Typewriter | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateIcons = () => {
      return availableIcons.map((src) => ({
        src,
        left: Math.random() * 100,
        top: Math.random() * 100,
        rotation: Math.random() * 360,
      }));
    };

    setIcons(generateIcons());

    const animateIcons = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => ({
          ...icon,
          rotation: (icon.rotation + 0.5) % 360,
        })),
      );
    };

    const intervalId = setInterval(animateIcons, 16); // ~60 FPS for smoother animation

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const generateStarShadows = (n: number) => {
      return Array.from(
        { length: n },
        () =>
          `${Math.floor(Math.random() * 2000)}px ${Math.floor(
            Math.random() * 2000,
          )}px #FFF`,
      ).join(', ');
    };

    document.documentElement.style.setProperty(
      '--shadows-small',
      generateStarShadows(700),
    );
    document.documentElement.style.setProperty(
      '--shadows-medium',
      generateStarShadows(200),
    );
    document.documentElement.style.setProperty(
      '--shadows-big',
      generateStarShadows(100),
    );

    const createStarElements = () => {
      const starsContainer = document.createElement('div');
      starsContainer.id = 'stars-container';
      starsContainer.innerHTML = `
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      `;
      document.body.insertBefore(starsContainer, document.body.firstChild);
    };

    createStarElements();

    return () => {
      const starsContainer = document.getElementById('stars-container');
      if (starsContainer) {
        document.body.removeChild(starsContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (typewriterRef.current && !typewriterInstance.current) {
      typewriterInstance.current = new Typewriter(typewriterRef.current, {
        loop: false,
        typingSpeed: 30,
        deletingSpeed: 20,
      });

      // Use random speed and pause for the initial command
      const initialRandomSpeed = Math.random() * 0.15 + 0.05; // e.g. between 0.05 and 0.2
      const initialRandomPause = Math.floor(Math.random() * 400) + 100; // between 100ms and 500ms

      typewriterInstance.current
        .typeString('mohan@dev:~$ ssh mohan_lu.com', initialRandomSpeed)
        .pauseFor(initialRandomPause)
        .newLine()
        .start()
        .then(() => {
          setTimeout(() => {
            processOutput();
          }, 500);
        });
    }
  }, []);

  const processOutput = () => {
    const output = [
      '> npm install portfolio --save',
      '> Installing dependencies: express, react, node, etc.',
      '> Running node server.js',
      '> Initializing creative API endpoints',
      '> Full-stack environment loaded',
      'All systems go!',
    ];

    let i = 0;

    // Helper functions to generate random speeds and pauses
    const getRandomSpeed = () => Math.random() * 0.15 + 0.05; // Random speed between 0.05 and 0.2
    const getRandomPause = () => Math.floor(Math.random() * 400) + 100; // Random pause between 100 and 500 ms
    const getRandomLineDelay = () => Math.floor(Math.random() * 100) + 50; // Delay between lines: 50-150ms

    const typeOutputLine = () => {
      if (i < output.length) {
        const randomSpeed = getRandomSpeed();
        const randomPause = getRandomPause();

        typewriterInstance.current
          ?.typeString(output[i], randomSpeed)
          .newLine()
          .pauseFor(randomPause)
          .start()
          .then(() => {
            i++;
            // Auto-scroll to bottom
            if (containerRef.current) {
              containerRef.current.scrollTop =
                containerRef.current.scrollHeight;
            }
            setTimeout(typeOutputLine, getRandomLineDelay());
          });
      } else {
        setIsComplete(true);
        setTimeout(() => onLoadingComplete?.(), 300);
      }
    };

    typeOutputLine();
  };

  return (
    <div
      className={`loading-container ${isComplete ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: showStars ? 1000 : -1,
        backgroundColor: 'black',
        transition: 'opacity 0.5s ease',
        opacity: showStars ? 1 : 0,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      {icons.map((icon, index) => (
        <div
          key={index}
          className="floating-icon"
          style={{
            position: 'absolute',
            left: `${icon.left}%`,
            top: `${icon.top}%`,
            transform: `rotate(${icon.rotation}deg)`,
            width: '50px',
            height: '50px',
          }}
        >
          <Image
            src={icon.src || '/placeholder.svg'}
            alt={`icon-${index}`}
            layout="responsive"
            width={1}
            height={1}
          />
        </div>
      ))}

      <div
        ref={containerRef}
        className="term-container"
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: '100%',
          overflowX: 'hidden',
          textAlign: 'left',
          padding: '10rem',
        }}
      >
        <div className="term" ref={typewriterRef}></div>
      </div>
    </div>
  );
};

export default Loading;
