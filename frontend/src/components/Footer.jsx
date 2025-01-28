// import React from 'react'

import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-white text-gray-700 py-10 px-5 md:px-20'>
      {/* Container */}
      <div className='flex flex-col md:flex-row justify-between items-start gap-14'>
        {/* Left Section */}
        <div className='flex flex-col items-start space-y-3'>
          <img src={assets.logo} alt='Emergency Repair Logo' className='w-32' />
          <p className='text-sm leading-relaxed md:w-2/3'>
            Emergency Repair is your go-to solution for fast and reliable
            services like cleaning, repair, plumbing, and more. Available 24/7
            to meet your needs.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Company</h3>
          <ul className='space-y-2'>
            <li>
              <a href='/' className='text-sm text-gray-600 hover:text-blue-500'>
                Home
              </a>
            </li>
            <li>
              <a
                href='/about'
                className='text-sm text-gray-600 hover:text-blue-500'
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href='/contact'
                className='text-sm text-gray-600 hover:text-blue-500'
              >
                Contact Us
              </a>
            </li>
            <li>
              <a
                href='/faq'
                className='text-sm text-gray-600 hover:text-blue-500'
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Get in Touch</h3>
          <p className='text-sm mb-2'>📞 +1 234 567 890</p>
          <p className='text-sm mb-4'>📧 support@emergencyrepair.com</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='mt-10 text-center border-t border-gray-300 pt-5'>
        <p className='text-sm text-gray-500'>
          © {new Date().getFullYear()} Emergency Repair. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
