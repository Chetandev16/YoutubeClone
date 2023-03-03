import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

const Watch = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [video, setVideo] = useState({})
    const [suggestions, setSuggestions] = useState([])

    const fetchData = async () => {
        const res = await fetch(`https://yt-api.p.rapidapi.com/dl?id=${id}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_HOST
            }
        })
        const data = await res.json()
        // console.log(data);
        console.log('fetching');
        setVideo(data)
    }

    const featchSuggestions = async () => {
        const res = await fetch(`https://yt-api.p.rapidapi.com/related?id=${id}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY,
                'X-RapidAPI-Host': import.meta.env.VITE_HOST
            }
        })
        const data = await res.json()
        setSuggestions(data.data)
    }

    useEffect(() => {
        featchSuggestions()
        fetchData()
    }, [])

    return (
        <div className='mt-12 w-full lg:w-[100%] fixed top-0 left-[0.4rem] lg:left-[4%] overflow-y-scroll scrollbar-watch'>
            <div className='h-screen flex flex-col lg:flex-row lg:gap-7'>
                <div className='pt-2 flex flex-col lg:mt-0 lg:w-[70%] lg:h-[900px]'>
                    {/* `https://ssrpde.ytjar.xyz/rr3---sn-4g5lznek.googlevideo.com/videoplayback?expire=1677785863&ei=p6YAZIfILo2w1wK-jrDgDA&ip=23.88.39.196&id=o-AKlVyEZTtUEZdBxJjx3uoeSF3Z9TkRte6roPf1DL0aj6&itag=22&source=youtube&requiressl=yes&mh=i1&mm=31%2C29&mn=sn-4g5lznek%2Csn-4g5ednsr&ms=au%2Crdu&mv=u&mvi=3&pl=25&gcr=de&spc=H3gIhjnIZkaKUJI-WzCh-pu0oWXVsYa7TxcfRg_SqCvSN7Kd3A&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=266.820&lmt=1656710077183023&mt=1677763881&fvip=1&fexp=24007246&c=ANDROID&txp=4532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAOCFVBmPOtq4quFlXjf0drjW9Qmyh8k1qyZe_CEDkKRaAiA3XUktnbDdX5SPhPxGL-sbKy0pwO1mKjlP0RlMiSAPsA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AG3C_xAwRQIgJLsgY2CgKz5WuxnZmLIiUS_tN4wbrb-C6mHP1jjOMTgCIQC1TVNAEBhiyA8QqpFjrE5sb2dGSJtw1ymIABZMgAtJWw%3D%3D` */}
                    <video className='mt-10 lg:h-[700px]' controls controlsList="nodownload" autoPlay={true} src={video?.formats?.[2]?.url}>
                        Your browser does not support the video tag.
                    </video>

                    {/* <h1>{video?.title}</h1> */}
                    <h1>{video?.title}</h1>
                </div>

                <div className='lg:w-[30%] lg:ml-6 flex flex-col gap-3 mt-12 overflow-y-scroll scrollbar-watch pb-20'>
                    <h1 className='text-xl text-[##272727]'>Suggested Videos</h1>

                    {suggestions?.map((suggestion, idx) => {
                        return (
                            <div key={idx} className='flex gap-4'>
                                <div className='relative'>
                                    <img onClick={() => {
                                        navigate(`/watch/${suggestion?.videoId}`)
                                        window.location.reload(true)
                                    }} className='cursor-pointer rounded-xl h-30 lg:h-32 lg:w-56 object-contain' src={suggestion?.thumbnail?.[0]?.url} alt="" />
                                    <p className='absolute text-xs bg-black px-2 rounded-md bottom-[4%] right-0'>{suggestion.lengthText}</p>
                                </div>

                                <div className='flex justify-center items-start flex-col gap-2 h-30 w-fit lg:w-44'>
                                    <h1 className='text-sm'>{suggestion?.title}</h1>
                                    <h2 className='text-xs'>{suggestion.channelTitle}</h2>
                                    <div className='flex gap-2 text-gray-400'>
                                        <h2 className='text-xs'>{suggestion.viewCount} views</h2>
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