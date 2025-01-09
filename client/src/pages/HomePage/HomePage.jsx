import AboutSection from '@/components/content/AboutSection'
import DestinationSection from '@/components/content/DestinationSection'
import Hero from '@/components/content/Hero'
import PartenaireSection from '@/components/content/PartenaireSection'
import ServiceSection from '@/components/content/ServiceSection'
import Testimonials from '@/components/content/Testimonials'
import React from 'react'

const HomePage = () => {
  return (
   <main>
    <Hero/>
    <AboutSection/>
    <ServiceSection/>
    <Testimonials/>
    <DestinationSection/>
    <PartenaireSection/>
   </main>
  )
}

export default HomePage