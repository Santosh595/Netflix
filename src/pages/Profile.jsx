import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContex";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { createImageUrl } from "../services/movieServices";
import { AiOutlineClose } from "react-icons/ai";

function Profile() {
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setWatchLaterMovies(doc.data().watchList);
      });
    }
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setFavMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlikeShow = async (movie) => {
    const userDoc = doc(db,"users",user.email);
    try{
      await updateDoc(userDoc, {
        favShows: arrayRemove(movie),
      })
    }
    catch(err){
      console.log(err);
    }
    
  }

  const handleRemoveWatchLaterShow = async (movie) => {
    const userDoc = doc(db,"users",user.email);
    await updateDoc(userDoc, {
      watchList: arrayRemove(movie),
    })
  }

  if (!user) {
    return (
      <>
        <p>fetching shows....</p>
      </>
    );
  }

  return (
    <>
      <div className="">
        <div className="">
          <img
            className="block w-full h-[500px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/a99688ca-33c3-4099-9baa-07a2e2acb398/ca15fd28-b624-4852-8bfe-9cdd5c88475d/IN-en-20240520-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="//"
          />
          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]">
            <div className="absolute top-[20%] p-4 md:p-8">
              <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
                My Play List
              </h1>
              <p className="font-nsans-light to-gray-400 text-lg">
                {user.email}
              </p>
            </div>
          </div>
          <h2 className="font-nsans-bold md:text-xl p-4 capitalize">
            Watch Later
          </h2>

          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={() => slide(-500)}
              className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
              size={40}
            />
            <div
              id={`slider`}
              className="w-full h-full overflow-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              {watchLaterMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
                >
                  <img
                    src={createImageUrl(
                      movie.backdrop_path ?? movie.poster_path,
                      "w500"
                    )}
                    alt={movie.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                    <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                      {movie.title}
                    </p>
                    <p>
                      <AiOutlineClose
                        size={30}
                        onClick={() => handleRemoveWatchLaterShow(movie)}
                        className="absolute top-2 right-2"
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={() => slide(500)}
              className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
              size={40}
            />
          </div>
          <h2 className="font-nsans-bold md:text-xl p-4 capitalize">
            Favourite Shows
          </h2>

          <div className="relative flex items-center group">
            <MdChevronLeft
              onClick={() => slide(-500)}
              className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
              size={40}
            />
            <div
              id={`slider`}
              className="w-full h-full overflow-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
            >
              {favMovies.map((movie) => (
                <div
                  key={movie.id}
                  className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2"
                >
                  <img
                    src={createImageUrl(
                      movie.backdrop_path ?? movie.poster_path,
                      "w500"
                    )}
                    alt={movie.title}
                  />
                  <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                    <p className="whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold">
                      {movie.title}
                    </p>
                    <p>
                      <AiOutlineClose
                        size={30}
                        onClick={() => handleUnlikeShow(movie)}
                        className="absolute top-2 right-2"
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <MdChevronRight
              onClick={() => slide(500)}
              className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
              size={40}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
