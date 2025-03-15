import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'

import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import MostPopular from '../components/MostPopular'
import Teachers from '../components/Teachers'

const Home = () => {
  return (
    <div>
       <Hero/>
       <LatestCollection/>
       <MostPopular/>
       <Teachers />
       <OurPolicy/>
       <NewsLetterBox/>
    </div>
  )
}

export default Home