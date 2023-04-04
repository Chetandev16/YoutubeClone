import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Comments from './Comments';

const Watch = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [video, setVideo] = useState({})
    const [suggestions, setSuggestions] = useState([])
    const [showMore, setShowMore] = useState(false)
    const [avatar, setAvatar] = useState('')
    const [comments, setComments] = useState()
    const [viewCount, setViewCount] = useState()

    const fetchData = async () => {
        const res = await fetch(`https://youtube-v3-alternative.p.rapidapi.com/video?id=${id}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY_WATCH,
                'X-RapidAPI-Host': import.meta.env.VITE_HOST
            }
        })
        const data = await res.json()
        // console.log(data);
        console.log('fetching');
        if (data?.viewCount <= 1000) {
            setViewCount(data?.viewCount)
        } else if (data?.viewCount > 1000 && data?.viewCount <= 1000000) {
            setViewCount((data?.viewCount / 1000).toFixed(1) + 'K')
        } else {
            setViewCount((data?.viewCount / 1000000).toFixed(1) + 'M')
        }
        setVideo(data)
    }

    const featchSuggestions = async () => {
        const res = await fetch(`https://youtube-v3-alternative.p.rapidapi.com/related?id=${id}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY_WATCH,
                'X-RapidAPI-Host': import.meta.env.VITE_HOST
            }
        })
        const data = await res.json()
        setSuggestions(data.data)
    }

    const featchAvatar = async () => {
        const res = await fetch(`https://youtube-v3-alternative.p.rapidapi.com/channel?id=${video?.channelId}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY_WATCH2,
                'X-RapidAPI-Host': import.meta.env.VITE_HOST
            }
        })
        const data = await res.json()
        // console.log(data);
        setAvatar(data)
    }

    const featchComments = async () => {
        const res = await fetch(`https://youtube-v3-alternative.p.rapidapi.com/comments?id=${id}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_HOST
            }
        })
        const data = await res.json()
        // console.log(data);
        setComments(data)
    }

    useEffect(() => {
        featchAvatar()
    }, [video])

    useEffect(() => {
        featchSuggestions()
        fetchData()
        featchComments()
        // console.log(video);
        // console.log(avatar);
        // console.log(comments);
    }, [])

    return (
        <div className='mt-12 px-3 w-full md:w-[90%] lg:w-[97%]  h-[94%] fixed lg:left-[4%] overflow-y-scroll scrollbar-watch'>
            <div className='h-screen flex flex-col lg:flex-row xl:gap-7'>
                <div className='pt-2 gap-5  flex flex-col lg:mt-0 lg:w-[70%] lg:h-[900px]'>

                    <div className="mt-10 aspect-w-16 aspect-h-9">
                        <iframe src={`https://www.youtube.com/embed/${id}`}
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                    {/* <video  controls controlsList="nodownload" autoPlay={true} src={video?.formats?.[2]?.url}>
                        Your browser does not support the video tag.
                    </video> */}

                    {/* <h1>{video?.title}</h1> */}
                    {/* {console.log(avatar)} */}
                    <h1 className='text-xl'>{video?.title}</h1>
                    <div className='flex gap-6'>
                        <img className='rounded-full' src={avatar?.meta?.thumbnail?.[0]?.url} alt="" />
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>{avatar?.meta?.title}</h1>
                            <h1 className='text-gray-400'>{avatar?.meta?.subscriberCount} subscribers</h1>
                        </div>

                        <button className='px-4 py-2 bg-white font-bold text-black rounded-3xl'>Subscribe</button>
                    </div>

                    <div className='bg-[#272727] p-3 rounded-3xl'>
                        <div className='text-sm font-bold flex flex-col gap-2'>
                            <p>{viewCount} views</p>
                            <p></p>
                        </div>
                        <div className=''>
                            <p className='hidden lg:block'>{showMore ? `${video?.description}` : `${video?.description?.slice(0, 300)}...`}</p>
                            <p className='block lg:hidden'>{showMore ? `${video?.description}` : `${video?.description?.slice(0, 200)}...`}</p>
                            <button onClick={() => {
                                setShowMore(!showMore)
                            }} className='text-sm font-bold'>{showMore ? "Show Less" : "Show More"}</button>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6'>
                        <h1 className='text-xl font-bold mb-5'>{comments?.commentsCount} comments</h1>
                        {comments?.data?.map((comment,idx) => {
                            return (
                                <Comments comment={comment} idx={idx} />
                            )
                        })}
                        <Comments />
                    </div>
                </div>

                <div className='lg:w-[30%] lg:ml-6 flex flex-col gap-3 mt-12 scrollbar-watch'>
                    <h1 className='text-xl text-[##272727]'>Suggested Videos</h1>

                    {suggestions?.map((suggestion, idx) => {
                        var views;
                        if (suggestion?.viewCount > 1000000) {
                            views = (suggestion?.viewCount / 1000000).toFixed(1) + 'M'
                        } else if (suggestion?.viewCount > 1000) {
                            views = (suggestion?.viewCount / 1000).toFixed(1) + 'K'
                        } else {
                            views = suggestion?.viewCount
                        }

                        return (
                            <div key={idx} className='flex gap-4'>
                                <div className='relative h-fit w-fit'>
                                    <img onClick={() => {
                                        navigate(`/watch/${suggestion?.videoId}`)
                                        window.location.reload(true)
                                    }} className='cursor-pointer w-fit rounded-xl lg:h-32 lg:w-56 object-contain' src={suggestion?.thumbnail?.[0]?.url} alt="" />
                                    <p className='absolute text-xs bg-black px-2 rounded-md bottom-[6%] lg:bottom-[5%] xl:bottom-[5%] right-0'>{suggestion.lengthText}</p>
                                </div>

                                <div className='flex w-[60%] justify-center items-start flex-col gap-2 h-30 lg:w-44'>
                                    <h1 className='text-sm'>{suggestion?.title?.slice(0, 100)}...</h1>
                                    <h2 className='text-xs'>{suggestion.channelTitle}</h2>
                                    <div className='flex gap-2 text-gray-400'>
                                        <h2 className='text-xs'>{views} views</h2>
                                        <h2 className='text-xs'>{suggestion.publishedTimeText}</h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Watch