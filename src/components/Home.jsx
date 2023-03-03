import React, { useEffect } from 'react'
import HomeMain from './HomeMain'
import Sidebar from './Sidebar'

const Home = () => {


  return (
    <div className=''>
      {/* maincontent */}
      <div className='hidden pt-4 lg:block lg:w-[20%]'>
        <Sidebar />
      </div>
      <div id="scrollableDiv" className='mt-16 scrollclass scrollbar lg:px-0 lg:w-[83%] h-screen lg:fixed  lg:right-[1rem] pb-10 overflow-y-scroll'>
        <HomeMain />
      </div>
    </div>
  )
}

export default Home