import React, { createContext, useState } from 'react'
import Herosection from '../components/home/Herosection'
import Corusal from '../components/home/Corusal'
import LatestJobs from '../components/home/LatestJobs'
import Navbar from '../components/ui/shared/Navbar'
import Footer from '../components/Footer'

// import Footer from '../components/Footer'

const Home = () => {



    
  
  return (
    <div>
      <Navbar/>
        <Herosection />
        <Corusal/>
        <LatestJobs/>
        <Footer/>

    </div>
  )
}

export default Home