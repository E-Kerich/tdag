import React, { useEffect } from 'react'
import Hero from '../../../components/ui/Hero'
import Approach from '../../../components/ui/Approach'
import Services from '../../../components/ui/Services'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
        <Hero/>
        <Services/>
        <Approach/>
        
      
    </div>
  )
}

export default Home
