import React, { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Vinicius Larsen
        </h1>

        {/* Desktop Navbar (Hidden on Small Screens) */}
        <nav className="hidden sm:flex space-x-4 md:space-x-6">
          {["About", "Skills", "Projects", "Contact"].map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className="text-gray-600 hover:text-gray-900 transition duration-300"
            >
              {section}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰ {/* Hamburger Icon */}
        </button>
      </div>

      {/* Mobile Menu (Hidden by Default) */}
      {isMenuOpen && (
        <nav className="sm:hidden bg-white shadow-md flex flex-col items-center space-y-4 py-4">
          {["About", "Skills", "Projects", "Contact"].map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className="text-gray-600 hover:text-gray-900 transition duration-300 text-lg"
              onClick={() => setIsMenuOpen(false)} // Close menu on click
            >
              {section}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;