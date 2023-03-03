import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";

const Watch = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [video, setVideo] = useState({})
    const [suggestions, setSuggestions] = useState([])
    const [avatar, setAvatar] = useState('')
    const [comments, setComments] = useState()

    const fetchData = async () => {
        const res = await fetch(`https://yt-api.p.rapidapi.com/dl?id=${id}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY4,
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
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY4,
                'X-RapidAPI-Host': import.meta.env.VITE_HOST
            }
        })
        const data = await res.json()
        setSuggestions(data.data)
    }

    const featchAvatar = async () => {
        const res = await fetch(`https://yt-api.p.rapidapi.com/channel/about?id=${video?.channelId}`, {
            "method": "GET",
            "headers": {
                'X-RapidAPI-Key': import.meta.env.VITE_SEARCH_KEY4,
                'X-RapidAPI-Host': import.meta.env.VITE_HOST
            }
        })
        const data = await res.json()
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
        // console.log(comments);
    }, [])

    return (
        <div className='mt-12 w-full lg:w-[100%] h-[94%] fixed lg:left-[4%] overflow-y-scroll scrollbar-watch'>
            <div className='h-screen flex flex-col lg:flex-row lg:gap-7'>
                <div className='pt-2 gap-5  flex flex-col lg:mt-0 lg:w-[70%] lg:h-[900px]'>
                    {/* `https://ssrpde.ytjar.xyz/rr3---sn-4g5lznek.googlevideo.com/videoplayback?expire=1677785863&ei=p6YAZIfILo2w1wK-jrDgDA&ip=23.88.39.196&id=o-AKlVyEZTtUEZdBxJjx3uoeSF3Z9TkRte6roPf1DL0aj6&itag=22&source=youtube&requiressl=yes&mh=i1&mm=31%2C29&mn=sn-4g5lznek%2Csn-4g5ednsr&ms=au%2Crdu&mv=u&mvi=3&pl=25&gcr=de&spc=H3gIhjnIZkaKUJI-WzCh-pu0oWXVsYa7TxcfRg_SqCvSN7Kd3A&vprv=1&svpuc=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=266.820&lmt=1656710077183023&mt=1677763881&fvip=1&fexp=24007246&c=ANDROID&txp=4532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cgcr%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAOCFVBmPOtq4quFlXjf0drjW9Qmyh8k1qyZe_CEDkKRaAiA3XUktnbDdX5SPhPxGL-sbKy0pwO1mKjlP0RlMiSAPsA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AG3C_xAwRQIgJLsgY2CgKz5WuxnZmLIiUS_tN4wbrb-C6mHP1jjOMTgCIQC1TVNAEBhiyA8QqpFjrE5sb2dGSJtw1ymIABZMgAtJWw%3D%3D` */}
                    <video className='mt-10 lg:h-[700px]' controls controlsList="nodownload" autoPlay={true} src={video?.formats?.[2]?.url}>
                        Your browser does not support the video tag.
                    </video>

                    {/* <h1>{video?.title}</h1> */}
                    <h1 className='text-xl'>{video?.title}</h1>
                    <div className='flex gap-6'>
                        <img className='rounded-full' src={avatar?.avatar?.[0]?.url} alt="" />
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>{avatar?.title}</h1>
                            <h1 className='text-gray-400'>{avatar?.subscriberCount}</h1>
                        </div>

                        <button className='px-4 py-2 bg-white font-bold text-black rounded-3xl'>Subscribe</button>
                    </div>

                    <div className='flex flex-col gap-6'>
                        <h1 className='text-xl font-bold mb-5'>{comments?.commentsCount} comments</h1>
                        {comments?.data?.map((comment, idx) => {
                            return (
                                <div className='flex gap-4' key={idx}>
                                    <img className='h-12 cursor-pointer rounded-full' src={comment?.authorThumbnail?.[2]?.url} alt="" />
                                    <div className='flex flex-col gap-[0.1rem]'>
                                        <div className='flex gap-3'>
                                            <h1 className='font-bold'>{comment?.authorText}</h1>
                                            <p className='text-gray-400'>{comment?.publishedTimeText}</p>
                                        </div>
                                        <p>{comment?.textDisplay}</p>

                                        <div className='flex gap-3'>
                                            <div className='flex gap-1 fill-gray-400 cursor-pointer text-gray-400'>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                                </svg>
                                                {comment?.likesCount}
                                            </div>

                                            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-400">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                                            </svg>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className='lg:w-[30%] lg:ml-6 flex flex-col gap-3 mt-12 scrollbar-watch'>
                    <h1 className='text-xl text-[##272727]'>Suggested Videos</h1>

                    {suggestions?.map((suggestion, idx) => {
                        return (
                            <div key={idx} className='flex gap-4'>
                                <div className='relative'>
                                    <img onClick={() => {
                                        navigate(`/watch/${suggestion?.videoId}`)
                                        window.location.reload(true)
                                    }} className='cursor-pointer rounded-xl h-30 lg:h-32 lg:w-56 object-contain' src={suggestion?.thumbnail?.[0]?.url} alt="" />
                                    <p className='absolute text-xs bg-black px-2 rounded-md bottom-[46%] lg:bottom-[5%] xl:bottom-[5%] right-0'>{suggestion.lengthText}</p>
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