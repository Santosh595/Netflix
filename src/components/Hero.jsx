import axios from "axios";
import { useEffect, useState } from "react"
import endpoints, { createImageUrl } from "../services/movieServices";

function Hero() {
  const [movie,setMovie] = useState();
  useEffect(()=>{
    axios.get(endpoints.popular).then((response)=>{
        const movies= response.data.results;
        const randomMovie = movies[Math.floor(Math.random()*movies.length)];
        setMovie(randomMovie);
    })
  },[]);


  const truncate =(str, length) => {
    if(!str) return "";
    return str.length > length ? str.slice(0, length) + "..." : str;
  };

  if(!movie){
    return (
        <>
            <p>fetching movie...</p>
        </>
    )
  }

  const {title, backdrop_path, release_date, overview} = movie;


  return (
    <div className="w-full h-[550px] lg:h-[650px]">
        <div className="w-full h-full">
            <div className="absolute w-full h-[550px] lg:h-[650px] bg-gradient-to-r from-black">
                <img 
                className="w-full h-full object-cover origin-top opacity-60"
                src={createImageUrl(backdrop_path,"original")} 
                alt={title} 
                />
                <div className="absolute w-full top-[50%] md:top-[30%] lg:top-[40%] p-4 md:p-8">
                    <h1 className="text-3xl md:text-6xl font-nsans-bold">{title}</h1>
                    <div className="mt-8 mb-4">
                        <button className="capitalize border bg-gray-300 text-black py-2 px-5 rounded cursor-pointer hover:bg-gray-100 transition-all">play
                        </button>
                        <button className="capitalize border border-gray-300  py-2 px-5 ml-4 rounded hover:bg-slate-100 hover:text-black">watch later
                        </button>
                    </div>
                    <p className="text-gray-400 text-sm">{release_date}</p>
                    <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                        {truncate(overview, 165)}
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero