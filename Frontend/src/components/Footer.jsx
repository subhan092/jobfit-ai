import React from 'react'
import logo from "../assets/joblo-logo.png";
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Footer = () => {
  return (
    <div className='bg-gray-100   flex justify-between px-12 py-8'>
      <div className="flex flex-col basis-1/3 gap-6" >
      <h1 className='text-4xl font-bold'>Job<span className='text-purple-700'>Fit AI</span></h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste tempora placeat, molestiae alias saepe? Nesciunt, pariatur quisquam.</p>
        <div className="flex gap-6">
        <Instagram/>
      <Linkedin/>
      <Twitter/>
        </div>
      </div>
      <div className="flex flex-col basis-1/5 gap-4">
        <h2 className='font-bold pb-2'>Quick Links</h2>
         <Link to={'/'}>Home</Link>
         <Link to={'/browse'}>Browse</Link>
         <Link to={'/jobs'}>Jobs</Link>
      </div>
      <div className="flex flex-col basis-1/5 gap-4">
        <h2 className='pb-2 font-bold'>Job Categories</h2>
        <p>Remote</p>
        <p>Full-Time</p>
        <p>Part-Time</p>
      </div>
      <div className="flex basis-1/4 flex-col relative">
        <h2 className='font-bold pb-2'>Newsletter Subscription</h2>
        <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" className="border-purple-700  " placeholder="Email" />
      <Button type="submit "className="bg-purple-700">Subscribe</Button>
    </div>
      </div>
      </div>
  )
}

export default Footer