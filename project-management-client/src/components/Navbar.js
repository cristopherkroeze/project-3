import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/auth.context";
 
function Navbar() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>
 
      {isLoggedIn && (
        <>
          <Link to="/animes">
            <button>Animes</button>
          </Link>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          <span>{user && user.name}</span>          
          <button onClick={logOutUser}>Logout</button>
        </>
      )}
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  );
}
 
export default Navbar;