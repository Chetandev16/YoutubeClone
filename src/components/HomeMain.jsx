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
    console.log(word);
    setRandomWord(word);
    const url = `https://yt-api.p.rapidapi.com/search?query=${randomWord}&geo=IN`

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
        <div className='flex flex-col pb-10 justify-center items-center lg:grid grid-cols-4'>
          {videos.map((video, idx) => {
            if (video.thumbnail === undefined) return null
            return (
              <div className='flex flex-col items-start justify-start h-[280px] w-[300px] lg:w-[360px]' key={idx}>
                <img onClick={() => {
                  // Navigate(`/watch/${video.videoId}`)
                  navigate(`/watch/${video.videoId}`)
                }} className='cursor-pointer rounded-lg  h-[230px] w-[400px]' src={video?.thumbnail?.[0]?.url} alt="" />
                <h1>{video.title}</h1>
              </div>
            )
          })}
        </div>
      </InfiniteScroll>
    )
  }
}

export default HomeMain