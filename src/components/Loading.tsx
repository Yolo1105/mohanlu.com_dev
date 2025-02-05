import type React from "react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Typewriter from "./Typewriter"
import availableIcons from "./icons"

interface LoadingProps {
  onLoadingComplete?: () => void
}

const Loading: React.FC<LoadingProps> = ({ onLoadingComplete }) => {
  const [isComplete, setIsComplete] = useState(false)
  const [showStars, setShowStars] = useState(true)
  const [icons, setIcons] = useState<{ src: string; left: number; top: number; rotation: number }[]>([])
  const typewriterRef = useRef<HTMLDivElement>(null)
  const typewriterInstance = useRef<Typewriter | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const generateIcons = () => {
      return availableIcons.map((src) => ({
        src,
        left: Math.random() * 100,
        top: Math.random() * 100,
        rotation: Math.random() * 360,
      }))
    }

    setIcons(generateIcons())

    const animateIcons = () => {
      setIcons((prevIcons) =>
        prevIcons.map((icon) => ({
          ...icon,
          rotation: (icon.rotation + 0.5) % 360,
        })),
      )
    }

    const intervalId = setInterval(animateIcons, 16) // Increased to 60 FPS for smoother animation

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const generateStarShadows = (n: number) => {
      return Array.from(
        { length: n },
        () => `${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`,
      ).join(", ")
    }

    document.documentElement.style.setProperty("--shadows-small", generateStarShadows(700))
    document.documentElement.style.setProperty("--shadows-medium", generateStarShadows(200))
    document.documentElement.style.setProperty("--shadows-big", generateStarShadows(100))

    const createStarElements = () => {
      const starsContainer = document.createElement("div")
      starsContainer.id = "stars-container"
      starsContainer.innerHTML = `
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      `
      document.body.insertBefore(starsContainer, document.body.firstChild)
    }

    createStarElements()

    return () => {
      const starsContainer = document.getElementById("stars-container")
      if (starsContainer) {
        document.body.removeChild(starsContainer)
      }
    }
  }, [])

  useEffect(() => {
    if (typewriterRef.current && !typewriterInstance.current) {
      typewriterInstance.current = new Typewriter(typewriterRef.current, {
        loop: false,
        typingSpeed: 30, // Slightly increased for smoother typing
        deletingSpeed: 20,
      })

      typewriterInstance.current
        .typeString("mohan@dev:~$ ssh mohan_lu.com")
        .pauseFor(500)
        .newLine()
        .start()
        .then(() => {
          setTimeout(() => {
            processOutput()
          }, 500)
        })
    }
  }, [])

  const processOutput = () => {
    const output = [
      "CPU0 microcode updated early to revision 0x1b, date = 2014-05-29",
      "Initializing cgroup subsys cpuset",
      "KERNEL supported cpus:",
      "  Intel GenuineIntel",
      "  AMD AuthenticAMD",
      "  Centaur CentaurHauls",
      "Initialising...",
      "",
    ]

    let i = 0
    const typeOutputLine = () => {
      if (i < output.length) {
        typewriterInstance.current
          ?.typeString(output[i], 0.1) // Increased speed for smoother typing
          .newLine()
          .pauseFor(100) // Short pause between lines
          .start()
          .then(() => {
            i++
            setTimeout(typeOutputLine, 50) // Small delay between lines for smoother appearance
          })

        // Auto-scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
      } else {
        setIsComplete(true)
        setTimeout(() => onLoadingComplete?.(), 300)
      }
    }

    typeOutputLine()
  }

  return (
    <div
      className={`loading-container ${isComplete ? "fade-out" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: showStars ? 1000 : -1,
        backgroundColor: "black",
        transition: "opacity 0.5s ease",
        opacity: showStars ? 1 : 0,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            position: "absolute",
            left: `${icon.left}%`,
            top: `${icon.top}%`,
            transform: `rotate(${icon.rotation}deg)`,
            width: "50px",
            height: "50px",
          }}
        >
          <Image src={icon.src || "/placeholder.svg"} alt={`icon-${index}`} layout="responsive" width={1} height={1} />
        </div>
      ))}

      <div
        ref={containerRef}
        className="term-container"
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "100%",
          overflowX: "hidden",
          textAlign: "left",
          padding: "10rem"
        }}
      >
        <div className="term" ref={typewriterRef}></div>
      </div>
    </div>
  )
}

export default Loading

