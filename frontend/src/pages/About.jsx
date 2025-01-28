// import React from 'react'

import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-center text-2xl font-bold mb-8'>
        ABOUT <span className='text-gray-600'>US</span>
      </h1>
      <div className='flex flex-col md:flex-row items-center mb-12'>
        <img
          src={assets.about_image}
          alt='Two professionals shaking hands in a repair shop'
          className='w-full md:w-1/2 mb-4 md:mb-0 md:mr-8'
        />
        <div className='md:w-1/2 text-justify'>
          <p className='mb-4'>
            Welcome To Emergency Repair, Your Trusted Partner For Fast And
            Reliable Emergency Repair Services. We Specialize In Providing
            Top-Notch Solutions For Electrical, Plumbing, Mechanical, And
            Structural Issues, Ensuring Your Peace Of Mind When It Matters Most.
          </p>
          <p className='mb-4'>
            With A Team Of Certified Professionals And Years Of Industry
            Experience, We Pride Ourselves On Delivering Quality Craftsmanship,
            Quick Response Times, And Exceptional Customer Service. Our Mission
            Is To Resolve Your Emergencies Efficiently, Minimizing Downtime And
            Inconvenience.
          </p>
          <p className='mb-4'>
            At Emergency Repair, Your Safety And Satisfaction Are Our Top
            Priorities. Whether It's A Burst Pipe, Electrical Failure, Or A
            Broken Appliance, We're Here 24/7 To Restore Functionality And Bring
            Comfort Back To Your Home Or Business. Trust Us To Get The Job Done
            Right, Every Time!
          </p>
        </div>
      </div>
      <h2 className='text-center text-xl font-bold mb-6'>
        WHY <span className='text-gray-600'>CHOOSE US</span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 '>
        <div className='border p-4 text-center hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <h3 className='font-bold mb-2 '>EFFICIENCY:</h3>
          <p>
            Streamlined Appointment Booking That Fits Into Your Busy Lifestyle.
          </p>
        </div>
        <div className='border p-4 text-center hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <h3 className='font-bold mb-2'>CONVENIENCE:</h3>
          <p>
            Access To A Network Of Trusted Service Professionals In Your Area.
          </p>
        </div>
        <div className='border p-4 text-center hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <h3 className='font-bold mb-2'>PERSONALIZATION:</h3>
          <p>
            Tailored Recommendations And Reminders To Help You Stay On Top Of
            Your Schedule.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
