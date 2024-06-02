import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserAuth} from "../context/AuthContex"

function Signup() {
  const [remberLogin, setRemberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {signUp} = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try{
      await signUp(email,password);
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a99688ca-33c3-4099-9baa-07a2e2acb398/ca15fd28-b624-4852-8bfe-9cdd5c88475d/IN-en-20240520-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="///"
        />
        <div className="bg-black/60 w-full h-screen left-0 top-0 fixed">
          <div className="fixed w-full px-4 py-24 z-20">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
              <div className="max-w-[320px] mx-auto py-16">
                <h1 className="text-3xl font-nsans-bold">Sign up</h1>

                <form onSubmit={handleFormSubmit} className="w-full flex flex-col py-4">
                  <input
                    className="p-3 my-2 bg-gray-700 focus:bg-gray-800"
                    placeholder="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <input
                    className="p-3 my-2 bg-gray-700 focus:bg-gray-800"
                    placeholder="password"
                    type="password"
                    autoComplete="cuurent-password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                  <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold hover:opacity-90 transition-all">
                    Sign up
                  </button>
                  <div className="flex justify-between items-center text-gray-600">
                    <p>
                      <input type="checkbox" className="mr-2" checked={remberLogin} onChange={(e)=>setRemberLogin(e.target.value)} />
                      Remember me
                    </p>
                    <p>Need Help?</p>
                  </div>
                  <div>
                    <p className="my-4">
                      <span className="text-gray-600 mr-2">
                        Already subscribed to Netflix?
                      </span>
                      <Link className="hover:opacity-90 transition-all" to="/login">Sign In</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
