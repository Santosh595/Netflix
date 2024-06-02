import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContex";

function Navbar() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handlelogout = async () => {
    try{
        await logOut();
        navigate("/");
    }
    catch(err){
        console.log(err);
    }
  }

  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
      <Link to="/">
        <h1 className="uppercase text-red-600 font-nsans-bold cursor-pointer text-5xl hover:text-red-700 transition-all	">
          netflix
        </h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to="/profile">
            <button className="capitalize pr-4 hover:text-gray-200 transition-all	">profile</button>
          </Link>
          <button onClick={handlelogout} className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer transition-all	 ">
            Logout
          </button>
        </div>
      ) : (
        <div>
          <Link to="/Login">
            <button className="capitalize pr-4 transition-all	hover:text-gray-200">login</button>
          </Link>
          <Link to="/signup">
            <button className="capitalize bg-red-600 px-6 py-2 rounded cursor-pointer hover:bg-red-700 transition-all	">
              sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
