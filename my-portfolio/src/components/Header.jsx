import React from "react";

function Header() {
  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-loreal-primary">MyPortfolio.dev</h1>

        <nav className="header-nav">
          <ul className="flex space-x-6 sm:space-x-4 md:space-x-6 lg:space-x-8">
            {['About', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className="text-loreal-text-secondary 
                    hover:text-loreal-primary 
                    transition-colors duration-300 text-sm sm:text-xs md:text-base"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;