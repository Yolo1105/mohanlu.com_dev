import type React from "react"
import { useState, useEffect } from "react"

const NavbarAndSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [typewriterText, setTypewriterText] = useState("")

  const toggleSidebarItem = (index: number) => {
    if (activeSection === index) {
      setIsSidebarOpen(!isSidebarOpen)
    } else {
      setActiveSection(index)
      setIsSidebarOpen(true)
    }
  }

  useEffect(() => {
    const texts = [">_MohanLu", ">_Developer", ">_Innovator"]
    let currentIndex = 0
    let isDeleting = false
    let text = ""
    let typingSpeed = 150

    const type = () => {
      const fullText = texts[currentIndex]

      if (isDeleting) {
        text = fullText.substring(0, text.length - 1)
      } else {
        text = fullText.substring(0, text.length + 1)
      }

      setTypewriterText(text)

      if (!isDeleting && text === fullText) {
        isDeleting = true
        typingSpeed = 100
      } else if (isDeleting && text === "") {
        isDeleting = false
        currentIndex = (currentIndex + 1) % texts.length
        typingSpeed = 150
      }

      setTimeout(type, typingSpeed)
    }

    type()
  }, [])

  const navbarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "60px",
    backgroundColor: "#0b0b0b",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    zIndex: 1100,
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    borderBottom: "1.5px solid #2d2d30",
  }

  const sidebarStyle: React.CSSProperties = {
    position: "fixed",
    top: "60px",
    left: 0,
    height: "calc(100vh - 60px)",
    width: "50px",
    backgroundColor: "#141414",
    transition: "width 0.3s ease",
    zIndex: 1000,
    overflow: "hidden",
    boxShadow: "2px 0 6px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #2d2d30",
  }

  const logoStyle: React.CSSProperties = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "white",
  }

  const footerStyle: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "30px",
    color: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 10px",
    zIndex: 1100,
    backgroundColor: "#0b0b0b",
    boxShadow: "0 -2px 6px rgba(0,0,0,0.3)",
    borderTop: "1px solid #2d2d30",
  }

  const navItemStyle: React.CSSProperties = {
    margin: "0 10px",
    fontSize: "0.875rem",
    fontWeight: "bold",
    cursor: "pointer",
    color: "white",
  }

  const sidebarItemStyle = (index: number): React.CSSProperties => ({
    padding: "15px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "white",
    transition: "background-color 0.3s ease",
    width: "50px",
    backgroundColor: activeSection === index ? "#3e3e42" : "transparent",
  })

  const navItems = ["./About", "./Experience", "./Projects", "./Skills", "./Contact"]

  const sidebarItems = [
    { icon: "📁", text: "Files" },
    { icon: "🔍", text: "Search" },
    { icon: "🌿", text: "Git" },
    { icon: "🐞", text: "Debug" },
    { icon: "➕", text: "Extensions" },
  ]

  return (
    <>
      <header style={navbarStyle} className="navbar">
        <div style={logoStyle} className="typewriter">
          {typewriterText}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {navItems.map((item, index) => (
            <div
              key={index}
              style={navItemStyle}
              className={`
                group relative nav-item nav-item-${index + 1} 
                flex items-center cursor-pointer
              `}
              onClick={() => toggleSidebarItem(index)}
            >
              <span className="block transition-all duration-300 ease-in-out group-hover:opacity-0">{item}</span>
              <span className="absolute left-0 top-0 block opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 whitespace-nowrap">
                cd {item}
              </span>
            </div>
          ))}
        </div>
      </header>

      <div style={sidebarStyle} className="sidebar">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            style={sidebarItemStyle(index)}
            onClick={() => toggleSidebarItem(index)}
            onMouseEnter={(e) => {
              if (activeSection !== index) {
                e.currentTarget.style.backgroundColor = "#3e3e42"
              }
            }}
            onMouseLeave={(e) => {
              if (activeSection !== index) {
                e.currentTarget.style.backgroundColor = "transparent"
              }
            }}
          >
            <span>{item.icon}</span>
          </div>
        ))}
      </div>

      <footer style={footerStyle} className="footer">
        &copy; 2025 Mohan Lu. All rights reserved.
      </footer>
    </>
  )
}

export default NavbarAndSidebar

