// import React from 'react'

import Banner from '../components/Banner'
import Header from '../components/Header'
import ServiceTypeMenu from '../components/ServiceTypeMenu'
import TopDoctors from '../components/TopWorkers'

const Home = () => {
  return (
    <div>
      <Header />
      <ServiceTypeMenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home
