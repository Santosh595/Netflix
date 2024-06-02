import { FaHeart, FaRegHeart } from "react-icons/fa"
import { createImageUrl } from "../services/movieServices"
import { useState } from "react";
import { UserAuth } from "../context/AuthContex"
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md";

function MovieItem({movie}) {

    const [like, setLike] = useState(false);
    const [watchLater,setWatchLater] = useState(false);
    const {title, backdrop_path, poster_path} = movie;

    const {user} = UserAuth();
    
    const markFavShow = async () =>{
        const userEmail = user?.email;

        if(userEmail){
            const userDoc = doc(db, "users", userEmail);
            setLike(!like);
            await updateDoc(userDoc,{
                favShows: arrayUnion({...movie}),
            });
        } else {
            alert("Login to save a movie");
        }
    }

    const markWatchLaterShow = async () =>{
        const userEmail = user?.email;

        if(userEmail){
            const userDoc = doc(db, "users", userEmail);
            setWatchLater(!watchLater);
            await updateDoc(userDoc,{
                watchList: arrayUnion({...movie}),
            });
        } else {
            alert("Login to save a movie");
        }
    }

  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
        <img src={createImageUrl(backdrop_path ?? poster_path, "w500")} alt={title} />
        <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
            <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                {movie.title}
            </p>
            <p onClick={markFavShow} className="cursor-pointer">
                {like ? (
                    <FaHeart
                        size={20}
                        className="absolute top-2 left-3 text-gray-300"
                    />
                ):(
                    <FaRegHeart
                        size={20}
                        className="absolute top-2 left-3 text-gray-300"
                    />
                )}
            </p>
            <p onClick={markWatchLaterShow} className="cursor-pointer">
                {watchLater ? (
                    <MdWatchLater 
                        size={20}
                        className="absolute top-2 right-3 text-gray-300"
                    />
                ):(
                    <MdOutlineWatchLater
                        size={20}
                        className="absolute top-2 right-3 text-gray-300"
                    />
                )}
            </p>
        </div>
    </div>
  )
}

export default MovieItem