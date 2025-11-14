import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const { signInUser, signInWithGoogle, loading } = use(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInUser(email, password);
      toast.success("Logged in successfully!");
      const form = location.state?.form?.pathname || "/";
      navigate(form, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error("Invalid credentials or user not found!");
    }
  };
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signInWithGoogle();
      const loggedUser = result.user;
      const userName = loggedUser.displayName || "User";
      toast.success(`Welcome ${userName}`);
      const form = location.state?.form?.pathname || "/";
      navigate(form, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error("Invalid credentials or user not found!");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-9">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                {/* Email */}
                <label className="label">Email</label>
                <input value={email}
                    onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Email" required />

                {/* Password */}
                <label className="label">Password</label>
                <div className="relative w-full">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    className="input w-full pr-20"
                    placeholder="Password"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </span>
                </div>            

                <button className="btn btn-active btn-info text-white mt-3.5">
                  Login
                </button>

                {/* Google Login */}
                <button
                  onClick={handleGoogleLogin}
                  className="btn bg-white text-black border-[#e5e5e5] mt-3"
                >
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>

                <div>
                  <p>
                    Don't have an account?
                    <Link
                      to="/auth/register"
                      className="text-[#954ef9] text-sm font-bold link link-hover ml-3"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
