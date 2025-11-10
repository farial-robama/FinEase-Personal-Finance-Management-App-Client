import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const {user, logOut} = use(AuthContext)
  const links = [
    { name: "Home", to: "/" },
    {
      name: "Transactions",
      sublinks: [
        { name: "Add Transaction", to: "/add-transaction" },
        { name: "My Transaction", to: "/my-transactions" },
      ],
    },
    { name: "Reports", to: "/reports" },
  ];

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success("You logged out successfully!")
    }
    catch(err) {
      console.log("Logout failed!", err);
      
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links.map((link, i) =>
              link.sublinks ? (
                <li key={i}>
                  <details>
                    <summary>{link.name}</summary>
                    <ul className="p-2">
                      {link.sublinks.map((sub, j) => (
                        <li key={j}>
                          <NavLink
                            to={sub.to}
                            className={({ isActive }) =>
                              isActive ? "text-purple-600 font-bold" : ""
                            }
                          >
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={i}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? "text-purple-600 font-bold" : ""
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">FinEase</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links.map((link, i) =>
              link.sublinks ? (
                <li key={i}>
                  <details>
                    <summary>{link.name}</summary>
                    <ul className="p-2">
                      {link.sublinks.map((sub, j) => (
                        <li key={j}>
                          <NavLink
                            to={sub.to}
                            className={({ isActive }) =>
                              isActive ? "text-purple-600 font-bold" : ""
                            }
                          >
                            {sub.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={i}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? "text-purple-600 font-bold" : ""
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              )
            )}
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-3">
            <Link to="/my-profile">
            <img src={user.photoURL || "/default-profile.png"}
            alt={user.displayName || "User"} 
            onError={(e) => {e.target.src = "/default-profile.png"}}
            className="w-10 h-10 rounded-full object-cover cursor-pointer"/>
            </Link>
            <button onClick={handleLogout} className="button">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/auth/login" className="button"> Login </Link>
          </div>
        )
      }
      </div>
    </div>
  );
};

export default Navbar;
