import React, { useState, useEffect } from 'react';

const NavbarAndSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [typewriterText, setTypewriterText] = useState('>_');

  const toggleSidebarItem = (index: number) => {
    if (activeSection === index) {
      // If clicking the same item, toggle sidebar
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      // Set the active section and ensure sidebar is open
      setActiveSection(index);
      setIsSidebarOpen(true);
    }
  };

  // ✅ Typewriter effect for ">_MohanLu"
  useEffect(() => {
    const texts = ['>_MohanLu', '>_Developer', '>_Innovator'];
    let currentIndex = 0;
    let isDeleting = false;
    let text = '';
    let typingSpeed = 150;

    const type = () => {
      const fullText = texts[currentIndex];

      if (isDeleting) {
        text = fullText.substring(0, text.length - 1);
      } else {
        text = fullText.substring(0, text.length + 1);
      }

      setTypewriterText(text);

      if (!isDeleting && text === fullText) {
        setTimeout(() => (isDeleting = true), 1000); // Pause before deleting
      } else if (isDeleting && text === '') {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % texts.length;
      }

      setTimeout(type, typingSpeed);
    };

    type();
  }, []);

  const navbarStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '60px',
    backgroundColor: '#0b0b0b',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 10px',
    zIndex: 1100,
    boxShadow: '2px 6px 15px rgba(0, 0, 0, 1)',
    borderBottom: '1.5px solid #2d2d30',
    fontFamily: 'Hack NF',
  };

  const sidebarStyle: React.CSSProperties = {
    position: 'fixed',
    top: '60px',
    left: 0,
    height: 'calc(100vh)',
    width: '30px',
    backgroundColor: '#141414',
    transition: 'width 0.3s ease',
    zIndex: 1000,
    overflow: 'hidden',
    boxShadow: '2px 0 6px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    writingMode: 'vertical-lr', // Vertical text, reading downwards
    alignItems: 'center',
    borderRight: '1px solid #2d2d30',
    fontFamily: 'Hack NF',
  };

  const logoStyle: React.CSSProperties = {
    position: 'absolute',
    left: '40px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Hack NF',
  };

  const footerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 0,
    left: '0',
    width: '100%',
    color: 'white',
    textAlign: 'right',
    padding: '5px 10px',
    fontSize: '0.8rem',
    zIndex: 1000,
    backgroundColor: '#0b0b0b',
    boxShadow: '0 -3px 6px rgba(0,0,0,0.3)',
    borderTop: '1px solid #2d2d30',
  };

  const navItemStyle: React.CSSProperties = {
    position: 'relative',
    margin: '0 40px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: 'white',
    fontFamily: 'Hack NF',
  };

  const navItems = [
    './About',
    './Experience',
    './Projects',
    './Skills',
    './Contact',
  ];

  return (
    <>
      <header style={navbarStyle} className="navbar">
        <div style={logoStyle}>{typewriterText}</div>
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
            <span className="block transition-all duration-300 ease-in-out group-hover:opacity-0">
              {item}
            </span>
            <span className="absolute left-0 top-0 block opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 whitespace-nowrap">
              cd {item}
            </span>
          </div>
        ))}
      </header>

      <div style={sidebarStyle} className="sidebar">
        &copy; 2025 Mohan Lu. All rights reserved.
      </div>

      <footer style={footerStyle} className="footer">
        Master Branch Ln 11, Col 5 Spaces:2 UTF - 8 LF {} TypeScript JSX
        {/* &copy; 2025 Mohan Lu. All rights reserved. */}
      </footer>
    </>
  );
};

export default NavbarAndSidebar;
