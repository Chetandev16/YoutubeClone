import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Search = () => {
  const navigate = useNavigate()
  const [showFilters, setShowFilters] = useState(false)
  const hidden = showFilters ? 'block' : 'hidden'
  const search = useSelector(state => state.search.value)
  const [searchResults, setSearchResults] = useState([])


  const getSearchResults = async () => {
    const req = await fetch(`https://yt-api.p.rapidapi.com/search?query=${search}'&geo=IN`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_SEARCH_KEY5,
        'x-rapidapi-host': import.meta.env.VITE_HOST
      }
    })
    console.log("fetching");
    const res = await req.json()
    // console.log(res);
    setSearchResults(res.data)
  }


  useEffect(() => {
    getSearchResults()
    // console.log(searchResults);
  }, [search])

  return (
    <div className='flex'>
      <div className='w-[20%]'>
        <Sidebar />
      </div>
      <div className='lg:w-[70%] w-full flex flex-col gap-8 fixed lg:right-[10%] h-screen pb-36 overflow-y-scroll scrollbar-watch mt-16'>

        <div className='flex flex-col gap-3 h-fit w-[100%] lg:w-[60%]'>
          <div onClick={() => setShowFilters(!showFilters)} className='flex gap-3 px-5 py-2 rounded-3xl hover:bg-[#272727] w-fit items-center cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <p>Filters</p>
          </div>

          <div className={`${hidden} flex justify-evenly h-[20%]`}>
            <div className='text-xs lg:text-base flex flex-col gap-2'>
              <h1 className='font-bold'>Upload Date</h1>
              <hr />
              <div className='flex flex-col mt-2 gap-4 text-gray-400'>
                <p>Last Hour</p>
                <p>Today</p>
                <p>This Week</p>
                <p>This Month</p>
                <p>This Year</p>
              </div>
            </div>
            <div className='text-xs lg:text-base flex flex-col gap-2'>
              <h1 className='font-bold'>Type</h1>
              <hr />
              <div className='flex flex-col mt-2 gap-4 text-gray-400'>
                <p>Video</p>
                <p>Channel</p>
                <p>Playlist</p>
                <p>Film</p>
              </div>
            </div>
            <div className='text-xs lg:text-base flex flex-col gap-2'>
              <h1 className='font-bold'>Duration</h1>
              <hr />
              <div className='flex flex-col mt-2 gap-4 text-gray-400'>
                <p>Under 4 minutes</p>
                <p>4-20 minutes</p>
                <p>Over 20 minutes</p>
              </div>
            </div>
            <div className='text-xs lg:text-base flex flex-col gap-2'>
              <h1 className='font-bold'>Features</h1>
              <hr />
              <div className='flex flex-col mt-2 gap-4 text-gray-400'>
                <p>Live</p>
                <p>4K</p>
                <p>HD</p>
                <p>Subtitles/CC</p>
              </div>
            </div>
            <div className='text-xs lg:text-base flex flex-col gap-2'>
              <h1 className='font-bold'>Sort By</h1>
              <hr />
              <div className='flex flex-col mt-2 gap-4 text-gray-400'>
                <p>Upload date</p>
                <p>View count</p>
                <p>Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-10'>
          {searchResults.map((item, idx) => {
            var views;
            if (item?.viewCount > 1000000) {
              views = (item?.viewCount / 1000000).toFixed(1) + 'M'
            } else if (item?.viewCount > 1000) {
              views = (item?.viewCount / 1000).toFixed(1) + 'K'
            } else {
              views = item?.viewCount
            }

            if (item?.type === 'shorts_listing') return <div key={idx}></div>;
            else if (item?.type === 'channel') return (
              <div key={idx} className='flex w-[80%] justify-center lg: gap-4'>
                <div className='relative'>
                  <img className='rounded-full' src={item?.thumbnail?.[0]?.url} alt="" />
                  <p className='absolute bottom-[1%] right-[1%] bg-black px-2 rounded-lg text-sm'>{item?.lengthText}</p>
                </div>
                <div className='flex text-gray-400  flex-col gap-2'>
                  <h1 className='text-white font-semibold'>{item?.title}</h1>
                  <div className='flex gap-3'>
                    {item?.channelThumbnail?.[0]?.url && <img className='rounded-full w-7 h-7' src={item?.channelThumbnail?.[0]?.url} alt="" />}
                    <h1>{item?.channelTitle}</h1>
                  </div>

                  <h1>{item?.description?.slice(0, 100)}...</h1>
                </div>
              </div>
            )
            else return (
              <div key={idx} className='flex flex-col lg:flex-row px-4 gap-2 lg:gap-4'>
                <div className='relative'>
                  <img onClick={() => {
                    navigate(`/watch/${item?.videoId}`)
                  }} className='rounded-xl h-[14rem] cursor-pointer' src={item?.thumbnail?.[0]?.url} alt="" />
                  <p className='absolute bottom-[1%] right-[1%] bg-black px-2 rounded-lg text-sm'>{item?.lengthText}</p>
                </div>
                <div className='flex text-gray-400  flex-col gap-2 lg:gap-4'>
                  <h1 className='text-white font-semibold'>{item?.title}</h1>
                  <div className='text-sm flex gap-3'>
                    <h1>{views}</h1>
                    <h1>{item?.publishedTimeText}</h1>
                  </div>
                  <div className='flex gap-3'>
                    {item?.channelThumbnail?.[0]?.url && <img className='rounded-full w-7 h-7' src={item?.channelThumbnail?.[0]?.url} alt="" />}
                    <h1>{item?.channelTitle}</h1>
                  </div>

                  <h1>{item?.description?.slice(0, 100)}...</h1>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default Search