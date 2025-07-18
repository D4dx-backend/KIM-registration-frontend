import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-[#8e1b3a] text-white py-3 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      {/* Site Name */}
      <div className="text-lg font-semibold mb-3 md:mb-0">kim</div>
  
      {/* D4DX Innovations Link */}
      <div className="text-sm">
        Powered by{" "}
        <a
          href="https://d4dx.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#d5d5d5] hover:underline transition font-bold"
        >
          D4DX Innovations LLP
        </a>
      </div>
    </div>
  </footer>
  )
}

export default Footer