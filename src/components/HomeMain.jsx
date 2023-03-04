import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setVideos } from '../features/videos'
import randomWords from 'random-words';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const HomeMain = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const videos = useSelector(state => state.videos.value)
  const [loading, setLoading] = useState(true)
  const initialWord = randomWords();
  const [randomWord, setRandomWord] = useState(initialWord);

  const fetchData = async () => {
    console.log('fetching');
    const word = randomWords();
    // console.log(word);
    setRandomWord(word);
    const url = `https://yt-api.p.rapidapi.com/search?query=${randomWord}&geo=IN&lang=en`

    const res = await fetch(url, {
      "method": "GET",
      "headers": {
        'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_HOST
      }
    })


    if (res.status === 200) {
      console.log('success');
      const data = await res.json()
      if (items.length === 0) {
        dispatch(setVideos(data.data))
        setItems(data.data)
      } else {
        setItems([...items, ...data.data])
        dispatch(setVideos(items))
      }
      setLoading(false)
    } else {
      console.log('error');
    }

  }

  useEffect(() => { }, [items])

  useEffect(() => {
    fetchData()
    console.log('====================================');
    console.log(import.meta.env.VITE_SEARCH_KEY);
    console.log('====================================');
  }, [])

  if (loading) {
    return <div className='flex justify-center items-center w-full h-[800px]'>
      <ClipLoader color="white" />
    </div>
  } else {
    return (
      <InfiniteScroll
        dataLength={items.length - 1}
        next={fetchData}
        hasMore={items.length < 100}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
      >
        <div className='flex flex-col pb-10 justify-center items-center lg:grid md:grid md:grid-cols-3 xl:grid-cols-4 lg:grid-cols-3 gap-6'>
          {videos.map((video, idx) => {
            if (video.title === 'Shorts') {
              return null
            } else {
              var views;
              if (video.viewCount > 1000000) {
                views = `${(video?.viewCount / 1000000).toFixed(1)}M`
              } else if (video?.viewCount > 1000) {
                views = `${(video?.viewCount / 1000).toFixed(1)}K`
              } else {
                views = video?.viewCount
              }
              return (
                <div className='flex flex-col gap-3 h-[280px] w-[300px] lg:w-[360px]' key={idx}>
                  <div className='relative'>
                    <img onClick={() => {
                      // Navigate(`/watch/${video.videoId}`)
                      navigate(`/watch/${video.videoId}`)
                    }} className='cursor-pointer rounded-xl h-[230px] object-cover md:w-[200px]  lg:w-[240px] lg:h-[180px] xl:h-[200px] xl:w-[400px] ' src={video?.thumbnail?.[0]?.url} alt="" />

                    <p className='absolute bottom-[1%] lg:right-[10%] xl:right-[1%] px-2 rounded-lg text-xs bg-black'>{video?.lengthText}</p>

                  </div>
                  <div className='flex gap-2'>
                    <img className='rounded-full h-10' src={video?.channelThumbnail?.[0]?.url} alt="" />
                    <div className='flex flex-col '>
                      <h1 className='flex text-gray-300 justify-start text-ellipsis truncate items-center w-[300px] h-6'>{video.title}</h1>
                      <div className='flex text-gray-300 '>
                        <h1>{views} views</h1>
                        <p className='flex h-6 w-6 text-center justify-center items-center'>.</p>
                        <h1>{video?.publishedTimeText}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          })}
        </div>
      </InfiniteScroll>
    )
  }
}

export default HomeMain